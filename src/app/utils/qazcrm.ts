export const QAZCRM_FORM_ID = "84be7530-2d6a-4066-b548-06748a90aada";

export const QAZCRM_FORM_URL = `https://crm.tennet.kz/api/public/forms/${QAZCRM_FORM_ID}/`;

/** Прокси на том же домене — обход CORS в браузере */
export const QAZCRM_SUBMIT_URL = "/api/qazcrm-lead";

/**
 * Ключи кастомных полей — должны совпадать с `name` из GET /api/public/forms/{id}/.
 * Сейчас в форме только standard_name и standard_phone; остальные ключи CRM не сохраняет,
 * пока поля не добавят в конструкторе лид-формы QazCRM.
 */
export const QAZCRM_CUSTOM_FIELDS = {
  cleaning_type: "cleaning_type",
  area: "area",
  extras: "extras",
  address: "address",
  date_time: "date_time",
} as const;

function buildOrderDetailsComment(payload: QazCrmLeadPayload): string {
  const lines: string[] = [];

  if (payload.cleaning_type) {
    lines.push(`Услуга: ${payload.cleaning_type}`);
  }
  if (payload.area != null) {
    lines.push(`Площадь: ${payload.area} м²`);
  }
  if (payload.extras) {
    lines.push(`Доп. услуги: ${payload.extras}`);
  } else {
    lines.push("Доп. услуги: —");
  }
  if (payload.address) {
    lines.push(`Адрес: ${payload.address}`);
  }
  if (payload.date_time) {
    lines.push(`Дата и время: ${payload.date_time}`);
  }
  if (payload.price != null && !Number.isNaN(Number(payload.price))) {
    lines.push(`Расчётная сумма: ${Number(payload.price).toLocaleString("ru-RU")} ₸`);
  }

  return lines.join("\n");
}

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

  if (payload.address?.trim()) {
    body.standard_address = payload.address.trim();
    body.address = payload.address.trim();
  }

  const orderDetails = buildOrderDetailsComment(payload);
  if (orderDetails) {
    body.comments = orderDetails;
    body.comment = orderDetails;
    body.standard_comments = orderDetails;
    body.description = orderDetails;
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
