import { Box, Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const LayoutMobile = {
    _containerMobile: styled(Stack)(({ }) => ({
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: '100vh',
        backgroundColor: Root.color_app_bar,
    })),
    _app_bar: styled(Box)(({ }) => ({
        position: 'fixed',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: '70px',

        bottom: 0,
        left: 0,

    })),
    _logoMobile: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })),
    _menuMobile: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
        cursor: 'pointer'
    })),
}