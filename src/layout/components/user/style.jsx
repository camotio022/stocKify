import { Avatar, Stack, styled } from "@mui/material";
import { Root } from "../../../styles/Root/root_styles";

export const StyleUser = {
    contain: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '12px',
        marginRight: '12px',
        justifyContent: 'flex-end',
        width: '50%',
        color: Root.color_button
    })),
    item: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '8px',
        borderRadius: '8px',
        color: Root.color_button,
        boxShadow: `0 0 3px ${Root.color_button_opacity2}`,
        border: `1px solid ${Root.color_button_opacity}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: Root.color_button,
            color: '#fff',
            transform: 'scale(1.02)',
            boxShadow: `0 0 20px ${Root.color_button}`,
            "& svg": {
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
            }
        }
    })),
    isRead: styled(Stack)(({ }) => ({
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '5px',
        height: '10px',
        width: '10px',
        backgroundColor: Root.red,
        color: Root.white,
        ...Root.hover,
        top: -10,
        right: -10,
        borderRadius: '50%',
    })),
    avatar: styled(Avatar)(({ }) => ({
        // --- 1. DIMENSÕES E FORMA ---
        width: '38px',
        height: '38px',
        borderRadius: '10px', // Estilo "Squircle" (quadrado arredondado) é mais moderno que o círculo total

        // --- 2. CORES E IDENTIDADE NEON ---
        // Fundo translúcido para criar o efeito de vidro
        backgroundColor: 'rgba(128, 0, 128, 0.08)',
        // O roxo vibrante para as iniciais do usuário
        color: Root.color_button,

        // --- 3. BORDAS E BRILHO (ESTILO LOGO) ---
        // Borda fina que brilha, imitando o contorno do logo
        border: `1.5px solid ${Root.color_button_opacity}`,
        boxShadow: `0 0 10px ${Root.color_button_opacity2}`,

        // --- 4. INTERAÇÕES E REFINAMENTO ---
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': {
            transform: 'scale(1.1) rotate(5deg)', // Pequena animação lúdica e futurista
            backgroundColor: Root.color_button,
            color: '#ffffff',
            boxShadow: `0 0 18px ${Root.color_button}`, // Brilho intenso no hover
            zIndex: 10,
        }
    }))
}