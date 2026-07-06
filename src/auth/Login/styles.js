import { Stack, TextField, Typography } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const MuiContainer = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#07040d', 
    overflow: 'hidden',
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(144, 0, 255, 0.25) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        filter: 'blur(60px)',
        animation: 'auroraRoxa 15s ease-in-out infinite alternate',
        zIndex: 1,
    },

    '&::after': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23, 162, 184, 0.2) 0%, transparent 70%)',
        bottom: '-15%',
        right: '-10%',
        filter: 'blur(80px)',
        animation: 'auroraCiano 18s ease-in-out infinite alternate',
        zIndex: 1,
    },

    '@keyframes auroraRoxa': {
        '0%': { transform: 'translate(0px, 0px) scale(1)' },
        '50%': { transform: 'translate(80px, 50px) scale(1.2)' },
        '100%': { transform: 'translate(-40px, 90px) scale(0.9)' },
    },
    '@keyframes auroraCiano': {
        '0%': { transform: 'translate(0px, 0px) scale(1)' },
        '50%': { transform: 'translate(-100px, -60px) scale(1.15)' },
        '100%': { transform: 'translate(30px, -20px) scale(0.95)' },
    },
}));

export const MuiCard = styled(Stack)(({ matches }) => ({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: matches ? '96%' : '400px', 
    height: 'auto',
    padding: '30px 24px',
    backgroundColor: 'rgba(13, 10, 25, 0.75)', 
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    borderRadius:matches? '16px': '28px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(144, 0, 255, 0.05)',
    gap: '4px',
    boxSizing: 'border-box'
}));
export const LogoTextLogin = styled(Typography)(({ }) => ({
        textAlign: 'center',
    fontSize: '1.8rem',       /* Tamanho grande para dar o impacto do print */
    letterSpacing: '-1.2px',  /* Letras "espremidas" idênticas à imagem */
    lineHeight: 0.75,      /* Remove o espaço invisível de baixo */
    transform: 'scaleX(1.15)',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontFamily: Root.fontFamilySansSerif,
    background: `linear-gradient(90deg,  hsl(188, 100%, 48%), ${Root.white})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: `drop-shadow(0px 0px 5px rgba(147, 45, 210, 0.3))`,

}));
export const MuiTitle = styled(Typography)(({
    textAlign: 'center',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '15px',
    fontWeight: 500,
    color: '#A8ADB3',
    opacity: 0.8,
    marginTop: '4px',
    marginBottom: '10px'
}));

export const IllustrationWrapper = styled(Stack)(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0',
    marginBottom: '12px'
}));

export const InputLabelText = styled(Typography)(() => ({
    fontSize: '13px',
    color: '#A8ADB3',
    fontWeight: '400',
    paddingLeft: '2px'
}));

export const MuiGridForm = styled(Stack)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    borderRadius: '10px', 
    backgroundColor: 'rgba(15, 12, 30, 0.6)', 
    border: '1px solid rgba(144, 0, 255, 0.3)', 
    transition: '0.2s all ease-in-out',
    boxSizing: 'border-box',
    '&:focus-within': {
        border: `1px solid #17a2b8`,
        boxShadow: `0 0 10px rgba(23, 162, 184, 0.25)`,
    }
}));

export const MuiLeftTag = styled(Stack)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '100%',
    color: '#17a2b8',
}));

export const MuiTextField = styled(TextField)(() => ({
    width: '100%',
    height: '100%',
    '& .MuiOutlinedInput-root': {
        color: '#FFFFFF',
        height: '100%',
        fontSize: '14px',
        '& fieldset': { border: 'none' },
        '& input': {
            padding: '10px 14px 10px 0px',
            // Adicione isto para remover o fundo padrão do navegador
            '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 1000px transparent inset !important', // Coloque a cor de fundo do seu input aqui
                WebkitTextFillColor: '#FFFFFF !important', // Cor do texto
                transition: 'background-color 5000s ease-in-out 0s', // Evita o flash de cor amarela
            },
        }
    }
}));

export const ForgotPasswordLink = styled(Typography)(() => ({
    fontSize: '12px',
    color: '#17a2b8',
    cursor: 'pointer',
    fontWeight: '500',
    '&:hover': {
        textDecoration: 'underline'
    }
}));

export const SubmitButton = styled(Stack)(() => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '52px',
    borderRadius: '14px',
    cursor: 'pointer',
    background: 'linear-gradient(90deg, #9333EA 0%, #17A2B8 100%)',
    border: 'none',
    color: '#fff',
    letterSpacing: '0.05em',
    transition: '0.3s all ease',
    gap: 12,
    boxSizing: 'border-box',
    '&:hover': {
        opacity: 0.95,
        transform: 'translateY(-1px)',
    }
}));

export const DividerWrapper = styled(Stack)(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0 12px 0',
    gap: '12px',
    '& .line': {
        flex: 1,
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '& .text': {
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.4)',
    }
}));

export const SocialButton = styled(Stack)(() => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    borderRadius: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    cursor: 'pointer',
    gap: '10px',
    transition: '0.2s all ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
    },
    '& .text': {
        color: '#fff',
        fontSize: '13px',
        fontWeight: '500'
    }
}));

export const PrivacyText = styled(Typography)(() => ({
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    marginTop: '24px',
    lineHeight: '1.5',
    '& .link': {
        color: '#9333EA',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));

export const MuiFooterLogin = styled(Stack)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '20px',
    color: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '600',
    fontSize: '11px',
    letterSpacing: '0.2em',
    fontFamily: Root.fontFamilySansSerif,
}));