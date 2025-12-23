/**
 * Enterprise-Grade Security Utilities
 * Rate Limiting & Bot Detection for Strict.Dev
 * 
 * @module security
 * @version 2.0
 */

// ============================================================
// RATE LIMITER
// ============================================================

const RATE_LIMIT_KEY = 'strict_dev_rate_limit';
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_ATTEMPTS = 3; // Max 3 submissions per minute per form

interface RateLimitRecord {
  timestamp: number;
  formId: string;
  userAgent: string;
}

export class RateLimiter {
  /**
   * Check if user can submit form
   * @param formId - Unique form identifier
   * @returns boolean - true if can submit
   */
  static canSubmit(formId: string): boolean {
    try {
      const records = this.getRecords();
      const now = Date.now();
      const userAgent = navigator.userAgent;

      // Count recent submissions for this form
      const recentSubmissions = records.filter(
        (record) =>
          record.formId === formId &&
          now - record.timestamp < RATE_LIMIT_WINDOW &&
          record.userAgent === userAgent
      );

      return recentSubmissions.length < MAX_ATTEMPTS;
    } catch (error) {
      console.error('[RateLimiter] Check failed:', error);
      return true; // Fail open to not block legitimate users
    }
  }

  /**
   * Record a form submission
   * @param formId - Unique form identifier
   */
  static recordSubmission(formId: string): void {
    try {
      const records = this.getRecords();
      const now = Date.now();
      const userAgent = navigator.userAgent;

      // Add new record
      records.push({
        timestamp: now,
        formId,
        userAgent,
      });

      // Clean old records (older than rate limit window)
      const cleanedRecords = records.filter(
        (record) => now - record.timestamp < RATE_LIMIT_WINDOW
      );

      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(cleanedRecords));
    } catch (error) {
      console.error('[RateLimiter] Record failed:', error);
    }
  }

  /**
   * Get time remaining until user can submit again (in seconds)
   * @param formId - Unique form identifier
   * @returns number - seconds remaining (0 if can submit)
   */
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

      if (recentSubmissions.length < MAX_ATTEMPTS) {
        return 0;
      }

      // Calculate when oldest submission expires
      const oldestTimestamp = recentSubmissions[0].timestamp;
      const timeRemaining = Math.ceil(
        (RATE_LIMIT_WINDOW - (now - oldestTimestamp)) / 1000
      );

      return Math.max(0, timeRemaining);
    } catch (error) {
      console.error('[RateLimiter] Time remaining check failed:', error);
      return 0;
    }
  }

  /**
   * Get all rate limit records from localStorage
   */
  private static getRecords(): RateLimitRecord[] {
    try {
      const data = localStorage.getItem(RATE_LIMIT_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[RateLimiter] Get records failed:', error);
      return [];
    }
  }

  /**
   * Clear all rate limit records (admin/debug only)
   */
  static clear(): void {
    try {
      localStorage.removeItem(RATE_LIMIT_KEY);
      console.log('[RateLimiter] Records cleared');
    } catch (error) {
      console.error('[RateLimiter] Clear failed:', error);
    }
  }

  /**
   * Get statistics (debug only)
   */
  static getStats(formId: string): {
    totalRecords: number;
    recentSubmissions: number;
    canSubmit: boolean;
    timeRemaining: number;
  } {
    const records = this.getRecords();
    const now = Date.now();
    const userAgent = navigator.userAgent;

    const recentSubmissions = records.filter(
      (record) =>
        record.formId === formId &&
        now - record.timestamp < RATE_LIMIT_WINDOW &&
        record.userAgent === userAgent
    );

    return {
      totalRecords: records.length,
      recentSubmissions: recentSubmissions.length,
      canSubmit: this.canSubmit(formId),
      timeRemaining: this.getTimeRemaining(formId),
    };
  }
}

// ============================================================
// HONEYPOT VALIDATOR
// ============================================================

export class HoneypotValidator {
  /**
   * Validate honeypot field (should be empty)
   * @param value - Honeypot field value
   * @returns boolean - true if valid (empty = human)
   */
  static validate(value: string | undefined | null): boolean {
    // Bot detected if honeypot is filled
    if (value && value.trim() !== '') {
      console.warn('[HoneypotValidator] Bot detected - honeypot filled');
      return false;
    }
    return true;
  }

  /**
   * Get honeypot field props for form input
   * @returns object - input props for honeypot field
   */
  static getFieldProps() {
    return {
      type: 'text' as const,
      name: 'website', // Common field name that bots auto-fill
      autoComplete: 'off' as const,
      tabIndex: -1,
      'aria-hidden': 'true' as const,
      style: {
        position: 'absolute' as const,
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none' as const,
      },
    };
  }
}

// ============================================================
// FORM SECURITY VALIDATOR
// ============================================================

export class FormSecurityValidator {
  /**
   * Comprehensive form validation before submission
   * @param formId - Form identifier
   * @param honeypotValue - Honeypot field value
   * @returns object - validation result
   */
  static validate(
    formId: string,
    honeypotValue: string | undefined | null
  ): {
    valid: boolean;
    reason?: string;
    timeRemaining?: number;
  } {
    // 1. Check honeypot
    if (!HoneypotValidator.validate(honeypotValue)) {
      return {
        valid: false,
        reason: 'bot_detected',
      };
    }

    // 2. Check rate limit
    if (!RateLimiter.canSubmit(formId)) {
      const timeRemaining = RateLimiter.getTimeRemaining(formId);
      return {
        valid: false,
        reason: 'rate_limit_exceeded',
        timeRemaining,
      };
    }

    return { valid: true };
  }
}

// ============================================================
// EXPORTS
// ============================================================

export default {
  RateLimiter,
  HoneypotValidator,
  FormSecurityValidator,
};
