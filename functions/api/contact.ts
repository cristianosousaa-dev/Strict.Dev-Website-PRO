export interface Env {
  WEB3FORMS_ACCESS_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  requirements?: string;
  honeypot?: string;
  turnstileToken?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // aceita os dois nomes para não haver dúvidas
    const envAny = context.env as any;
    const accessKey = String(
      context.env.WEB3FORMS_ACCESS_KEY || envAny.WEB3FORMS_ACCESS_KEY || ""
    ).trim();

    if (!accessKey) {
      console.log("WEB3FORMS key em falta");
      return json(
        { success: false, message: "Configuração em falta: WEB3FORMS_ACCESS_KEY" },
        500
      );
    }

    let body: Payload;
    try {
      body = (await context.request.json()) as Payload;
    } catch {
      return json({ success: false, message: "Body inválido" }, 400);
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const requirements = (body.requirements || "").trim();
    const honeypot = (body.honeypot || "").trim();
    const turnstileToken = (body.turnstileToken || "").trim();

    if (honeypot) return json({ success: true }, 200);

    if (name.length < 2) return json({ success: false, message: "Nome inválido" }, 400);
    if (!isEmail(email)) return json({ success: false, message: "Email inválido" }, 400);
    if (requirements.length < 10)
      return json({ success: false, message: "Descrição muito curta" }, 400);

    // Turnstile só se houver token
    const turnstileSecret = String(context.env.TURNSTILE_SECRET_KEY || envAny.TURNSTILE_SECRET_KEY || "").trim();
    if (turnstileToken) {
      if (!turnstileSecret) {
        return json(
          { success: false, message: "Configuração em falta: TURNSTILE_SECRET_KEY" },
          500
        );
      }

      const ip = context.request.headers.get("CF-Connecting-IP") || "";
      const form = new FormData();
      form.append("secret", turnstileSecret);
      form.append("response", turnstileToken);
      if (ip) form.append("remoteip", ip);

      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: form,
      });

      const verifyJson = (await verify.json().catch(() => null)) as any;
      if (!verifyJson?.success) {
        return json({ success: false, message: "Falha na validação anti spam" }, 400);
      }
    }

    // Web3Forms: usa os campos standard
    const payload = {
      access_key: accessKey,
      subject: "Novo pedido via Strict.Dev",
      name,
      email,
      message: requirements,
      company,
    };

    const web3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await web3Res.text();
    let web3Json: any = null;
    try {
      web3Json = JSON.parse(raw);
    } catch {
      // fica null e mostramos raw em debug
    }

    console.log("Web3Forms status:", web3Res.status);

    if (!web3Res.ok || !web3Json?.success) {
      return json(
        {
          success: false,
          message: "Web3Forms rejeitou o pedido",
          status: web3Res.status,
          detail: web3Json || raw.slice(0, 300),
        },
        400
      );
    }

    return json({ success: true }, 200);
  } catch (err: any) {
    console.log("Erro interno:", String(err?.message || err));
    return json(
      { success: false, message: "Erro interno na Function", detail: String(err?.message || err) },
      500
    );
  }
};
