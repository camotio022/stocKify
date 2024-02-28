import { Stack, styled } from "@mui/material";
import { Root } from "../styles/Root/root_styles";


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
    width: '7vw',
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
    gap: '24px',
    marginTop: '34px',
    width: '100%',
}))
export const MuiMainLayoutLink = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBlock: '6px',
    transition: 'all .3s'
}))
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: '36px',
    gap: '36px',
    color: Root.white,
    cursor: 'pointer'
}))
export const MuiMainLayoutRitghStep = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '93vw',
    height: '100%',
}))