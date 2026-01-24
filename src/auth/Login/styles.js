import { Stack, TextField, Typography, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const MuiContainer = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    // Gradiente escuro que faz o roxo neon "saltar" da tela
    background: `radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%)`,
    overflow: 'hidden',
    position: 'relative',
    '&::before': { // Efeito de malha digital sutil
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: `linear-gradient(${Root.color_button_opacity} 1px, transparent 1px), 
                          linear-gradient(90deg, ${Root.color_button_opacity} 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        opacity: 0.05,
        animation: 'move 60s linear infinite',
    }
}));
export const MuiCard = styled(Stack)(({ matches }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: matches ? '70%' : '40%',
    height: '350px',
    padding: '40px',
    backgroundColor: Root.color_app_bar,
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    border: `3px solid ${Root.color_button_opacity2}`,
    boxShadow: `0 0 40px ${Root.color_button}, inset 0 0 20px ${Root.color_button_opacity2}`,
}));
export const MuiTitle = styled(Typography)(({
    textAlign: 'center',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '14px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: Root.color_button,
    textShadow: `0 0 12px ${Root.color_button_opacity2}`,
    opacity: 0.9,
    transition: 'all 0.3s ease',
    '&:hover': {
        opacity: 1,
        letterSpacing: '0.25em',
    }
}))
export const MuiGridForm = styled(Stack)(({ matches }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: matches ? '90%' : '70%',
    height: '48px',
    overflow: 'hidden',


    transition: '0.3s all ease',
    '&:focus-within': {
        border: `1px solid ${Root.color_button}`,
        boxShadow: `0 0 15px ${Root.color_button_opacity2}`,
    }
}))
export const MuiLeftTag = styled(Stack)(({ }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18%',
    height: '100%',
    color: Root.color_app_bar, // Ícone agora é roxo para combinar com o logo
    backgroundColor: Root.color_button,
}));
export const MuiTextField = styled(TextField)(({ }) => ({
    width: '100%',
    height: '90%',
    border: 'none',
    marginBlock: '7px',
    '& .MuiOutlinedInput-root': {
        border: 'none',
        color: Root.color_button,
        '& fieldset': { border: 'none' },
    },
    '& .MuiInputLabel-root': {
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        color: Root.color_button,
        fontStyle: 'italic',
        border: 'none',
    }
}));
export const MuiFooterLogin = styled(Stack)(({ matches }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: matches ? '80%' : '330px',
    height: '48px',
    marginTop: '-1px',
    color: Root.color_app_bar,
    backgroundColor: 'rgba(248, 223, 248, 0.08)',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '0.2em',
    fontFamily: Root.fontFamilySansSerif,
}))