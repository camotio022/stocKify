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
import { ComponentCompanies } from "../auth/companies/ComponentCompanies";
import { OnboardingScreen } from "../../hooks/OnboardingScreen";

export const MainRoutes = () => {
    const { isLoggedIn, loading, tenant } = useContext(AuthContext);

    // 🛡️ 1. TRAVA DE SEGURANÇA: Bloqueia renderizações precoces enquanto busca dados
    if (loading) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100vw', height: '100vh',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    bgcolor: '#0D0B14',
                    overflow: 'hidden',
                    zIndex: 99999
                }}
            >
                <Box sx={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', bgcolor: 'rgba(124, 58, 237, 0.25)', filter: 'blur(100px)', zIndex: 1 }} />
                <Box sx={{ relative: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, background: 'rgba(20, 15, 35, 0.65)', backdropFilter: 'blur(16px)', borderRadius: '24px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                    <CircularProgress size={64} thickness={4.5} sx={{ color: '#7C3AED', filter: 'drop-shadow(0px 0px 8px #7C3AED)' }} />
                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, mt: 2 }}>Sincronizando Sessão</Typography>
                </Box>
            </Box>
        );
    }

    // 🔒 2. NÃO LOGADO: Renderiza apenas o portal de Login
    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }

    // 🏢 3. LOGADO MAS SEM EMPRESA ATIVA: Força Onboarding ou Seleção
    // Colocamos essa verificação AQUI. O React renderiza isso e dá 'return', 
    // impedindo que o código abaixo tente ler o 'tenant.id' nulo!
    // barramos o usuário aqui de qualquer forma, impedindo que o F5 pule para a home.
    if (isLoggedIn && (!tenant || tenant === "none")) {
        return (
            <Routes>
                <Route path="/mult_companies" element={<ComponentCompanies />} />
                <Route path="/createNewTenant" element={<OnboardingScreen />} />
                <Route
                    path="*"
                    element={
                        sessionStorage.getItem("empresasDisponiveis")
                            ? <Navigate to="/mult_companies" replace />
                            : <Navigate to="/createNewTenant" replace />
                    }
                />
            </Routes>
        );
    }

    // =========================================================================
    // 🔐 4. AMBIENTE SEGURO GARANTIDO (Só chega aqui se REALMENTE tiver uma empresa ativa)
    // =========================================================================

    // Mudamos o fallback: se não houver tenant.id e nem activeTenantId real no sessionStorage,
    // o valor fica nulo e não deixará renderizar dados falsos.
    const activeId = tenant?.id && tenant.id !== "none"
        ? tenant.id
        : sessionStorage.getItem("activeTenantId");

    // Se por um erro de sincronismo assíncrono o ID sumir, joga pro Onboarding em vez de abrir a Home limpa
    if (!activeId) {
        return <Navigate to="/createNewTenant" replace />;
    }

    return (
        <MainLayout
            key={activeId}
            children={
                <Routes>
                    <Route path="/" element={<Stock />} />
                    <Route path="/entradas" element={<Entradas />} />
                    <Route path="/exits" element={<ExitsItems />} />
                    <Route path="/details/:id" element={<DetailsItems />} />
                    <Route path="/detailsItem/:id" element={<ItemQrCode />} />
                    <Route path="/insights" element={<Percepcoes />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            }
        />
    );
};