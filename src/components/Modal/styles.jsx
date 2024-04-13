import { Stack, Typography, styled, MenuItem} from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const MuiModalZindex = styled(Stack)(({ }) => ({
    position: 'fixed',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    overflow: 'hidden',
    top: 0,
    left: 0,
    zIndex: 5,
    transition: 'all .3s',
    backgroundColor: Root.color_button_opacity,
}))
export const MuiModalPapper = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: Root.boxS,
    width: '30%',
    minHeight: '10%',
    backgroundColor: Root.color_app_bar,
    border: `1px solid ${Root.color_button_opacity}`,
    boxShadow: Root.boxS,
    borderRadius: '4px',
    padding: '5%',
    fontFamily: Root.fontFamilyMonospace
}))
export const MuiModalPapperClose = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '28px',
    height: '28px',
    top: '24px',
    right: '24px',
    boxShadow: Root.boxS,
    color: Root.color_button,
    borderRadius: '50%',
    ...Root.hover
}))
export const MuiModalTitle = styled(Typography)(({ }) => ({
    fontFamily: Root.fontFamilyMonospace,
    fontSize: 16,
    fontWeight: 'bold',
    color: Root.color_button,
    textAlign: 'center',
    textTransform: 'uppercase',
}))
export const MuiModalInput = styled('input')(({ }) => ({
    borderColor: 'transparent',
    width: '100%',
    height: 36,
    outline: 'none',
}))
export const MuiModalInputExtension = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '85%',
    width: '70%',
    marginTop: '7px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px solid ${Root.color_button_secondary}`
}))
export const MuiModalInpExtension = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: '14px',
    height: 'auto',
    width: '70%',
    marginTop: '16px'
}))
export const MuiModalInpExtensionChecked = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50px',
    borderRadius: '4px',
    cursor: 'pointer',
    ...Root.hover
}))
export const MuiModalSave = styled(MenuItem)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '100%',
    marginTop: '12px',
    borderRadius: '4px',
}))