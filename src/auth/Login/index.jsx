import { CircularProgress, InputAdornment, Stack, Typography } from '@mui/material'
import * as Tag from './styles'
import { Root } from '../../styles/Root/root_styles'
import { LockClock, Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

export const Login = () => {
    const [open, setOpen] = useState('')
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
    return (
        <Tag.MuiContainer>
            <Tag.MuiCard>
                <Tag.MuiCardUser>
                    <Person sx={{
                        width: '90%',
                        height: '90%',
                        color: Root.color_button
                    }} />
                </Tag.MuiCardUser>
                <Tag.MuiGridForm mt={10}>
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
                <Tag.MuiGridForm mt={2.6}>
                    <Tag.MuiLeftTag >
                        <LockClock />
                    </Tag.MuiLeftTag>
                    <Stack sx={{ height: '100%', width: '83%' }}>
                        <Tag.MuiTextField
                            type={open ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment sx={{
                                        color: Root.color_button,
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
                    onClick={() => setProgress(!progress)}
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
            <Tag.MuiFooterLogin>
                JUNTA MAIS STOCKIFY @2024
            </Tag.MuiFooterLogin>
        </Tag.MuiContainer>
    )
}