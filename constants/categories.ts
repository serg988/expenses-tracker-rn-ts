export const catArray = [
  'Продукты',
  'Пиво',
  'Бензин',
  'Аптека',
  'Авто',
  'Собаки',
  'Куры',
  'Ремонт',
  'Коммунальные',
  'Другое',
] as const

export type CatArrayType = typeof catArray[number]