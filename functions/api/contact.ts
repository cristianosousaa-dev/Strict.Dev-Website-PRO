export interface Env {
  WEB3FORMS_ACCESS_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type IncomingPayload = {
  name?: string;
  company?: string;
  email?: string;
  requirements?: string;
  honeypot?: string;
  turnstileToken?: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function sanitize(input: unknown, maxLen: number) {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

async function verifyTurnstile(secret: string, token: string, ip?: string) {
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  const data = (await resp.json().catch(() => null)) as any;
  return !!data?.success;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: IncomingPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, message: "Pedido inválido." }, 400);
  }

  // Honeypot: se preenchido, tratamos como bot e devolvemos sucesso genérico
  if (sanitize(payload.honeypot, 200)) {
    return jsonResponse({ success: true });
  }

  const name = sanitize(payload.name, 80);
  const company = sanitize(payload.company, 120);
  const email = sanitize(payload.email, 120);
  const requirements = sanitize(payload.requirements, 5000);

  if (name.length < 2) return jsonResponse({ success: false, field: "name", message: "Nome inválido." }, 400);
  if (!/^\S+@\S+\.[A-Za-z]{2,}$/.test(email)) return jsonResponse({ success: false, field: "email", message: "Email inválido." }, 400);
  if (requirements.length < 10) return jsonResponse({ success: false, field: "requirements", message: "Mensagem demasiado curta." }, 400);

  // Turnstile (opcional): só validamos se houver secret configurada
  if (env.TURNSTILE_SECRET_KEY) {
    const token = sanitize(payload.turnstileToken, 5000);
    if (!token) {
      return jsonResponse({ success: false, field: "turnstile", message: "Confirma que não és um robô." }, 400);
    }
    const ip = request.headers.get("CF-Connecting-IP") || undefined;
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip);
    if (!ok) {
      return jsonResponse({ success: false, field: "turnstile", message: "Validação falhou. Tenta novamente." }, 400);
    }
  }

  if (!env.WEB3FORMS_ACCESS_KEY) {
    return jsonResponse({ success: false, message: "Configuração em falta no servidor." }, 500);
  }

  const web3Payload = {
    access_key: env.WEB3FORMS_ACCESS_KEY,
    name,
    email,
    company: company || "N/A",
    message: requirements,
    subject: `Novo contacto - ${name}`,
    from_name: "Strict.Dev Website",
    replyto: email,
  };

  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(web3Payload),
  });

  const out = (await resp.json().catch(() => null)) as any;

  if (!resp.ok || out?.success === false) {
    return jsonResponse({ success: false, message: "Não foi possível enviar. Tenta novamente em instantes." }, 502);
  }

  return jsonResponse({ success: true });
};
