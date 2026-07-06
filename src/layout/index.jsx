import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta1.png'
import { DeleteOutline, DetailsOutlined, ExitToApp, History, HistoryOutlined, Home, HomeOutlined, InsertInvitation, Insights, Inventory, Inventory2Outlined, LoginOutlined, Logout, LogoutOutlined, Person2, Person2Outlined, Settings, SettingsOutlined, ShoppingCartCheckout } from "@mui/icons-material"
import { AuthContext } from "../auth_context/index.jsx"
import { useLocation } from "react-router-dom"
import { LogoMainLayout } from "../components/Logo/index.jsx"
import { NavBarTop } from "../components/Bar/index.jsx"
import generateExcelFile from "../saveExcel/index.js"
import { NewItem } from "../pages/NewItem/index.jsx"
import { MuiSelectItem, MuiSelectItemOption, MuiSelectItemOptions, MuiStockModalTop } from "../pages/Stock/styles.jsx"
import { ModalZindex } from "../components/Modal/index.jsx"
import { EstoqueMobile } from "../mobile/layout/index.jsx"
import { LayoutMobile } from "../mobile/styles/layout.jsx"
import { UserItens } from "./components/user/index.jsx"
import { NotificationsApp } from "../pages/Notifications/index.jsx"
import { LogoutConfirmationModal } from "../components/Alertas/LogoutUser.jsx"

export const MainLayout = ({ children }) => {
    const location = useLocation()
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {
        logout,
        tenant,
        newItem,
        setNewItem,
        saveExcel,
        setSaveExcel,
        selectedItems,
        matches,
        notifications, setNotifications,
        messages, setMessage,
        produtos, setProdutos,
    } = useContext(AuthContext)

    // 🗺️ Centralizando todas as rotas para herdar o mesmo estilo inteligente
    const paths = [
        {
            name: 'Dashboard',
            link: '/Dashboard',
            icon: <HomeOutlined />
        },
        {
            name: 'Estoque',
            link: '/',
            icon: <Inventory2Outlined />
        },
        {
            name: 'Entradas',
            link: '/entradas',
            icon: <LoginOutlined />
        },
        {
            name: 'Saídas',
            link: '/exits',
            icon: <LogoutOutlined />
        },
        {
            name: 'Detalhes',
            link: '/details',
            icon: <DetailsOutlined />
        },
        {
            name: 'Históricos',
            link: '/history',
            icon: <HistoryOutlined />
        },
    ]

    const handleFinalLogout = () => {
        logout();
        setShowLogoutModal(false);
    };

    // 📱 Se 'matches' for true (detectado pelo hook de media query do seu contexto),
    // ele joga para o layout mobile corrigindo a prop de 'children'
    if (matches) {
        return (
            <EstoqueMobile produtos={produtos} tenant={tenant}/>
        )
    }
    // 🏁 Função auxiliar para pintar o link se ele estiver ativo na URL
    const checkActiveRoute = (link) => {
        return link === location.pathname || (link !== '/' && location.pathname.startsWith(link));
    }

    return (
        <Tag.MuiMainLayout>
            <Tag.AppBar>
                <LogoMainLayout text={tenant?.name} />
                <UserItens />
            </Tag.AppBar>

            <Tag.MuiMainLayoutRitghStep>
                <Tag.MuiMainLayoutLogo>
                    <Tag.MuiMainLayoutLinks>
                        {
                            paths.map((path, index) => {
                                const isActive = checkActiveRoute(path.link);
                                return (
                                    <Tag.MuiMainLayoutLink
                                        to={path.link}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            color: Root.white,
                                            ...(isActive && {
                                                borderLeft: '2px solid hsl(188, 100%, 48%)',
                                                textTransform: 'uppercase',
                                                height: '38px',
                                                color: Root.white,
                                                background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                                                boxShadow: `0 0 15px ${Root.color_button}30`,
                                                fontWeight: 700
                                            })
                                        }} key={index}>
                                        <Stack sx={{ fontSize: '90%' }}>
                                            {path.icon}
                                        </Stack>
                                        <Stack sx={{ fontSize: '90%' }}>
                                            {path.name}
                                        </Stack>
                                    </Tag.MuiMainLayoutLink>
                                )
                            })
                        }
                    </Tag.MuiMainLayoutLinks>

                    {/* ⚙️ HUB DE CONFIGURAÇÕES E PERFIL ATUALIZADO */}
                    <Tag.MuiMainLayoutSettingsUser>
                        <Tag.MuiMainLayoutLink 
                            to="/minha-conta"
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: Root.white,
                                ...(checkActiveRoute('/minha-conta') && {
                                    borderLeft: '2px solid hsl(188, 100%, 48%)',
                                    textTransform: 'uppercase',
                                    height: '38px',
                                    background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                                    boxShadow: `0 0 15px ${Root.color_button}30`,
                                    fontWeight: 700
                                })
                            }}
                        >
                            <Person2Outlined /> {'Minha conta'}
                        </Tag.MuiMainLayoutLink>

                        <Tag.MuiMainLayoutLink 
                            to="/configuracoes"
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: Root.white,
                                ...(checkActiveRoute('/configuracoes') && {
                                    borderLeft: '2px solid hsl(188, 100%, 48%)',
                                    textTransform: 'uppercase',
                                    height: '38px',
                                    background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                                    boxShadow: `0 0 15px ${Root.color_button}30`,
                                    fontWeight: 700
                                })
                            }}
                        >
                            <SettingsOutlined /> {'Configurações'}
                        </Tag.MuiMainLayoutLink>

                        <Tag.MuiMainLayoutLink onClick={() => setShowLogoutModal(true)} style={{ cursor: 'pointer' }}>
                            <Logout /> {'Saír'}
                        </Tag.MuiMainLayoutLink>
                    </Tag.MuiMainLayoutSettingsUser>
                </Tag.MuiMainLayoutLogo>

                {newItem &&
                    <NewItem
                        newItem={newItem}
                        setNewItem={setNewItem}
                    />
                }
                {saveExcel && <ModalZindex
                    setSaveExcel={setSaveExcel}
                    saveExcel={saveExcel}
                />}
                
                <Tag.RenderChildrensAndNavBar>
                    <NavBarTop
                        newItem={newItem}
                        setNewItem={setNewItem}
                        generateExcelFile={generateExcelFile}
                        setSaveExcel={setSaveExcel}
                        saveExcel={saveExcel}
                    />
                    {notifications && <NotificationsApp />}
                    {children}
                </Tag.RenderChildrensAndNavBar>
            </Tag.MuiMainLayoutRitghStep>

            <LogoutConfirmationModal
                open={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleFinalLogout}
                tenantData={tenant} 
            />
        </Tag.MuiMainLayout>
    )
}