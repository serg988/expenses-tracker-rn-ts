import { useAppSelector } from './hooks'

export type ColorId = {
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

// export default function useColor(colorId: keyof ColorId) {
//   const themeId = useAppSelector((state) => state.settings.themeId)
//   const COLORS = {
//     dark: {
//       primary50: '#e4d9fd',
//       primary100: '#c6affc',
//       primary200: '#a281f0',
//       // primary400: '#5721d4',
//       primary500: '#3e04c3',
//       primary700: '#2d0689',
//       primary800: '#200364',
//       accent500: '#f7bc0c',
//       error50: '#fcc4e4',
//       error500: '#9b095c',
//       gray500: '#39324a',
//       gray700: '#221c30',
//     },
//     light: {
//       primary50: '#daefd8',
//       primary100: '#AEC670',
//       primary200: '#AEC670',
//       // primary400: '#A91079',
//       primary500: '#778D45',
//       primary700: '#1A2902',
//       primary800: '#1A2902',
//       accent500: '#f7bc0c',
//       error50: '#fcc4e4',
//       error500: '#9b095c',
//       gray500: '#39324a',
//       gray700: '#221c30',
//     },
//     // {
//     //   primary50: '#F1EEE9',
//     //     primary100: '#f2d88a',
//     //       primary200: '#EC994B',
//     //         // primary400: '#A91079',
//     //         primary500: '#3e444a',
//     //           primary700: '#321905',
//     //             primary800: '#15133C',
//     //               accent500: '#f7bc0c',
//     //                 error50: '#fcc4e4',
//     //                   error500: '#9b095c',
//     //                     gray500: '#39324a',
//     //                       gray700: '#221c30',
//     //   },
//   }
//   const colorTheme = COLORS[themeId]
//   const color: string = colorTheme[colorId]
//   return color
// }

export default function useTheme() {
  const themeId = useAppSelector((state) => state.settings.themeId)
  return themeId
}
