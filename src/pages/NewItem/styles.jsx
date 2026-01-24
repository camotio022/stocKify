// import { Button, FormControl, Stack, TextField, Typography, styled } from "@mui/material";
// import { Root } from "../../styles/Root/root_styles";
// export const TagsNewItem = {
//     container: styled(Stack)(({ }) => ({
//         position: 'fixed',
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100vw",
//         height: "100vh",
//         overflow: 'hidden',
//         top: 0,
//         left: 0,
//         zIndex: 5,
//         transition: 'all .3s',
//         backgroundColor: Root.color_button_opacity,
//     })),
//     paper: styled(Stack)(({ moreitems }) => ({
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: moreitems ? 'flex-start' : 'center',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: '4px',
//         boxShadow: Root.boxS,
//         width: '30%',
//         minHeight: '10%',
//         backgroundColor: Root.color_app_bar,
//         border: `1px solid ${Root.color_button_opacity}`,
//         boxShadow: Root.boxS,
//         borderRadius: '4px',
//         padding: '5% 5% 2% 5%',
//         transition: 'all .4s',
//         transition: 'height width 0.4s',
//         fontFamily: Root.fontFamilyMonospace
//     })),
//     close: styled(Stack)(({ }) => ({
//         position: 'absolute',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         padding: '6px',
//         borderRadius: '50%',
//         border: `1px solid ${Root.color_button}`,
//         backgroundColor: Root.color_button,
//         color: Root.color_default,
//         fontWeight: 'bold',
//         top: '10px',
//         right: '20px',
//         cursor: 'pointer',
//         ...Root.boxS,
//         ...Root.hoverReverse,
//         fontFamily: Root.fontFamilyMonospace
//     })),
//     fromControl: styled(FormControl)(({ }) => ({
//         width: '48%',
//         backgroundColor: Root.color_default,
//         color: Root.color_button,
//         fontWeight: 'bold',
//         fontFamily: Root.fontFamilyMonospace,
//         border: `1px solid ${Root.color_button_opacity}`,
//         borderRadius: '4px',
//         ...Root.boxS,
//         height: '54px',
//     })),
//     typography: styled(Typography)(({ }) => ({
//         position: 'absolute',
//         top: '14px',
//         right: 'auto',
//         left: 'auto',
//         fontFamily: Root.fontFamilyMonospace,
//         fontSize: '18px',
//         color: Root.color_button,
//         fontWeight: 'bold'
//     })),
//     textfield: styled(TextField)(({ }) => ({
//         width: '48%',
//         backgroundColor: Root.color_default,
//         color: Root.color_button,
//         fontWeight: 'bold',
//         fontFamily: Root.fontFamilyMonospace,
//         border: `1px solid ${Root.color_button_opacity}`,
//         borderRadius: '4px',
//         ...Root.boxS,
//         height: '54px',
//     })),
//     submit: styled(Button)(({ }) => ({
//         ":focus": {
//             outline: 'none',
//             ...Root.boxS,
//             ...Root.hover,
//             border: `1px solid ${Root.color_button}`,
//         },
//         marginTop: '18px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         width: '98%',
//         height: '43px',
//         backgroundColor: Root.color_default,
//         color: Root.color_button,
//         fontWeight: 'bold',
//         fontFamily: Root.fontFamilyMonospace,
//         border: `1px solid ${Root.color_button}`,
//         borderRadius: '4px',
//         ...Root.boxS,
//         ...Root.hover,

//     }))
// }
import { Button, FormControl, Stack, TextField, Typography, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const TagsNewItem = {
    // --- 1. OVERLAY (FUNDO EMBAÇADO) ---
    container: styled(Stack)(({ }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        // Efeito de desfoque de fundo (backdrop-filter) para foco total no modal
        backgroundColor: 'rgba(255, 255, 255, 0.9q)',
        backdropFilter: 'blur(8px)',
        transition: 'all .3s ease-in-out',
    })),
    paper: styled(Stack)(({ moreitems }) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px', // Maior respiro entre campos
        width: '450px', // Largura fixa para estabilidade visual
        minHeight: '200px',
        padding: '60px 30px 30px 30px',

        // Estilo Futurista: Vidro semi-transparente
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: `5px solid ${Root.color_button}`,
        borderRadius: '12px', // Bordas mais arredondadas e modernas
        fontFamily: Root.fontFamilySansSerif,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    })),

    // --- 3. TÍTULO E FECHAMENTO ---
    typography: styled(Typography)(({ }) => ({
        position: 'absolute',
        top: '20px',
        left: '30px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        color: Root.color_button,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    })),

    close: styled(Stack)(({ }) => ({
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '32px',
        height: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${Root.color_button}`,
        borderRadius: '6px',
        backgroundColor: 'rgba(128, 0, 128, 0.1)',
        color: Root.color_button,
        cursor: 'pointer',
        transition: 'all .3s',
        '&:hover': {
            backgroundColor: Root.color_button,
            color: '#FFF',
            transform: 'rotate(90deg)',
            fontWeight: 800,
        }
    })),

    // --- 4. CAMPOS DE ENTRADA (INPUTS) ---
    fromControl: styled(FormControl)(({ }) => ({
        width: '100%', // Mobile first e mais limpo
        backgroundColor: '#F8F9FA',
        borderRadius: '8px',
        transition: 'all 0.3s',
        '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            '&:before, &:after': { display: 'none' }, // Remove linha padrão do MUI
        },
        '&:hover': {
            boxShadow: `0 0 0 2px ${Root.color_button_opacity}`,
        }
    })),

    textfield: styled(TextField)(({ }) => ({
        width: '100%',
        backgroundColor: '#F8F9FA',
        borderRadius: '8px',
        '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            '&:before, &:after': { display: 'none' },
        },
        '& .MuiInputLabel-root': {
            color: '#6c757d',
            fontSize: '14px',
        },
        '&:hover': {
            boxShadow: `0 0 0 2px ${Root.color_button_opacity}`,
        }
    })),

    // --- 5. BOTÃO DE AÇÃO (NEON SUBMIT) ---
    submit: styled(Button)(({ can }) => ({
        marginTop: '20px',
        width: '100%',
        height: '48px',
        backgroundColor: Root.color_button,
        color: '#FFF',
        fontWeight: 700,
        fontFamily: Root.fontFamilySansSerif,
        borderRadius: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        boxShadow: `0 8px 16px ${Root.color_button_opacity2}`,
        transition: 'all 0.3s',

        '&:hover': {
            backgroundColor: Root.color_button,
            transform: 'translateY(-2px)',
            boxShadow: `0 12px 20px ${Root.color_button_opacity}`,
        },
        '&:disabled': {
            backgroundColor: '#E9ECEF',
            color: '#ADB5BD',
        },
        ':focus': { outline: 'none' }
    }))
}