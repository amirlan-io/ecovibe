export const QAZCRM_FORM_ID = "84be7530-2d6a-4066-b548-06748a90aada";

export const QAZCRM_FORM_URL = `https://crm.tennet.kz/api/public/forms/${QAZCRM_FORM_ID}/`;

/** Прокси на том же домене — обход CORS в браузере */
export const QAZCRM_SUBMIT_URL = "/api/qazcrm-lead";

/** Ключи кастомных полей — замените на реальные имена из QazCRM при необходимости */
export const QAZCRM_CUSTOM_FIELDS = {
  cleaning_type: "cleaning_type",
  area: "area",
  extras: "extras",
  address: "address",
  date_time: "date_time",
} as const;

export interface QazCrmLeadPayload {
  name: string;
  phone: string;
  /** Итоговая сумма сделки (число, без валюты) */
  price?: number;
  cleaning_type?: string;
  area?: number;
  extras?: string;
  address?: string;
  date_time?: string;
}

export async function parseQazCrmError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.detail)) return String(data.detail[0]);
    if (data && typeof data === "object") {
      const firstValue = Object.values(data)[0];
      if (Array.isArray(firstValue)) return String(firstValue[0]);
      if (firstValue) return String(firstValue);
    }
  } catch {
    // ignore JSON parse errors
  }
  return "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.";
}

function toApiBody(payload: QazCrmLeadPayload) {
  const body: Record<string, string | number> = {
    name: payload.name,
    phone: payload.phone,
    standard_name: payload.name,
    standard_phone: payload.phone,
  };

  if (payload.price != null) {
    const price = Number(payload.price);
    if (!Number.isNaN(price) && price > 0) {
      body.price = price;
      body.amount = price;
      body.standard_budget = price;
      body.standard_amount = price;
    }
  }

  const customFields: [keyof typeof QAZCRM_CUSTOM_FIELDS, string | number | undefined][] = [
    ["cleaning_type", payload.cleaning_type],
    ["area", payload.area],
    ["extras", payload.extras],
    ["address", payload.address],
    ["date_time", payload.date_time],
  ];

  for (const [field, value] of customFields) {
    if (value == null || value === "") continue;
    const apiKey = QAZCRM_CUSTOM_FIELDS[field];
    body[apiKey] = typeof value === "number" ? value : String(value);
  }

  return body;
}

export async function submitLeadToQazCrm(payload: QazCrmLeadPayload) {
  let response: Response;

  try {
    response = await fetch(QAZCRM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toApiBody(payload)),
    });
  } catch {
    throw new Error(
      "Не удалось отправить заявку. Проверьте интернет или напишите нам в WhatsApp.",
    );
  }

  if (!response.ok) {
    throw new Error(await parseQazCrmError(response));
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
