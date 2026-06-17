/** Прокси — обход CORS при вызове Make из браузера */
export const MAKE_SHEETS_SUBMIT_URL = "/api/make-lead";

/** Ключи совпадают с колонками Google Таблицы / маппингом в Make */
export interface MakeSheetsLeadPayload {
  client_phone: string;
  cleaning_type: string;
  area: number;
  calculated_price: number;
  current_step?: number;
  address?: string;
  date_time?: string;
  extras?: string;
  status?: string;
}

export function formatClientPhoneForSheets(phone: string): string {
  return phone.replace(/\+/g, "").trim();
}

export function isMakeSheetsPayloadValid(payload: MakeSheetsLeadPayload): boolean {
  const phoneDigits = payload.client_phone.replace(/\D/g, "");
  const localDigits = phoneDigits.startsWith("7")
    ? phoneDigits.slice(1)
    : phoneDigits;

  if (!payload.cleaning_type.trim()) return false;
  if (!Number.isFinite(payload.area) || payload.area <= 0) return false;
  if (!Number.isFinite(payload.calculated_price) || payload.calculated_price <= 0) {
    return false;
  }
  if (phoneDigits.length < 11) return false;
  if (/^7+$/.test(localDigits)) return false;

  return true;
}

export async function submitBookingToMakeBackup(payload: MakeSheetsLeadPayload) {
  if (!isMakeSheetsPayloadValid(payload)) {
    throw new Error("Неполные данные для записи в таблицу.");
  }

  const body = {
    client_phone: formatClientPhoneForSheets(payload.client_phone),
    cleaning_type: payload.cleaning_type.trim(),
    area: Number(payload.area),
    calculated_price: Number(payload.calculated_price),
    extras: payload.extras?.trim() ?? "",
    status: "new",
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
