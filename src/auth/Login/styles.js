import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/node/styles';


// 🟢 Mantendo o padrão MuiLeftTag com a função de retorno para o container
export const BrandContainer = styled('div')(({ }) => ({
    display: 'flex',
    flexDirection: 'column', /* Deixa um embaixo do outro perfeitamente alinhado */
    alignItems: 'center',    /* Centraliza horizontalmente */
    justifyContent: 'center',
    padding: '20px',
    width: '100%',
}));

// 🟢 Aplicando a função para o texto do Logo "STOCKFY"
export const LogoText = styled(Typography)(({ }) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.8rem',
    fontWeight: 800,
    letterSpacing: '1px',
    
    /* Efeito gradiente moderno em formato de objeto */
    background: 'linear-gradient(45deg, #00e5ff, #bd00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    
    marginBottom: '4px', /* Espaço curtinho para o nome da empresa */
}));

// 🟢 Aplicando a função para o nome da empresa
export const CompanyText = styled(Typography)(({ }) => ({
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#00e5ff', /* Corrigido para string com aspas para o CSS-in-JS aceitar */
    letterSpacing: '1.5px',
    textAlign: 'center',
    opacity: 0.9,
}));