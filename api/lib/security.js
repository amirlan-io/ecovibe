const ALLOWED_ORIGINS = new Set([
  "https://www.ecovibe.kz",
  "https://ecovibe.kz",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
]);

const MAX_JSON_BYTES = 12_000;

export function applyCors(req, res) {
  const origin = req.headers.origin;
  if (typeof origin === "string" && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function isAllowedRequest(req) {
  const origin = req.headers.origin;
  if (typeof origin === "string" && ALLOWED_ORIGINS.has(origin)) {
    return true;
  }

  const referer = req.headers.referer;
  if (typeof referer === "string") {
    try {
      const url = new URL(referer);
      return ALLOWED_ORIGINS.has(`${url.protocol}//${url.host}`);
    } catch {
      return false;
    }
  }

  return process.env.VERCEL_ENV !== "production";
}

export function rejectDisallowed(req, res) {
  if (isAllowedRequest(req)) return false;
  res.status(403).json({ error: "Forbidden" });
  return true;
}

export function isBodyTooLarge(req) {
  const length = Number(req.headers["content-length"] ?? 0);
  return Number.isFinite(length) && length > MAX_JSON_BYTES;
}

export function sanitizeText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(digits);
}

export function isValidLeadId(leadId) {
  const id = String(leadId ?? "");
  return /^[0-9]{1,12}$/.test(id);
}

export function isHoneypotTriggered(body) {
  const trap = body?.website ?? body?.honeypot ?? body?.url;
  return typeof trap === "string" && trap.trim().length > 0;
}

export async function updateLeadAmount(leadId, amount) {
  const token = process.env.QAZCRM_API_TOKEN;
  if (!token || !isValidLeadId(leadId)) return false;

  try {
    const response = await fetch(
      `https://crm.tennet.kz/api/auth/leads/${leadId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ amount }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
