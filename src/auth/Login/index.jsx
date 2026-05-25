import { CircularProgress, InputAdornment, Stack, Typography, useMediaQuery } from '@mui/material'
import * as Tag from './styles'
import { Root } from '../../styles/Root/root_styles'
import { LockClock, Person, Visibility, VisibilityOff } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth_context'
import { LogoMainLayout } from '../../components/Logo'
import { LoginAuthMessage } from '../../components/Alertas/LoginAuthMessage'

export const Login = () => {
    const[open, setOpen] = useState(false); // Mudado de '' para false (booleano)
    const [openAlert, setAlert] = useState(false); // Corrigido erro de digitação de setAleter e inicializado como false
    const [alertContent, setAlertContent] = useState({ title: '', message: '' }); // Guarda os textos dinâmicos do erro
    const [progress, setProgress] = useState(false);
    const { loginWithEmailAndPassword, matches } = useContext(AuthContext);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 🔐 Validação e Função de Login robusta
    const login = async () => {
        // Se já estiver processando, bloqueia cliques repetidos (evita ataques de brute-force manual)
        if (progress) return;

        // 1. Limpeza de espaços em branco (Sanitização básica)
        const emailSanitizado = data.email.trim();
        const passwordSanitizada = data.password;

        // 2. Validações Locais de Segurança
        if (!emailSanitizado || !passwordSanitizada) {
            setAlertContent({
                title: "Campos Obrigatórios",
                message: "Por favor, preencha o identificador/e-mail e a sua chave de segurança."
            });
            setAlert(true);
            return;
        }

        // Validação de formato de e-mail por Regex básica
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailSanitizado)) {
            setAlertContent({
                title: "E-mail Inválido",
                message: "O formato do e-mail digitado não parece correto. Verifique a digitação."
            });
            setAlert(true);
            return;
        }

        setProgress(true);

        try {
            // Envia os dados limpos e validados para o Firebase
            await loginWithEmailAndPassword(emailSanitizado, passwordSanitizada);
        } catch (error) {
            console.error("[Auth Error]:", error.code);

            // 3. Tratamento Reverso Seguro (Tradução amigável de erros do Firebase)
            let modalTitle = "Falha no Acesso";
            let modalMessage = "Ocorreu um erro ao tentar se conectar. Verifique seus dados.";

            switch (error.code) {
                case 'auth/invalid-email':
                    modalMessage = "Este formato de e-mail é inválido.";
                    break;
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    // Mensagem unificada por motivos de segurança (evita descoberta de e-mails existentes)
                    modalMessage = "E-mail ou senha incorretos. Por favor, tente novamente.";
                    break;
                case 'auth/user-disabled':
                    modalTitle = "Acesso Suspenso";
                    modalMessage = "Este usuário foi desativado pelo administrador do Stockify.";
                    break;
                case 'auth/too-many-requests':
                    modalTitle = "Acesso Bloqueado";
                    modalMessage = "Múltiplas tentativas falhas detectadas. Sua conta foi temporariamente bloqueada por segurança. Tente mais tarde.";
                    break;
            }

            setAlertContent({ title: modalTitle, message: modalMessage });
            setAlert(true);
        } finally {
            setProgress(false); // Sempre desativa o loading, independente de dar certo ou errado
        }
    };

    // Captura segura do teclado usando useEffect (Evita vazamento de memória)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                login();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        // Limpeza crucial ao desmontar o componente ou ao mudar dependências
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [data, progress]); // Fica de olho nos dados atualizados
    return (
        <Tag.MuiContainer matches={matches}>
            <LoginAuthMessage open={openAlert}
                onClose={() => setAlert(false)}
                title={alertContent.title}
                message={alertContent.message}
                glowColor="#D946EF" // Acompanha o rosa neon da sua identidade visual de login
                accentColor="#9333EA" />
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
                STOCKIFY @2026
            </Tag.MuiFooterLogin>
        </Tag.MuiContainer>
    )
}