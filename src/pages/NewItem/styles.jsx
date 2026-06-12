import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const TagsNewItem = {
    // 🌌 OVERLAY ESCURO COM DESFOQUE DE CINEMA
    container: styled(Stack)(() => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100, // Fica acima da sidebar e tabelas
        backgroundColor: 'rgba(10, 6, 22, 0.5)', // Cortina escura translúcida
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease-in-out',
    })),

    // 🔮 CAPSULA GLASSMORPHIC ULTRA SLIM
    paper: styled(Stack)(() => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '440px',
        maxHeight: '90vh',
        padding: '50px 24px 28px 24px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'rgba(20, 15, 35, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        ...Root.scrollBar
    })),

    // 👑 TÍTULO DO PRODUTO (UPPERCASE NEON)
    typography: styled(Typography)(() => ({
        position: 'absolute',
        top: '20px',
        left: '24px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '12px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'rgba(255, 255, 255, 0.4)',
    })),

    // ❌ BOTÃO FECHAR CRIOGÊNICO REATIVO
    close: styled(Stack)(() => ({
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        color: 'rgba(255, 255, 255, 0.6)',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            color: '#FFF',
            transform: 'rotate(90deg)',
        }
    })),

    // 🎛️ FORMS DE SELEÇÃO NO ESTILO ESCURO
    fromControl: styled(FormControl)(() => ({
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.2s ease-in-out',
        '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            color: '#FFF',
            fontFamily: Root.fontFamilySansSerif,
            fontSize: '14px',
            '&:before, &:after': { display: 'none' },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: Root.fontFamilySansSerif,
            fontSize: '14px',
            '&.Mui-focused': {
                color: 'inherit' // Herda a cor injetada via SX para manter o camaleão ativo
            }
        },
        '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            color: '#FFF',
        },
        '& .MuiSvgIcon-root': {
            color: 'rgba(255, 255, 255, 0.3)'
        }
    })),

    // ⌨️ INPUTS DE TEXTO VIDRO FUMÊ
    textfield: styled(TextField)(() => ({
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.2s ease-in-out',
        '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            color: '#FFF',
            fontFamily: Root.fontFamilySansSerif,
            fontSize: '14px',
            '&:before, &:after': { display: 'none' },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: Root.fontFamilySansSerif,
            fontSize: '14px',
            '&.Mui-focused': {
                color: 'inherit'
            }
        },
        '& input': {
            color: '#FFF',
            boxSizing: 'border-box'
        }
    })),

    // ⚡ BOTÃO PRINCIPAL DE ENVIO (SUBMIT NEON)
    submit: styled(Button)(() => ({
        marginTop: '8px',
        width: '100%',
        height: '44px',
        color: '#FFF',
        fontWeight: 700,
        fontFamily: Root.fontFamilySansSerif,
        borderRadius: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontSize: '0.85rem',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        '&:hover': {
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px)',
        },
        '&:active': {
            transform: 'translateY(0px)',
        },
        '&:disabled': {
            background: 'rgba(255, 255, 255, 0.03) !important',
            color: 'rgba(255, 255, 255, 0.2) !important',
            border: '1px solid rgba(255, 255, 255, 0.02) !important',
            boxShadow: 'none !important',
            cursor: 'not-allowed',
            opacity: 0.6
        }
    }))
};