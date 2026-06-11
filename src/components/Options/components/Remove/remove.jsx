import { Stack, Button } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const StylesRemoveItem = {
    quetion: styled(Stack)(() => ({
        width: '100%',
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '0.95rem',
        fontWeight: 500,
        textAlign: 'center',
        marginBottom: '16px'
    })),
    
    mapSugests: styled(Stack)(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%',
        marginBottom: '20px'
    })),
    
    // 🎛️ BOTÕES DE SUGESTÃO ESTILO GLASS
    sugestItem: styled(Stack)(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '38px',
        paddingInline: '16px',
        borderRadius: '8px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    })),
    
    // 🧱 CONTÊINER DO INPUT DE VIDRO FUMÊ
    inputWrapper: styled(Stack)(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        '&:focus-within': {
            borderColor: Root.cyan,
            boxShadow: `0 0 12px ${Root.cyan}30`
        }
    })),
    
    inputQuantidade: styled('input')(() => ({
        color: '#FFF',
        border: 'none',
        width: '100%',
        height: '42px',
        paddingInline: '16px',
        backgroundColor: 'transparent',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '0.95rem',
        outline: 'none',
        margin: 0,
        '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.35)'
        },
        '-webkit-appearance': 'none',
        '-moz-appearance': 'textfield',
    })),
    
    // ⚡ BOTÃO DE CONFIRMAÇÃO PREMIUM
    retirar: styled(Button)(() => ({
        width: '100%',
        height: '44px',
        color: '#FFF',
        fontWeight: 700,
        fontFamily: Root.fontFamilySansSerif,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderRadius: '8px',
        marginTop: '20px',
        transition: 'all 0.2s ease-in-out',
    })),
};