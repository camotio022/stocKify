import { Divider, MenuItem, Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { Link } from "react-router-dom";

export const StylesOptions = {
    container: styled(Stack)(() => ({
        position: 'fixed',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100vw",
        height: "100vh",
        overflow: 'hidden',
        top: 0,
        left: 0,
        zIndex: 5,
        transition: 'all.3s',
        backgroundColor: Root.color_button_opacity,
    })),
    paper: styled(Stack)(({ moreitems }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent:  'flex-start',
        flexDirection: 'column',
        minWidth: '300px',
        minHeight: '100px',
        padding: '7px',
        backgroundColor: Root.color_app_bar,
        backgroundColor: Root.color_default,
        color: Root.color_button,
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        borderRadius: '4px',
        marginRight: '20px'
    })),
    title: styled(Stack)(({ moreitems }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '30px'
    })),
    divider: styled(Divider)(()=> ({
        width: '90%',
        backgroundColor: Root.color_button_opacity,
    })),
    item: styled(MenuItem)(()=> ({
        display: 'flex',
        alignItems: 'center',
        justifyContent:  'space-between',
        width: '90%',
        marginTop: '10px'
    })),
    link: styled(Link)(({})=> ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textDecoration: 'none',
        color: Root.color_button
    }))
}