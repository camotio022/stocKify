import { Stack, TextField, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const MuiContainer = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
}))
export const MuiCard = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '450px',
    height: '450px',
    boxShadow: Root.boxS,
    background: Root.color_app_bar
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
    width: '80px',
    backgroundColor: Root.color_button_opacity,
    borderRadius: '50%'
}))
export const MuiGridForm = styled(Stack)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
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
export const MuiTextField = styled(TextField)(({ }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '0',
        color: 'white', 
        height: '48px',
        backgroundColor: 'transparent',

        '& .MuiInputBase-input': {
            color: 'white', 
        },
    },
}))