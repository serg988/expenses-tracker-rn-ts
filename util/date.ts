export function getFormattedDate(dateString = new Date()) {
  const date = new Date(dateString)
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

export function getDateMinusDays(dateString: string, days: number) {
  const date = new Date(dateString)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
