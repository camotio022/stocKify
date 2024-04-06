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
export const MuiMainLayoutLogo = styled(Stack)(({ }) => ({
        position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '12vw',
    height: '100%',
    backgroundColor: Root.color_default,
    color: Root.color_button,
    fontFamily: Root.fontFamilyMonospace
}))
export const MuiMainLayoutLinks = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    paddingBlock: '4px',
    marginTop: '44px',
    width: '100%',
    overflow: 'hidden'
}))
export const MuiMainLayoutLink = styled(Link)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'fles-start',
    gap: '12px',
    flexDirection: 'row',
    width: '80%',
    height: '50px',
    transition: 'all .3s',
    paddingLeft: '4px',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    fontSize: '15px',
    color: Root.gray,
    textDecoration: 'none',
    marginRight: '-1px',
    ...Root.hoverReverse,
    ":hover": {
        color: Root.color_button,
        boxShadow: Root.boxS,
        height: '50px',
        backgroundColor: Root.color_app_bar,
    }
}))
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    bottom: '36px',
    gap: '20px',
    color: Root.gray,
    cursor: 'pointer'
}))
export const MuiMainLayoutRitghStep = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1vw',
    flexDirection: 'row',
    width: '100vw',
    height: '92vh',
    paddingInline: '18px',
    marginTop: '8vh'
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
    height: '8vh',
    backgroundColor: Root.color_default,
}))