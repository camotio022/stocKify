import { grey } from "@mui/material/colors";
import { colors } from "./colors";

export const Root = {
  containTask: colors.containTask,
  gray_desfius: colors.gray_desfius,
  tableBg: colors.tableBg,
  blurred_background: colors.blurred_background,
  color_app_bar: colors.color_app_bar,
  color_default: colors.color_default,
  color_button: colors.color_button,
  color_button_secondary: colors.color_button_secondary,
  color_link: colors.color_link,
  subButton: colors.subButton,
  borderImage: colors.borderImage,
  blue: colors.blue,
  black: colors.black,
  indigo: colors.indigo,
  purple: colors.purple,
  pink: colors.pink,
  red: colors.red,
  orange: colors.orange,
  yellow: colors.yellow,
  green: colors.green,
  teal: colors.teal,
  cyan: colors.cyan,
  white: colors.white,
  gray: colors.gray,
  grayDark: colors.grayDark,
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
  danger: colors.danger,
  light: colors.light,
  dark: colors.dark,
  danger: colors.danger,
  doacao: colors.doacao,
  backgroundCyan: colors.backgroundCyan,
  // Estilos compostos utilizando as referências do objeto colors
  hover: {
    ':hover': {
      backgroundColor: colors.orange,
      color: colors.white,
      transition: '0.3s ease',
      cursor: 'pointer',
    }
  },
  hoverReverse: {
    ':hover': {
      color: colors.orange,
      backgroundColor: colors.white,
      transition: '0.3s ease',
      cursor: 'pointer',
    }
  },
  hoverStatic: {
    backgroundColor: colors.orange,
    color: colors.white,
  },
  defaultBotton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '8px',
    minWidth: 'auto',
    height: '24px',
    padding: '8px',
    backgroundColor: colors.orange,
    color: colors.white,
    borderRadius: '4px',
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '3px',
      borderRadius: '6px',
      backgroundColor: colors.orange,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.orange,
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: colors.orange,
    },
    scrollbarWidth: 'thin',
    scrollbarColor: colors.orange,
  },

  // Sombras, Bordas e Layout
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  boxShadowTask: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  boxS: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  boxShadowOrange: `0 0 10px ${colors.orange}`,
  border: `1px solid ${colors.color_app_bar}`, // Usando a cor de fundo do app bar para a borda leve

  // Breakpoints
  breakpointXS: '0',
  breakpointSM: '576px',
  breakpointMD: '768px',
  breakpointLG: '992px',
  breakpointXL: '1200px',

  // Tipografia
  fontFamilySansSerif:
    '"Geist Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace:
    '"Geist Mono", "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace',
};