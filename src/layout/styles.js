import { Stack, styled } from "@mui/material";
import { Root } from "../styles/Root/root_styles";
import { Link } from "react-router-dom";


export const MuiMainLayout = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: Root.color_app_bar,
}))
// LATERAL ESQUERDO LAYOUT
export const MuiMainLayoutLogo = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '14vw',
    height: '100%',
    color: Root.color_button,
}))
export const MuiMainLayoutLinks = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '3px',
    paddingBlock: '4px',
    marginTop: '36px',
    width: '100%',
    overflow: 'hidden',
}))
export const MuiMainLayoutLink = styled(Link)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '12px',
    flexDirection: 'row',
    width: '95%',
    height: '48px',
    transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)',
    paddingLeft: '16px',
    fontSize: '14px',
    fontFamily: Root.fontFamilySansSerif,
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: Root.purple,
    textDecoration: 'none',
    ":hover": {
        color: Root.containTask, // Roxo do logo
        backgroundColor: Root.color_button, // Roxo quase invisível em vez de cinza sólido
        paddingLeft: '22px', // Efeito sutil de "push" ao passar o mouse
        boxShadow: 'inset 4px 0px 0px ' + Root.color_button, // Barra lateral de destaque interna
        "& svg": {
            filter: `drop-shadow(0 0 5px ${Root.color_button_opacity2})`, // Brilho no ícone
        }
    },

}))
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    bottom: '36px',
    gap: '3px',
    color: Root.gray,
    cursor: 'pointer'
}))
export const MuiMainLayoutRitghStep = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100vw',
    height: '90vh',
    paddingInline: '18px',
    marginTop: '10vh',
}))
export const AppBar = styled(Stack)(({ }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100vw',
    height: '10vh',

}))
// LATERAL DIREIDO
export const RenderChildrensAndNavBar = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: '12px',
    padding: '13px',
    width: '83.3vw',
    height: '85vh',
    boxShadow: Root.boxShadow,

    borderRadius: '8px'
}))