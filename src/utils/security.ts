/**
 * Enterprise-Grade Security Utilities
 * Rate Limiting & Bot Detection for Strict.Dev
 */

const RATE_LIMIT_KEY = "strict_dev_rate_limit";
const RATE_LIMIT_WINDOW = 60000;
const MAX_ATTEMPTS = 3;

interface RateLimitRecord {
  timestamp: number;
  formId: string;
  userAgent: string;
}

const devError = (...args: any[]) => {
  if (import.meta.env.DEV) console.error(...args);
};

const devWarn = (...args: any[]) => {
  if (import.meta.env.DEV) console.warn(...args);
};

export class RateLimiter {
  static canSubmit(formId: string): boolean {
    try {
      const records = this.getRecords();
      const now = Date.now();
      const userAgent = navigator.userAgent;

      const recentSubmissions = records.filter(
        (record) =>
          record.formId === formId &&
          now - record.timestamp < RATE_LIMIT_WINDOW &&
          record.userAgent === userAgent
      );

      return recentSubmissions.length < MAX_ATTEMPTS;
    } catch (error) {
      devError("[RateLimiter] Check failed:", error);
      return true;
    }
  }

  static recordSubmission(formId: string): void {
    try {
      const records = this.getRecords();
      const now = Date.now();
      const userAgent = navigator.userAgent;

      records.push({ timestamp: now, formId, userAgent });

      const cleanedRecords = records.filter(
        (record) => now - record.timestamp < RATE_LIMIT_WINDOW
      );

      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(cleanedRecords));
    } catch (error) {
      devError("[RateLimiter] Record failed:", error);
    }
  }

  static getTimeRemaining(formId: string): number {
    try {
      const records = this.getRecords();
      const now = Date.now();
      const userAgent = navigator.userAgent;

      const recentSubmissions = records
        .filter(
          (record) =>
            record.formId === formId &&
            now - record.timestamp < RATE_LIMIT_WINDOW &&
            record.userAgent === userAgent
        )
        .sort((a, b) => a.timestamp - b.timestamp);

      if (recentSubmissions.length < MAX_ATTEMPTS) return 0;

      const oldestTimestamp = recentSubmissions[0].timestamp;
      const timeRemaining = Math.ceil(
        (RATE_LIMIT_WINDOW - (now - oldestTimestamp)) / 1000
      );

      return Math.max(0, timeRemaining);
    } catch (error) {
      devError("[RateLimiter] Time remaining check failed:", error);
      return 0;
    }
  }

  private static getRecords(): RateLimitRecord[] {
    try {
      const data = localStorage.getItem(RATE_LIMIT_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      devError("[RateLimiter] Get records failed:", error);
      return [];
    }
  }
}

class HoneypotValidator {
  static validate(value: string | undefined | null): boolean {
    if (value && value.trim() !== "") {
      devWarn("[HoneypotValidator] Bot detected, honeypot filled");
      return false;
    }
    return true;
  }
}

export class FormSecurityValidator {
  static validate(
    formId: string,
    honeypotValue: string | undefined | null
  ): {
    valid: boolean;
    reason?: string;
    timeRemaining?: number;
  } {
    if (!HoneypotValidator.validate(honeypotValue)) {
      return { valid: false, reason: "bot_detected" };
    }

    if (!RateLimiter.canSubmit(formId)) {
      const timeRemaining = RateLimiter.getTimeRemaining(formId);
      return { valid: false, reason: "rate_limit_exceeded", timeRemaining };
    }

    return { valid: true };
  }
}