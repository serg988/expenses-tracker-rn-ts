export function getFormattedDate(date = new Date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
