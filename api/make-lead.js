const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/ndmetggq64xyt12hi2we1w9bs8ami5fx";

function formatClientPhone(phone) {
  return String(phone ?? "")
    .replace(/\+/g, "")
    .trim();
}

function isValidBooking(body) {
  const clientPhone = formatClientPhone(body.client_phone);
  const address = String(body.address ?? "").trim();
  const cleaningType = String(body.cleaning_type ?? "").trim();
  const dateTime = String(body.date_time ?? "").trim();
  const area = Number(body.area);
  const calculatedPrice = Number(body.calculated_price);
  const phoneDigits = clientPhone.replace(/\D/g, "");
  const localDigits = phoneDigits.startsWith("7")
    ? phoneDigits.slice(1)
    : phoneDigits;

  return (
    address.length >= 3 &&
    cleaningType.length > 0 &&
    dateTime.length > 0 &&
    Number.isFinite(area) &&
    area > 0 &&
    Number.isFinite(calculatedPrice) &&
    calculatedPrice > 0 &&
    Number(body.current_step) === 7 &&
    String(body.status ?? "") === "confirmed" &&
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
    client_phone: formatClientPhone(body.client_phone),
    current_step: 7,
    cleaning_type: String(body.cleaning_type).trim(),
    area: Number(body.area),
    address: String(body.address).trim(),
    date_time: String(body.date_time).trim(),
    extras: String(body.extras ?? "").trim(),
    calculated_price: Number(body.calculated_price),
    status: "confirmed",
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
