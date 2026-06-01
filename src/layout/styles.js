import { Stack } from "@mui/material";
import { Root } from "../styles/Root/root_styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/node/styles";


export const MuiMainLayout = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgb(0, 0, 0)'
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBlock: '4px',
    marginTop: '36px',
    width: '100%',
    gap: '4px',
}))
export const MuiMainLayoutLink = styled(Link)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    flexDirection: 'row',
    width: '85%',
    height: '38px',
    borderRadius: '4px',
    transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)',
    paddingLeft: '16px',
    fontSize: '16px',
    fontFamily: Root.fontFamilySansSerif,
    fontWeight: 500,
    
    color: Root.white,
    textDecoration: 'none',
    ":hover": {
        color: Root.containTask, // Roxo do logo
        backgroundColor: Root.color_button, // Roxo quase invisível em vez de cinza sólido
        boxShadow: 'inset 4px 0px 0px ' + Root.color_button, // Barra lateral de destaque interna

    },

}))
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    width: '90%',
    height: '50%',
    bottom: '1vh',
    gap: '3px',
    color: Root.gray,
    cursor: 'pointer',
    ...Root.borderImage
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
    overflow: 'hidden',

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
    height: '84vh',
    borderRadius: '8px',
    ...Root.borderImage,
}))