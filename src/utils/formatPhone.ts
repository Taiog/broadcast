export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    const ddd = cleaned.slice(0, 2);
    const firstDigit = cleaned.slice(2, 3);
    const middle = cleaned.slice(3, 7);
    const end = cleaned.slice(7);
    return `(${ddd}) ${firstDigit} ${middle}-${end}`;
  }

  return phone;
}
