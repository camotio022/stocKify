import { Divider, MenuItem, Stack } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/node/styles";

export const StylesOptions = {
    container: styled(Stack)(() => ({
        position: 'fixed',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: 'wrap',
        gap: '12px',
        width: "100vw",
        height: "100vh",
        overflowY: 'scroll',
        paddingBlock: '12px',
        top: 0,
        left: 0,
        zIndex: 5,
        transition: 'all.3s',
    })),
    paper: styled(Stack)(({ moreitems }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        minHeight: '55%',
        width: '300px',
        padding: '7px',
        backgroundColor: Root.color_default,
        color: Root.color_button,
        fontWeight: 'bold',

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
    divider: styled(Divider)(() => ({
        width: '80%',
    })),
    item: styled(MenuItem)(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: '10px',
        boxSizing: 'border-box',
        fontSize: '14px',        // 14px com peso 600 dá uma leitura muito mais "clean" e moderna que 16px
        fontFamily: Root.fontFamilySansSerif,
        fontWeight: 600,
        transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: Root.white,
        textDecoration: 'none',
        borderRadius: '10px',
        ":hover": {
            color: Root.containTask, // Roxo do logo
             background: `linear-gradient(90deg, rgba(155, 0, 175, 0.84) 0%, rgb(23, 163, 184) 100%)`,
            boxShadow: 'inset 4px 0px 0px ' + Root.color_button, // Barra lateral de destaque interna
        },
    })),
    link: styled(Link)(({ }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textDecoration: 'none',
        color: Root.white
    }))
}