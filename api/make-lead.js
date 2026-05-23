const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/3q66ii6temuioymdiplpxcrjiv7tl2vd";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body ?? {};
  const address = String(body.address ?? "").trim();
  const phoneDigits = String(body.client_phone ?? "").replace(/\D/g, "");

  if (!address || phoneDigits.length < 11) {
    return res.status(400).json({
      error: "Адрес и телефон обязательны для записи в таблицу.",
    });
  }

  try {
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await makeResponse.text();

    return res.status(makeResponse.ok ? 200 : makeResponse.status).json({
      ok: makeResponse.ok,
      message: text || "Accepted",
    });
  } catch (error) {
    console.error("Make webhook proxy error:", error);
    return res.status(500).json({
      error: "Не удалось связаться с Make. Попробуйте позже.",
    });
  }
}
