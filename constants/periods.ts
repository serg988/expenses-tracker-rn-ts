export const periodArray = ['Сегодня','За неделю', 'За месяц', 'За год'] as const

export type PeriodArrayType = typeof periodArray[number]
