import styled from "@emotion/styled";
import { Box, Button, Link, Stack, useMediaQuery } from "@mui/material";
import { Root } from "../Root/root_styles";
export const ContainerGlobal = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100vw",
    height: "100vh",
    overflow: 'hidden',
    color: Root.gray,
    backgroundColor: Root.containTask,
}));
export const ContainerGlobalChildrens = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: "100%",
    color: Root.gray,
    backgroundColor: Root.light,
}));
export const BoxMain = styled(Box)(({
    theme,
    border,
    padding
}) => ({
    width: '90%',
    height: 'auto',
    paddingBlock: '1rem',
    borderRadius: "5px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Root.white,
    gap: 10,
    boxShadow: Root.boxShadow,
    border: border ? '0' : Root.border,
}));
export const MyButton = styled(Button)(({ theme, bg, colorstask }) => ({
    cursor: 'pointer',
    color: colorstask ? colorstask : Root.color_default,
    width: "100%",
    fontWeight: 900,
    outline: 'none !important',
    mt: 3,
    mb: 2,
    backgroundColor: bg ? bg : Root.color_button_secondary,
    borderRadius: '0',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    fontSize: '12px',

    '&:hover': {
        backgroundColor: Root.color_default,
        color: Root.color_button_secondary,
        cursor: 'pointer',
        boxShadow: Root.boxShadow
    },
}));
export const MyLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: Root.color_default,
    width: "100%",
    marginTop: 10,
    mb: 2,
    backgroundColor: Root.color_button_secondary,
    borderRadius: '0',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textDecoration: 'none',
    minHeight: '2rem',
    boxShadow: Root.boxShadow,
    '&:hover': {
        backgroundColor: Root.color_default,
        color: Root.color_button_secondary,
        cursor: 'pointer',
    },

}));
export const MyFooter = styled(Link)(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: "100%",
    height: '5%',
    fontFamily: Root.fontFamilyMonospace,
    bottom: 0,
    right: 0,
    zIndex: 1,
    textDecoration: 'none',
    backgroundColor: Root.white,
    color: Root.purple,
}));
export const NotificationCounter = styled(Stack)(({ theme, color }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    padding: '3px',
    borderRadius: '50%',
    color: color || 'white',
    backgroundColor: Root.red
}));
export const Items = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    boxShadow: Root.boxShadow,
    padding: '1px',
}));

export const ContainerTasks = styled(Stack)(({ theme, dire }) => ({
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: dire ? dire : "flex-start",
    gap: '20px',
    width: "100%",
    minHeight: "70%",
    height: "auto",
    overflow: 'auto',
    paddingBlock: '2rem',
    color: Root.gray,
    overflowX: 'hidden',
    backgroundColor: Root.containTask,
    marginBlock: '0',
    '&::-webkit-scrollbar': {
        width: '4px',
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: Root.color_button,
        borderRadius: '6px',
    },

    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
    },
}))
export const CardTaskMacthes = styled(Box)(({ mobile }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBlock: '0rem',
    maxHeight: '90%',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'auto',
    gap: '1rem',
    paddingBlock: mobile === 'true' ? "6rem" : "5rem",
    '&::-webkit-scrollbar': {
        width: '4px',
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: Root.color_button,
        borderRadius: '6px',
    },

    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
    },
}))