import { Avatar, Box, Stack } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { styled } from "@mui/material/styles"; // 💎 Correção na importação para compatibilidade do MUI v5

export const LayoutMobile = {
    // 📱 CONTEINER MESTRE DA TELA DO CELULAR
    _containerMobile: styled(Stack)(({ }) => ({
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100vw",
        minHeight: '100vh',
        backgroundColor: '#020205', // Fundo profundo do Stockify
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingBottom: '80px', // Abre espaço para a barra inferior não cobrir os cards
    })),

    // 📥 BARRA DE NAVEGAÇÃO INFERIOR (FLUTUANTE)
    _app_bar: styled(Box)(({ }) => ({
        position: 'fixed',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        height: '68px',
        bottom: 0,
        left: 0,
        zIndex: 100,
        background: 'rgba(5, 5, 18, 0.85)', // Efeito de Vidro Escuro
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 255, 255, 0.15)', // Linha sutil de Neon Cyan
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.5)',
        paddingInline: '10px'
    })),

    // 🔝 BARRA DE STATUS SUPERIOR (FIXA)
    _app_bar_top: styled(Box)(({ }) => ({
        position: 'fixed',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: '60px',
        top: 0,
        left: 0,
        zIndex: 90,
        background: 'rgba(5, 5, 18, 0.8)', 
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(138, 43, 226, 0.15)', // Linha sutil de Neon Purple
        paddingInline: '15px',
    })),

    // 🏷️ LOGO E MENUS ATÔMICOS
    _logoMobile: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    })),

    _menuMobile: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        color: '#00FFFF'
    })),

    // 📦 ENVELOPE INDIVIDUAL DOS ÍCONES NO MAP
    _containerItemMap: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '65px',
        height: '100%',
    })),

    // 👑 TÍTULO GIGANTE DA ROTA ATIVA (EFEITO GLOW)
    _bigTitle: styled('h1')(({ cor }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        margin: '85px 0 15px 0', // Dá o recuo exato para não sumir atrás da barra superior
        fontSize: '2.2rem',
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        
        // ✨ Efeito de Texto Vazado Futurista Refatorado
        color: 'transparent',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: cor ? 'rgba(255, 255, 255, 0.3)' : '#00FFFF',
        
        // Gradiente interno opcional de preenchimento suave
        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
    })),

    // 👤 AVATAR BIOMÉTRICO DO OPERADOR
    _userAvatar: styled(Avatar)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        background: `linear-gradient(135deg, ${Root.color_button || '#8A2BE2'}, ${Root.cyan || '#00FFFF'})`,
        color: '#ffffff',
        fontWeight: '700',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '13px',
        border: '1px solid rgba(0, 255, 255, 0.4)',
        boxShadow: `0 0 12px ${Root.color_button || '#8A2BE2'}60`,
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    })),
};