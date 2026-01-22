import { CircularProgress, InputAdornment, Stack, Typography, useMediaQuery } from '@mui/material'
import * as Tag from './styles'
import { Root } from '../../styles/Root/root_styles'
import { LockClock, Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { AuthContext } from '../../auth_context'
import { LogoMainLayout } from '../../components/Logo'

export const Login = () => {
    const [open, setOpen] = useState('')
    const { loginWithEmailAndPassword, matches } = useContext(AuthContext)
    const [progress, setProgress] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    document.addEventListener('keydown', (e)=> {
        if (e.key === 'Enter') {
            login()
        }
    })
    const login = async () => {
        setProgress(true)
        try {
            await loginWithEmailAndPassword(data.email, data.password)
            setProgress(false)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Tag.MuiContainer matches={matches}>
            <Tag.MuiCard matches={matches}>
                <Tag.MuiCardUser>
                    <LogoMainLayout/>
                </Tag.MuiCardUser>
                <Tag.MuiGridForm mt={10} matches={matches}>
                    <Tag.MuiLeftTag>
                        <Person />
                    </Tag.MuiLeftTag>
                    <Stack sx={{ height: '100%', width: '83%' }}>
                        <Tag.MuiTextField
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            fullWidth
                            label="Digite seu emai ou ID"
                            variant="outlined"
                        />
                    </Stack>
                </Tag.MuiGridForm>
                <Tag.MuiGridForm mt={2.6} matches={matches}>
                    <Tag.MuiLeftTag >
                        <LockClock />
                    </Tag.MuiLeftTag>
                    <Stack sx={{ height: '100%', width: '83%',backgroundColor: Root.color_app_bar }}>
                        <Tag.MuiTextField
                            matches={matches}
                            type={open ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment sx={{
                                        color: Root.color_button,
                                        backgroundColor: Root.color_default
                                    }}>
                                        {open ? <Visibility onClick={() => setOpen(!open)} /> :
                                            <VisibilityOff onClick={() => setOpen(!open)} />}
                                    </InputAdornment>
                                )
                            }}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            fullWidth
                            label="Digite sua senha"
                            variant="outlined" />
                    </Stack>
                </Tag.MuiGridForm>
                <Tag.MuiGridForm
                    matches={matches}
                    onClick={login}
                    mt={2.6}
                    sx={{
                        color: progress && 'white',
                        bgcolor: progress && Root.color_button,
                        gap: 2,
                        ...Root.hover
                    }}>
                    <Typography sx={{ fontFamily: Root.fontFamilyMonospace }}>
                        {progress ? 'LOGANDO' : 'LOGAR-SE'}
                    </Typography>
                    {progress && <CircularProgress size={24} sx={{ color: 'white' }} />}
                </Tag.MuiGridForm>
            </Tag.MuiCard>
            <Tag.MuiFooterLogin matches={matches}>
                STOCKIFY @2024
            </Tag.MuiFooterLogin>
        </Tag.MuiContainer>
    )
}