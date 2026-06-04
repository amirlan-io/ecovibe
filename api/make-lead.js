const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/3q66ii6temuioymdiplpxcrjiv7tl2vd";

function isValidBooking(body) {
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const address = String(body.address ?? "").trim();
  const cleaningType = String(body.cleaningType ?? "").trim();
  const area = Number(body.area);
  const totalPrice = Number(body.totalPrice);
  const phoneDigits = phone.replace(/\D/g, "");
  const localDigits = phoneDigits.startsWith("7")
    ? phoneDigits.slice(1)
    : phoneDigits;

  return (
    name.length >= 2 &&
    address.length >= 3 &&
    cleaningType.length > 0 &&
    Number.isFinite(area) &&
    area > 0 &&
    Number.isFinite(totalPrice) &&
    totalPrice > 0 &&
    phoneDigits.length >= 11 &&
    !/^7+$/.test(localDigits)
  );
}

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

  if (!isValidBooking(body)) {
    return res.status(400).json({
      error: "Заполните все поля формы перед отправкой в таблицу.",
    });
  }

  const payload = {
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    address: String(body.address).trim(),
    cleaningType: String(body.cleaningType).trim(),
    area: Number(body.area),
    extras: String(body.extras ?? "").trim(),
    totalPrice: Number(body.totalPrice),
  };

  try {
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
