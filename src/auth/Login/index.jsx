import { CircularProgress, InputAdornment, Stack, Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import * as Tag from './styles'
import { Root } from '../../styles/Root/root_styles'
import { ArrowForward, LockOutlined, PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth_context'
import { LogoMainLayout } from '../../components/Logo/index.jsx'
import { LoginAuthMessage } from '../../components/Alertas/LoginAuthMessage'

// Ícones SVG simples para o Google e Apple (conforme imagem)
const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
)

const AppleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.73-1.2 1.87-1.05 2.98 1.12.09 2.27-.56 3-1.43z"/>
    </svg>
)

export const Login = () => {
    const [open, setOpen] = useState(false);
    const [openAlert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({ title: '', message: '' });
    const [progress, setProgress] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { loginWithEmailAndPassword, matches } = useContext(AuthContext);

    const [data, setData] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const login = async () => {
        if (progress) return;
        const emailSanitizado = data.email.trim();
        const passwordSanitizada = data.password;

        if (!emailSanitizado || !passwordSanitizada) {
            setAlertContent({ title: "Campos Obrigatórios", message: "Por favor, preencha o identificador/e-mail e a sua chave de segurança." });
            setAlert(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailSanitizado)) {
            setAlertContent({ title: "E-mail Inválido", message: "O formato do e-mail digitado não parece correto. Verifique a digitação." });
            setAlert(true);
            return;
        }

        setProgress(true);
        try {
            await loginWithEmailAndPassword(emailSanitizado, passwordSanitizada);
        } catch (error) {
            let modalTitle = "Falha no Acesso";
            let modalMessage = "Ocorreu um erro ao tentar se conectar. Verifique seus dados.";
            switch (error.code) {
                case 'auth/invalid-email': modalMessage = "Este formato de e-mail é inválido."; break;
                case 'auth/wrong-password':
                case 'auth/user-not-found': modalMessage = "E-mail ou senha incorretos. Por favor, tente novamente."; break;
                case 'auth/user-disabled': modalTitle = "Acesso Suspenso"; modalMessage = "Este usuário foi desativado pelo administrador do Stockify."; break;
                case 'auth/too-many-requests': modalTitle = "Acesso Bloqueado"; modalMessage = "Múltiplas tentativas falhas detectadas. Sua conta foi temporariamente bloqueada por segurança. Tente mais tarde."; break;
            }
            setAlertContent({ title: modalTitle, message: modalMessage });
            setAlert(true);
        } finally {
            setProgress(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Enter') login(); }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [data, progress]);

    return (
        <Tag.MuiContainer matches={matches}>
            <LoginAuthMessage open={openAlert} onClose={() => setAlert(false)} title={alertContent.title} message={alertContent.message} glowColor="#D946EF" accentColor="#9333EA" />
            
            <Tag.MuiCard matches={matches}>
                {/* Topo do Card: Logo + Título */}
                <Tag.LogoTextLogin variant="h6">
                    STOCKIFY
                </Tag.LogoTextLogin>
                <Tag.MuiTitle>Acesso à plataforma</Tag.MuiTitle>
                
                {/* Ilustração Central do Cadeado 3D */}
                {/* <Tag.IllustrationWrapper>
                    <img src="/assets/security-padlock.png" alt="Segurança Stockify" style={{ width: '130px', height: 'auto' }} />
                </Tag.IllustrationWrapper> */}

                {/* Formulário: E-mail */}
                <Stack width="100%" gap={0.8} mt={1}>
                    <Tag.InputLabelText>E-mail</Tag.InputLabelText>
                    <Tag.MuiGridForm matches={matches}>
                        <Tag.MuiLeftTag><PersonOutline sx={{ fontSize: 20 }} /></Tag.MuiLeftTag>
                        <Stack sx={{ height: '100%', width: '85%' }}>
                            <Tag.MuiTextField name="email" value={data.email} onChange={handleChange} fullWidth placeholder="glowfashionboutique@gmail.com" variant="outlined" />
                        </Stack>
                    </Tag.MuiGridForm>
                </Stack>

                {/* Formulário: Senha */}
                <Stack width="100%" gap={0.8} mt={1.5}>
                    <Tag.InputLabelText>Senha</Tag.InputLabelText>
                    <Tag.MuiGridForm matches={matches}>
                        <Tag.MuiLeftTag><LockOutlined sx={{ fontSize: 20 }} /></Tag.MuiLeftTag>
                        <Stack sx={{ height: '100%', width: '85%' }}>
                            <Tag.MuiTextField 
                                name="password" 
                                value={data.password} 
                                onChange={handleChange} 
                                type={open ? 'text' : 'password'} 
                                fullWidth 
                                placeholder="••••••••••••••••••••" 
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ cursor: 'pointer', color: '#17a2b8', marginRight: '10px' }} onClick={() => setOpen(!open)}>
                                            {open ? <Visibility sx={{ fontSize: 20 }} /> : <VisibilityOff sx={{ fontSize: 20 }} />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Stack>
                    </Tag.MuiGridForm>
                </Stack>

                {/* Opções adicionais: Lembrar-me e Esqueci minha senha */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" mt={1}>
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: '#17a2b8', '&.Mui-checked': { color: '#17a2b8' } }} size="small" />}
                        label={<Typography sx={{ fontSize: '12px', color: '#A8ADB3' }}>Lembrar-me</Typography>}
                    />
                    <Tag.ForgotPasswordLink>Esqueci minha senha</Tag.ForgotPasswordLink>
                </Stack>

                {/* Botão Principal ENTRAR */}
                <Tag.SubmitButton matches={matches} onClick={login} mt={2}>
                    <Typography sx={{ fontFamily: Root.fontFamilySansSerif, fontWeight: '600', fontSize: '14px' }}>
                        {progress ? 'LOGANDO' : 'ENTRAR'}
                    </Typography>
                    {progress ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <ArrowForward sx={{ fontSize: 18 }} />}
                </Tag.SubmitButton>

                {/* Divisor "ou continue com" */}
                <Tag.DividerWrapper>
                    <Box className="line" />
                    <Typography className="text">ou continue com</Typography>
                    <Box className="line" />
                </Tag.DividerWrapper>

                {/* Botões de Login Social */}
                <Stack direction="row" width="100%" gap={2} mt={1}>
                    <Tag.SocialButton>
                        <GoogleIcon />
                        <Typography className="text">Google</Typography>
                    </Tag.SocialButton>
                    <Tag.SocialButton>
                        <AppleIcon />
                        <Typography className="text">Apple</Typography>
                    </Tag.SocialButton>
                </Stack>

                {/* Nota de privacidade interna do Card */}
                <Tag.PrivacyText>
                    Ao continuar, você concorda com nossos <br />
                    <span className="link">Termos de Uso</span> e <span className="link">Política de Privacidade</span>
                </Tag.PrivacyText>

            </Tag.MuiCard>

            <Tag.MuiFooterLogin matches={matches}>
                STOCKIFY @2026
            </Tag.MuiFooterLogin>
        </Tag.MuiContainer>
    )
}