import { Button, FormControl, Stack, TextField, Typography, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
export const TagsNewItem = {
    container: styled(Stack)(({ }) => ({
        position: 'fixed',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        overflow: 'hidden',
        top: 0,
        left: 0,
        zIndex: 5,
        transition: 'all .3s',
        backgroundColor: Root.color_button_opacity,
    })),
    paper: styled(Stack)(({ moreitems }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: moreitems ? 'flex-start' : 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '4px',
        boxShadow: Root.boxS,
        width: '30%',
        minHeight: '10%',
        backgroundColor: Root.color_app_bar,
        border: `1px solid ${Root.color_button_opacity}`,
        boxShadow: Root.boxS,
        borderRadius: '4px',
        padding: '5% 5% 2% 5%',
        transition: 'all .4s',
        transition: 'height width 0.4s',
        fontFamily: Root.fontFamilyMonospace
    })),
    close: styled(Stack)(({ }) => ({
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '6px',
        borderRadius: '50%',
        border: `1px solid ${Root.color_button}`,
        backgroundColor: Root.color_button,
        color: Root.color_default,
        fontWeight: 'bold',
        top: '10px',
        right: '20px',
        cursor: 'pointer',
        ...Root.boxS,
        ...Root.hoverReverse,
        fontFamily: Root.fontFamilyMonospace
    })),
    fromControl: styled(FormControl)(({ }) => ({
        width: '48%',
        backgroundColor: Root.color_default,
        color: Root.color_button,
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        border: `1px solid ${Root.color_button_opacity}`,
        borderRadius: '4px',
        ...Root.boxS,
        height: '54px',
    })),
    typography: styled(Typography)(({ }) => ({
        position: 'absolute',
        top: '14px',
        right: 'auto',
        left: 'auto',
        fontFamily: Root.fontFamilyMonospace,
        fontSize: '18px',
        color: Root.color_button,
        fontWeight: 'bold'
    })),
    textfield: styled(TextField)(({ }) => ({
        width: '48%',
        backgroundColor: Root.color_default,
        color: Root.color_button,
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        border: `1px solid ${Root.color_button_opacity}`,
        borderRadius: '4px',
        ...Root.boxS,
        height: '54px',
    })),
    submit: styled(Button)(({ }) => ({
        ":focus": {
            outline: 'none',
            ...Root.boxS,
            ...Root.hover,
            border: `1px solid ${Root.color_button}`,
        },
        marginTop: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '98%',
        height: '43px',
        backgroundColor: Root.color_default,
        color: Root.color_button,
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        border: `1px solid ${Root.color_button}`,
        borderRadius: '4px',
        ...Root.boxS,
        ...Root.hover,

    }))
}