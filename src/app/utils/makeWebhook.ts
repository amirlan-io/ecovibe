/** Прокси — обход CORS при вызове Make из браузера */
export const MAKE_SHEETS_SUBMIT_URL = "/api/make-lead";

export interface MakeSheetsLeadPayload {
  client_phone: string;
  cleaning_type: string;
  area: number;
  address: string;
  date_time: string;
  extras: string;
  calculated_price: number;
  status: string;
  current_step: number;
}

export function isMakeSheetsPayloadValid(
  payload: MakeSheetsLeadPayload,
): boolean {
  const phoneDigits = payload.client_phone.replace(/\D/g, "");
  return (
    Boolean(payload.address.trim()) &&
    phoneDigits.length >= 11 &&
    Boolean(payload.client_phone.trim())
  );
}

export async function submitLeadToMakeSheets(payload: MakeSheetsLeadPayload) {
  if (!isMakeSheetsPayloadValid(payload)) {
    throw new Error("Неполные данные для записи в таблицу.");
  }

  let response: Response;

  try {
    response = await fetch(MAKE_SHEETS_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Не удалось записать заявку в резервную таблицу.");
  }

  if (!response.ok) {
    throw new Error("Ошибка вебхука Make при записи в Google Таблицу.");
  }

  return null;
}
