/** Article dates are editorial calendar dates, independent of the reader's timezone. */
export function formatArticleDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}
