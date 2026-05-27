import React, { useContext } from "react";
import { AuthContext } from "../auth_context";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../auth/Login";
import { MainLayout } from "../layout";
import { Stock } from "../pages/Stock";
import { ExitsItems } from "../pages/ExitsItems";
import { DetailsItems } from "../pages/details";
import { Entradas } from "../pages/Entradas";
import { ItemQrCode } from "../pages/Qr_Code";
import { Percepcoes } from "../pages/percepcoes";
import { Box, CircularProgress, Typography } from '@mui/material';
export const MainRoutes = () => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    // Trava de segurança para não piscar a tela
    if (loading) {
        return (
            <Box
                sx={{
                    position: 'fixed', // 🔥 Fixa a tela de carregamento sobrepondo todo o app
                    top: 0,
                    left: 0,
                    width: '100vw',  // 🔥 Garante 100% da largura da tela
                    height: '100vh', // 🔥 Garante 100% da altura da tela
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#0D0B14', // O Midnight Violet oficial do Stockify
                    overflow: 'hidden',
                    zIndex: 99999 // 🔥 Garante que fique por cima de qualquer modal ou sidebar antiga
                }}
            >
                {/* 🌌 Efeito de Luz de Fundo (Glow de Ambiente) */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        bgcolor: 'rgba(124, 58, 237, 0.25)', // Roxo elétrico sutil
                        filter: 'blur(100px)',
                        zIndex: 1
                    }}
                />

                {/* 💎 Box Central com Glassmorphism e Fundo Desfocado */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 5,
                        mx: 2,
                        maxWidth: '420px',
                        width: '100%',
                        borderRadius: '24px',
                        // Mistura de fundo semitransparente com desfoque de vidro (backdrop-filter)
                        background: 'rgba(20, 15, 35, 0.65)',
                        backdropFilter: 'blur(16px)',
                        webkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(124, 58, 237, 0.3)', // Borda fina roxa com transparência
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)',
                        textAlign: 'center'
                    }}
                >
                    {/* 🌀 Spinner Customizado com Neon Glow */}
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                        <CircularProgress
                            size={64}
                            thickness={4.5}
                            sx={{
                                color: '#7C3AED', // Roxo principal
                                filter: 'drop-shadow(0px 0px 8px #7C3AED)', // Efeito Neon
                            }}
                        />
                    </Box>

                    {/* 📝 Mensagem Profissional de Arquitetura Corporativa */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            mb: 1
                        }}
                    >
                        Sincronizando Sessão
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            px: 2
                        }}
                    >
                        Validando credenciais corporativas e isolando ambiente seguro multi-tenant...
                    </Typography>
                </Box>
            </Box>
        );
    }

    // 🔑 Se não estiver logado, renderiza apenas a tela de Login
    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }

    // 🔐 Se estiver logado, envelopa o bloco de rotas passando para a sua propriedade 'childrens'
    return (
        <MainLayout childrens={
            <Routes>
                <Route path="/" element={<Stock />} />
                <Route path="/entradas" element={<Entradas />} />
                <Route path="/exits" element={<ExitsItems />} />
                <Route path="/details/:id" element={<DetailsItems />} />
                <Route path="/detailsItem/:id" element={<ItemQrCode />} />
                <Route path="/insights" element={<Percepcoes />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        } />
    );
};