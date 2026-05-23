/** Маска +7 7XX XXX XX XX (логика как в официальной форме QazCRM) */
export function formatPhoneNumber(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 0) return "";

  if (digits[0] === "8") {
    digits = "7" + digits.substring(1);
  }
  if (digits[0] !== "7") {
    digits = "7" + digits;
  }

  if (digits.length > 11) {
    digits = digits.substring(0, 11);
  }

  if (digits.length === 1) return "+7";

  if (digits.length <= 4) {
    return `+7 ${digits.substring(1)}`;
  }
  if (digits.length <= 7) {
    return `+7 ${digits.substring(1, 4)} ${digits.substring(4)}`;
  }
  if (digits.length <= 9) {
    return `+7 ${digits.substring(1, 4)} ${digits.substring(4, 7)} ${digits.substring(7)}`;
  }

  return `+7 ${digits.substring(1, 4)} ${digits.substring(4, 7)} ${digits.substring(7, 9)} ${digits.substring(9)}`;
}

/** Полный казахстанский номер: 11 цифр с кодом страны 7 */
export function isPhoneComplete(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 11;
}

/** Номер для API: те же цифры, что ввёл пользователь, без искажения маской */
export function phoneForSubmit(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return value.trim();
  return formatPhoneNumber(value);
}
