export function formatPhoneNumber(value: string): string {
  // Удаляем все нечисловые символы
  const numbers = value.replace(/\D/g, '');

  // Если начинается с 8, заменяем на 7
  let digits = numbers.startsWith('8') ? '7' + numbers.slice(1) : numbers;

  // Если начинается с 7, используем как есть
  if (digits.startsWith('7')) {
    digits = digits.slice(1); // Убираем первую 7
  }

  // Ограничиваем до 10 цифр (после +7)
  digits = digits.slice(0, 10);

  // Форматируем: +7 7XX XXX XX XX
  let formatted = '+7';

  if (digits.length > 0) {
    formatted += ' 7' + digits.slice(0, 2);
  }
  if (digits.length > 2) {
    formatted += ' ' + digits.slice(2, 5);
  }
  if (digits.length > 5) {
    formatted += ' ' + digits.slice(5, 7);
  }
  if (digits.length > 7) {
    formatted += ' ' + digits.slice(7, 9);
  }

  return formatted;
}
