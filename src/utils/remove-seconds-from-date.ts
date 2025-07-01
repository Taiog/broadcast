export function removeSecondsFromDate(date: Date): Date {
  date.setSeconds(0, 0);
  return date;
}
