// utils/dateLabel.ts
export function getDateLabel(dateStr: string) {
  const msgDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = msgDate.toDateString() === today.toDateString();
  const isYesterday = msgDate.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return msgDate.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
}
