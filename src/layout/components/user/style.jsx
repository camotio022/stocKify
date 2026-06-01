import { Avatar, Stack } from "@mui/material";
import { Root } from "../../../styles/Root/root_styles";
import { styled } from "@mui/material/node/styles";

export const StyleUser = {
    contain: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
        padding: '4px',
        borderRadius: '8px',
        color: Root.color_button,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        "&:hover": {
            ...Root.borderImage,
            color: '#fff',
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
        ...Root.borderImage,
        color: Root.white,
        top: -10,
        right: -10,
        borderRadius: '50%',
    })),
    avatar: styled(Avatar)(({ }) => ({
        // --- 1. DIMENSÕES E FORMA ---
        width: '38px',
        height: '38px',
        border: `1.5px solid ${Root.color_button_secondary}`,

        ...Root.borderImage,
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
    })),
    stackNameArrow: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color: Root.white,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    }))
}