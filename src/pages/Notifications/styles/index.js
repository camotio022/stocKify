import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Root } from "../../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

// 🌌 CONTAINER PRINCIPAL DA SIDEBAR DE NOTIFICAÇÕES (GLASSMORPHIC)
export const ContainAbsolute = styled(Stack)(() => ({
    zIndex: 1200, // Acima de modais padrão
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '360px',
    height: 'calc(100% - 24px)',
    top: '12px',
    right: '12px',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: 'rgba(20, 15, 35, 0.85)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    borderRadius: '16px',
    boxSizing: 'border-box',
    paddingBottom: '20px',
    ...Root.scrollBar
}));

export const ContainerNotifications = styled(Stack)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: 'rgba(20, 15, 35, 0.5)',
    backdropFilter: 'blur(10px)',
}));

// 👑 BARRA DE TOPO DA COMPONENTE
export const AppBarNotifications = styled(Stack)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '4rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '0 20px',
    boxSizing: 'border-box'
}));

// 🔤 TIPOGRAFIA NEON DO TÍTULO
export const TitleTypho = styled(Typography)(({ canUpper }) => ({
    fontFamily: Root.fontFamilySansSerif,
    fontWeight: 800,
    fontSize: '14px',
    color: '#FFF',
    textTransform: canUpper ? 'uppercase' : 'none',
    letterSpacing: canUpper ? '1.5px' : '0px',
}));

export const SettingsIcon = styled(Settings)(() => ({
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        color: '#FFF',
        transform: 'rotate(45deg)'
    }
}));

// 📳 CARD DE CADA NOTIFICAÇÃO INDIVIDUAL (REATIVO)
export const NotificationComponent = styled(MenuItem)(({ isread }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '16px 20px',
    boxSizing: 'border-box',
    whiteSpace: 'normal',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    backgroundColor: isread === 'true' ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    }
}));

export const WrapperNotification = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '14px',
    width: '100%',
    height: 'auto'
}));

// 🔮 AVATAR COM BRILHO NEON BACKDROP
export const AvatarCommentNotification = styled(Stack)(() => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#FFF',
    flexShrink: 0
}));

export const AvatarCommentActionFlutuente = styled(Stack)(() => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '-2px',
    right: '-4px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#00F5D4', // Seu Cyan de Luxo
    color: '#0A0616',
    boxShadow: '0 0 10px #00F5D4'
}));