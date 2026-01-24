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
    document.addEventListener('keydown', (e) => {
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
                <LogoMainLayout />
                <Tag.MuiTitle >
                    ACESSO - PLATAFORMA STOCKIFY
                </Tag.MuiTitle>
                <Tag.MuiGridForm mt={4} matches={matches}>
                    <Tag.MuiLeftTag>
                        <Person />
                    </Tag.MuiLeftTag>
                    <Stack sx={{ height: '100%', width: '83%' }}>
                        <Tag.MuiTextField
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            fullWidth
                            label="IDENTIFICAÇÃO OU E-MAIL"
                            variant="outlined"
                        />
                    </Stack>
                </Tag.MuiGridForm>
                <Tag.MuiGridForm mt={2.6} matches={matches}>
                    <Tag.MuiLeftTag >
                        <LockClock />
                    </Tag.MuiLeftTag>
                    <Stack sx={{ height: '100%', width: '83%', }}>
                        <Tag.MuiTextField
                            matches={matches}
                            type={open ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment sx={{
                                        color: Root.color_app_bar,
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
                            label="CHAVE DE SEGURANÇA"
                            variant="outlined" />
                    </Stack>
                </Tag.MuiGridForm>
                <Tag.MuiGridForm
                    matches={matches}
                    onClick={login}
                    mt={2.6}
                    sx={{
                        cursor: 'pointer',
                        background: `linear-gradient(90deg, #cd3fe6 50%, #822e91 100%) !important`,
                        border: 'none',
                        color: '#fff',
                        fontWeight: '800',
                        letterSpacing: '0.1em',
                        boxShadow: `0 0 20px ${Root.color_button_opacity}`,
                        '&:hover': {
                            background: `linear-gradient(90deg,  #822e91 30%, #cd3fe6 100%) !important`,
                            transform: 'scale(1.02)',
                            boxShadow: `0 0 30px ${Root.color_button}`,
                        },
                        gap: 2
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