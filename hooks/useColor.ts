import { useAppSelector } from './hooks'

export type ColorTheme = {
  primary50: string
  primary100: string
  primary200: string
  primary500: string
  primary700: string
  primary800: string
  accent500: string
  error50: string
  error500: string
  gray500: string
  gray700: string
}

export default function useColor() {
  const themeId = useAppSelector((state) => state.settings.themeId)
  return themeId
}
