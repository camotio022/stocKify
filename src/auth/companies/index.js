import { Box, Stack, Typography, ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Root } from "../../styles/Root/root_styles"; // Ajuste o caminho do seu Root global

// 🌌 CONTAINER PAI: Telona cheia com a Aurora Fluida rodando em CSS Puro
export const MuiContainerCompanies = styled(Box)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px',
    boxSizing: 'border-box',
    
    backgroundColor: '#07040d', // Fundo escuro base do Stockify
    // Halo Neon Roxo (Superior Esquerdo)
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(144, 0, 255, 0.12) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        filter: 'blur(80px)',
        zIndex: 1,
    },

    // Halo Neon Ciano (Inferior Direito)
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23, 162, 184, 0.1) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        filter: 'blur(90px)',
        zIndex: 1,
    },
}));

// 📝 BLOCO DE CABEÇALHO
export const MuiCompanyHeader = styled(Stack)({
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '48px',
    zIndex: 2,
});

export const MuiCompanyTitle = styled(Typography)({
    fontFamily: Root.fontFamilySansSerif,
    fontWeight: 800,
    fontSize: '32px',
    letterSpacing: '0.08em',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: '12px',
});

export const MuiCompanySubtitle = styled(Typography)({
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#94A3B8', // Cinza fosco discreto
});

// 🎛️ GRID DOS TRÊS TRABALHADORES
export const MuiCompanyGrid = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1040px',
    zIndex: 2,
});

// 💎 COMPONENTE CARD: Soft Glassmorphism premium
export const MuiCompanyCard = styled(Stack)({
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // Nosso Dark Glass
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '36px 24px',
    width: '280px',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

    // Eventos de Hover controlados para acender o card organicamente
    '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: 'rgba(23, 162, 184, 0.35)', // Glow Ciano na quina
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(23, 162, 184, 0.08)',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',

        // Dispara estilização nos filhos usando as classes injetadas
        '& .icon-circle': {
            backgroundColor: '#17a2b8',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(23, 162, 184, 0.5)',
            borderColor: '#17a2b8'
        },
        '& .mui-stock-button': {
            backgroundColor: '#17a2b8',
            color: '#ffffff',
            borderColor: '#17a2b8',
            boxShadow: '0 0 12px rgba(23, 162, 184, 0.3)'
        }
    }
});

// 🔴 CÍRCULO DO ÍCONE (Inicia roxo discreto e vira ciano ativo no hover do pai)
export const MuiCompanyIconCircle = styled(Box)({
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: 'rgba(144, 0, 255, 0.15)', // Toque roxo suave
    color: '#9000FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    border: '1px solid rgba(144, 0, 255, 0.25)',
    transition: 'all 0.3s ease',
});

export const MuiCompanyName = styled(Typography)({
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '18px',
    fontWeight: 700,
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: '6px',
});

export const MuiCompanyRole = styled(Typography)({
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '11px',
    fontWeight: 600,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '28px',
});

// ⚡ O SEU NOVO BOTÃO PADRÃO COGNITIVO CRAVADO EM 36PX
export const MuiStockButtonBase = styled(ButtonBase)({
    height: '36px', // 🔥 Cravado nos seus 36px matemáticos!
    width: '100%',
    backgroundColor: 'transparent',
    border: '1px solid rgba(23, 162, 184, 0.25)',
    borderRadius: '50px',
    color: '#17a2b8',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
});

// 🛡️ RODAPÉ DE INFOS
export const MuiCompanyFooter = styled(Box)({
    position: 'absolute',
    bottom: '32px',
    color: '#475569',
    fontSize: '12px',
    fontFamily: Root.fontFamilySansSerif,
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    
    '& strong': {
        color: '#9000FF', // Dá um destaque na conta ativa
        marginLeft: '4px'
    }
});