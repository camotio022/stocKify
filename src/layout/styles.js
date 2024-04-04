import { Stack, styled } from "@mui/material";
import { Root } from "../styles/Root/root_styles";
import { Link } from "react-router-dom";


export const MuiMainLayout = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
    backgroundColor: Root.color_app_bar,
}))
export const MuiMainLayoutLogo = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '6.5vw',
    height: '100vh',
    backgroundColor: Root.color_button,
    color: Root.white,
    fontFamily: Root.fontFamilyMonospace
}))
export const MuiMainLayoutLinks = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '34px',
    width: '100%',
}))
export const MuiMainLayoutLink = styled(Link)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '70%',
    paddingBlock: '6px',
    transition: 'all .3s',
    fontSize: '100%',
    color: Root.white,
    textDecoration: 'none',
    ...Root.hoverReverse,
    ":hover": {
        color: Root.color_button,
        boxShadow: Root.boxShadow,
        height: '50px',
        backgroundColor: Root.color_app_bar,
    
    }
}))
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: '36px',
    gap: '20px',
    color: Root.white,
    cursor: 'pointer'
}))
export const MuiMainLayoutRitghStep = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95vw',
    height: '100%',
    paddingInline: '18px',
}))