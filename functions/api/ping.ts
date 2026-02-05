function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export const onRequestGet: PagesFunction = async (context) => {
  const envAny = context.env as any;

  return json({
    ok: true,
    time: new Date().toISOString(),
    has_WEB3FORMS_ACCESS_KEY: !!(envAny.WEB3FORMS_ACCESS_KEY && String(envAny.WEB3FORMS_ACCESS_KEY).trim()),
    host: context.request.headers.get("host"),
  });
};
