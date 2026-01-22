import { Stack, TextField, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const MuiContainer = styled(Stack)(({ matches }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    fontFamily: Root.fontFamilyMonospace,
    backgroundColor: Root.color_app_bar
}))
export const MuiCard = styled(Stack)(({ matches }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: matches ? '90%' : '450px',
    height: '450px',
    background: Root.color_app_bar,
}))
export const MuiCardUser = styled(Stack)(({ }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '38px',
    border: Root.border,
    height: '80px',
    minWidth: '80px',


}))
export const MuiGridForm = styled(Stack)(({ matches}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: matches? '90%':'70%',
    height: '48px',
    backgroundColor: Root.color_button_opacity

}))
export const MuiLeftTag = styled(Stack)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18%',
    height: '100%',
    color: Root.white,
    backgroundColor: Root.color_button,
}))
export const MuiTextField = styled(TextField)(({ matches }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '0',
        color: Root.black,
        height: '48px',
        backgroundColor: 'transparent',

        '& .MuiInputBase-input': {
            color: Root.black,
            fontFamily: Root.fontFamilyMonospace,
        },
    },
}))
export const MuiFooterLogin = styled(Stack)(({ matches }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: matches ? '80%' : '330px',
    height: '48px',
    marginTop: '-1px',
    border: `1px solid ${Root.color_button_opacity}`,
    backgroundColor: Root.color_app_bar,
    color: Root.color_button,
    fontWeight: 'bold',
    fontFamily: Root.fontFamilyMonospace
}))