const rateLimit = new Map();

export function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  const requests = rateLimit.get(ip) || [];
  const recent = requests.filter((time) => now - time < windowMs);

  if (recent.length >= maxRequests) return false;

  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}
