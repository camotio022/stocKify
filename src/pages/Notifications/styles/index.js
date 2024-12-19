import { Box, Drawer, MenuItem, Stack, Typography, styled } from "@mui/material";

import { Settings } from "@mui/icons-material";
import { Root } from "../../../styles/Root/root_styles";
export const ContainAbsolute = styled(Stack)(({})=> ({
    zIndex: 4,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    minWidth: '30%',
    height: '100%',
    right: '12px',
    overflow: 'auto',
    backgroundColor: Root.color_app_bar,
    boxShadow: Root.boxS,
    borderRadius: '12px',
    ...Root.scrollBar,
    boxSizing: 'border-box'
}))
export const ContainerDrawer = styled(Drawer)(({ }) => ({
    zIndex: 222222,
    '& .MuiDrawer-paper': {
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '5px',
            height: '3px',
            backgroundColor: Root.white,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: Root.color_button,
            borderRadius: '6px',
        },

    },
}))
export const ContainerNotifications = styled(Stack)(({ }) => ({
    minWidth: '100%',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexDirection: 'row',

}))
export const AppBarNotifications = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '3rem',
    borderBottom: `1px solid ${Root.color_app_bar}`,
    padding: '12px',
}))
export const TitleTypho = styled(Typography)(({ canUpper }) => ({
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: Root.color_button,
    textTransform: canUpper && 'uppercase',
    letterSpacing: canUpper && '2px',
}))
export const SettingsIcon = styled(Settings)(({ }) => ({
    color: Root.color_button,
    fontSize: '24px'
}))
export const NotificationComponent = styled(MenuItem)(({ first, last }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    flexDirection: 'column',
    minHeight: '4rem',
    height: 'auto',
    paddingTop: first ? '3rem' : '1rem',
    paddingBottom: last ? '2rem' : '1rem',
    width: '100%'
}))
export const WrapperNotification = styled(Box)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    flexDirection: 'row',
    marginInline: 1,
    width: '100%',
    height: 'auto'
}))
export const AvatarCommentNotification = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    border: `1px solid ${Root.color_app_bar}`,
    borderRadius: '50%',
    backgroundColor: Root.color_app_bar,
    boxShadow: Root.boxS,
}))
export const AvatarCommentActionFlutuente = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
    right: -12,
    width: '1.5rem',
    height: '1.5rem',
    color: Root.color_button
}))
export const ContentNotifications = styled(Typography)(({ variant, isRead }) => ({

}))