/** Прокси — обход CORS при вызове Make из браузера */
export const MAKE_SHEETS_SUBMIT_URL = "/api/make-lead";

export interface MakeBookingBackupPayload {
  name: string;
  phone: string;
  address: string;
  cleaningType: string;
  area: number;
  extras: string;
  totalPrice: number;
}

/** Только полная заявка после submit — без пустых/неполных телефонов */
export function isMakeBookingPayloadValid(
  payload: MakeBookingBackupPayload,
): boolean {
  const phoneDigits = payload.phone.replace(/\D/g, "");
  const localDigits = phoneDigits.startsWith("7")
    ? phoneDigits.slice(1)
    : phoneDigits;

  if (!payload.name.trim() || payload.name.trim().length < 2) return false;
  if (!payload.address.trim() || payload.address.trim().length < 3) return false;
  if (!payload.cleaningType.trim()) return false;
  if (!Number.isFinite(payload.area) || payload.area <= 0) return false;
  if (!Number.isFinite(payload.totalPrice) || payload.totalPrice <= 0) return false;
  if (phoneDigits.length < 11) return false;
  if (/^7+$/.test(localDigits)) return false;

  return true;
}

export async function submitBookingToMakeBackup(
  payload: MakeBookingBackupPayload,
) {
  if (!isMakeBookingPayloadValid(payload)) {
    throw new Error("Неполные данные для резервной записи в таблицу.");
  }

  const body = {
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    address: payload.address.trim(),
    cleaningType: payload.cleaningType.trim(),
    area: payload.area,
    extras: payload.extras.trim(),
    totalPrice: Number(payload.totalPrice),
  };

  let response: Response;

  try {
    response = await fetch(MAKE_SHEETS_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Не удалось записать заявку в резервную таблицу.");
  }

  if (!response.ok) {
    throw new Error("Ошибка вебхука Make при записи в Google Таблицу.");
  }

  return null;
}
