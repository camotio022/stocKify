import { grey } from "@mui/material/colors";

export const Root = {
  containTask: 'white',
  gray_desfius: '#A8ADB3',
  color_app_bar: '#F5F5F5',
  color_default: '#ffffff',
  color_button: 'green',
  color_button_secondary: "#932dd2",
  color_button_opacity: 'rgba(255, 165, 0, 0.3)',
  color_link: '#93dd2',
  subButton: 'rgba(169, 169, 169, 0.5)',
  blue: '#007bff',
  black: 'black',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
  white: '#fff',
  gray: '#6c757d',
  grayDark: '#343a40',
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  hover: {
    ':hover': {
      backgroundColor: 'orange',
      color: '#fff',
      transition: '0.3s ease',
      cursor: 'pointer',
    }
  },
  hoverReverse: {
    ':hover': {
      color: 'orange',
      backgroundColor: '#fff',
      transition: '0.3s ease',
      cursor: 'pointer',
    }
  },
  hoverStatic: {
    backgroundColor: 'orange',
    color: '#fff',
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '3px',
      borderRadius: '6px',
      backgroundColor: 'orange',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'orange',
      borderRadius: '6px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'orange',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: 'orange',
  },
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#343a40',
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  boxShadowTask: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  boxS: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  boxShadowOrange: `0 0 10px orange`,
  border: '1px solid #F5F5F5',
  breakpointXS: '0',
  breakpointSM: '576px',
  breakpointMD: '768px',
  breakpointLG: '992px',
  breakpointXL: '1200px',
  fontFamilySansSerif:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  fontFamilyMonospace:
    'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
};
