import { Stack, Box, Typography } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const StylesDetailsItems = {
    // 🌌 CONTAINER PRINCIPAL DA PÁGINA
    container: styled(Stack)(({ }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: '1.5rem',
        width: "100%",
        padding: '24px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        ...Root.scrollBar
    })),

    // 🗺️ HEADER DA PÁGINA (ESTILO BREADCRUMB / NAVEGAÇÃO)
    nav_bar: styled(Box)(() => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "50px",
        borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
        boxSizing: 'border-box',
        mb: 1
    })),

    // 🔮 CARD GLASSMORPHIC DE RESUMO DO PRODUTO
    container2: styled(Stack)(({ }) => ({
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: '1.5rem',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        borderRadius: '12px',
        background: 'rgba(20, 15, 35, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    })),

    title: styled(Typography)(() => ({
        fontFamily: Root.fontFamilySansSerif,
        fontWeight: 800,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
    })),

    // 🏷️ ÁREA DE INFORMAÇÕES SECUNDÁRIAS (TAGS)
    sections: styled(Stack)(({ }) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: 'wrap',
        gap: '16px',
        width: "100%",
    })),

    sectionsRow: styled(Stack)(({ }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: '6px',
    })),

    // 💎 MINI TAGS DE VIDRO DO PRODUTO
    sectionsRowValue: styled(Stack)(({ }) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: '#FFF',
        padding: '8px 16px',
        borderRadius: '6px',
        fontWeight: 600,
        fontSize: '0.9rem',
        fontFamily: Root.fontFamilySansSerif,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    })),

    // 📊 CABEÇALHO DA TABELA DE COMMITS
    bar: styled(Stack)(({ }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '46px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxSizing: 'border-box'
    })),

    barTag: styled(Stack)(({ }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: '100%',
        height: '100%',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '13px',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.5)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            color: '#FFF'
        }
    })),
};