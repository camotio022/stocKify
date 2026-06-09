import { Typography } from '@mui/material';
import { styled } from '@mui/material/node/styles';
import { Root } from '../../styles/Root/root_styles';


export const BrandContainer = styled('div')(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '2vw',
    width: '20%',
    boxSizing: 'border-box',
    /* 🔑 Efeito visual de clique e link */
    cursor: 'pointer',
    userSelect: 'none', /* Evita que o usuário selecione o texto do logo sem querer ao clicar */
    
    /* 🚀 Sua animação cúbica idêntica ao código original */
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'scale(1.05)',
    },


}));

// O LOGO EXATO DO SEU PRINT
export const LogoText = styled(Typography)(({ }) => ({
    fontSize: '1.8rem',       /* Tamanho grande para dar o impacto do print */
    letterSpacing: '-1.2px',  /* Letras "espremidas" idênticas à imagem */
    lineHeight: 0.75,      /* Remove o espaço invisível de baixo */
    transform: 'scaleX(1.15)',
    transformOrigin: 'left center',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontFamily: Root.fontFamilySansSerif,
    background: `linear-gradient(90deg,  hsl(188, 100%, 48%), ${Root.white})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: `drop-shadow(0px 0px 5px rgba(147, 45, 210, 0.3))`,

}));

// O Subtítulo do print (Soluções Inteligentes em Estoque)
export const CompanyText = styled(Typography)(({ }) => ({
fontFamily: Root.fontFamilySansSerif,
    background: `linear-gradient(90deg, ${Root.white}, hsl(188, 100%, 48%))`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: `drop-shadow(0px 0px 5px rgba(158, 62, 218, 0.3))`,
    fontSize: '15px',
    fontWeight: 500,
    color: '#08ffff',         /* Aquele tom verde-água/ciano bem suave do print */
    letterSpacing: '0.3px',
    textAlign: 'left',
    marginTop: '6px',         /* Distância exata abaixo do logo */
    opacity: 0.95
}));