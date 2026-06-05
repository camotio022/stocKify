import { Stack, TextField, Typography } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const MuiContainer = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#07040d', // Fundo base super escuro
    overflow: 'hidden',
    position: 'relative',

    // 🌌 BOLHA 1: A Aurora Roxa Neon (Orbita no canto superior esquerdo)
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(144, 0, 255, 0.25) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        filter: 'blur(60px)', // O segredo que transforma o círculo em névoa cósmica
        animation: 'auroraRoxa 15s ease-in-out infinite alternate',
        zIndex: 1,
    },

    // 🌊 BOLHA 2: A Aurora Ciano Neon (Orbita no canto inferior direito)
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23, 162, 184, 0.2) 0%, transparent 70%)',
        bottom: '-15%',
        right: '-10%',
        filter: 'blur(80px)', // Desfoque profundo para espalhar bem a luz ciano
        animation: 'auroraCiano 18s ease-in-out infinite alternate',
        zIndex: 1,
    },

    // 🕹️ ANIMAÇÕES DOS KEYFRAMES (Faz as luzes dançarem de forma suave na tela)
    '@keyframes auroraRoxa': {
        '0%': {
            transform: 'translate(0px, 0px) scale(1)',
        },
        '50%': {
            transform: 'translate(80px, 50px) scale(1.2)', // Move ligeiramente e expande
        },
        '100%': {
            transform: 'translate(-40px, 90px) scale(0.9)',
        },
    },

    '@keyframes auroraCiano': {
        '0%': {
            transform: 'translate(0px, 0px) scale(1)',
        },
        '50%': {
            transform: 'translate(-100px, -60px) scale(1.15)', // Se aproxima do centro
        },
        '100%': {
            transform: 'translate(30px, -20px) scale(0.95)',
        },
    },
}));
// 💧 2. O Card Central em Dark Glass (Cristal Fumê com Duplo Halo Neon)
export const MuiCard = styled(Stack)(({ matches }) => ({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: matches ? '85%' : '420px', // Travado em uma largura fixa elegante para desktop
    height: 'auto',                   // Deixa o tamanho respirar de acordo com o conteúdo
    minHeight: '420px',
    padding: '40px 30px',

    ...Root.borderImage,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',

    // ⚡ Duplo Contorno Neon (Roxo interno colado + Sombra expansiva ciano)
    border: '1px solid rgba(144, 0, 255, 0.4)',
    boxShadow: `
        0 20px 50px rgba(0, 0, 0, 0.6), 
        0 0 2px #17a2b8,                // Anel externo sutil ciano
        0 0 20px rgba(144, 0, 255, 0.25) // Brilho roxo interno flutuante
    `,
    gap: '16px',
    boxSizing: 'border-box'
}));

// 💬 3. Título com Brilho Luminoso
export const MuiTitle = styled(Typography)(({
    textAlign: 'center',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    color: '#ffffff', // Branco para contraste máximo
    textShadow: '0 0 10px rgba(144, 0, 255, 0.8)', // Brilho roxo ao redor das letras
    opacity: 0.9,
    marginTop: '10px',
    transition: 'all 0.3s ease',
    '&:hover': {
        opacity: 1,
        letterSpacing: '0.3em',
    }
}));

// 🗚 4. O Bloco dos Inputs Integrados (Estilo Cápsula Dark)
export const MuiGridForm = styled(Stack)(({ matches }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '52px',
    overflow: 'hidden',
    borderRadius: '50px', // Formato de pílula moderno
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Fundo escuro semitransparente
    backdropFilter: 'blur(12px)', // Faz o degradê de trás aparecer fosco
    border: '1px solid rgba(23, 162, 184, 0.2)', // Borda ciano discreta padrão
    transition: '0.3s all ease-in-out',
    boxSizing: 'border-box',
    '&:focus-within': {
        border: `1px solid #17a2b8`,
        backgroundColor: 'rgba(23, 162, 184, 0.05)',
        boxShadow: `0 0 15px rgba(23, 162, 184, 0.3)`,
    }
}));


export const MuiLeftTag = styled(Stack)(({ }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '100%',
    color: '#17a2b8', // Ícone ciano combinando com a borda
    backgroundColor: 'transparent', // Remove aquele bloco quadrado sólido roxo antigo
}));

// ⌨️ 6. Campo de Texto Customizado (Texto Branco Gelo e Sem bordas nativas brutas)
export const MuiTextField = styled(TextField)(({ }) => ({
    width: '100%',
    height: '100%',
    '& .MuiOutlinedInput-root': {
        color: '#E2E8F0', // Texto Branco Gelo legível
        height: '100%',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',

        // Remove a borda padrão quadrada do Material UI para adotar a borda da nossa cápsula
        '& fieldset': { border: 'none' },

        // Customização do Autofill do navegador (para não ficar aquele fundo amarelo feio)
        '& input': {
            padding: '10px 14px 10px 0px',
            '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px #130924 inset`,
                WebkitTextFillColor: '#E2E8F0',
                transition: 'background-color 5000s ease-in-out 0s',
            }
        }
    },
    // Estilização da Label Flutuante
    '& .MuiInputLabel-root': {
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '12px',
        letterSpacing: '0.05em',
        color: '#A8ADB3',
        marginTop: '-2px',
        '&.Mui-focused': {
            color: '#17a2b8' // Label fica ciano no foco
        }
    }
}));

// 📝 7. Rodapé Discreto
export const MuiFooterLogin = styled(Stack)(({ matches }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '20px',
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '0.3em',
    fontFamily: Root.fontFamilySansSerif,
}));