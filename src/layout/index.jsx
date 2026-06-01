import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta1.png'
import { DeleteOutline, DetailsOutlined, ExitToApp, History, Home, HomeOutlined, InsertInvitation, Insights, Inventory, Inventory2Outlined, LoginOutlined, Logout, LogoutOutlined, Person2, Person2Outlined, Settings, SettingsOutlined, ShoppingCartCheckout } from "@mui/icons-material"
import { AuthContext } from "../auth_context/index.jsx"
import { useLocation } from "react-router-dom"
import { LogoMainLayout } from "../components/Logo/index.jsx"
import { NavBarTop } from "../components/Bar/index.jsx"
import generateExcelFile from "../saveExcel/index.js"
import { NewItem } from "../pages/NewItem/index.jsx"
import { MuiSelectItem, MuiSelectItemOption, MuiSelectItemOptions, MuiStockModalTop } from "../pages/Stock/styles.jsx"
import { ModalZindex } from "../components/Modal/index.jsx"
import { Mobile } from "../mobile/layout/index.jsx"
import { LayoutMobile } from "../mobile/styles/layout.jsx"
import { UserItens } from "./components/user/index.jsx"
import { NotificationsApp } from "../pages/Notifications/index.jsx"
import { LogoutConfirmationModal } from "../components/Alertas/LogoutUser.jsx"
export const MainLayout = ({ childrens }) => {
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
        messages, setMessage
    } = useContext(AuthContext)
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
        // {
        //     name: 'Históricos',
        //     link: '/history',
        //     icon: <History />
        // },
    ]
    const handleFinalLogout = () => {
        logout();
        setShowLogoutModal(false);
    };
    if (matches) {
        return (
            <Mobile childrens={childrens} />
        )
    }
    return (
        <Tag.MuiMainLayout>
            <Tag.AppBar>
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    ml: '12px',
                    height: '85%',
                    width: '100%',
                }}>
                    <LogoMainLayout text={tenant?.name} />
                </Stack>
                <UserItens />
            </Tag.AppBar>
            <Tag.MuiMainLayoutRitghStep>
                <Tag.MuiMainLayoutLogo>
                    <Tag.MuiMainLayoutLinks>
                        {
                            paths.map((path, index) => {
                                return (
                                    <Tag.MuiMainLayoutLink
                                        to={path.link}
                                        sx={path.link === location.pathname && {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            color: Root.white,
                                            textTransform: 'uppercase',
                                            height: '38px',
                                            background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                                        }} key={index}>
                                        <Stack sx={{ fontSize: '90%' }}>
                                            {path.icon}
                                        </Stack>

                                        {<Stack sx={{ fontSize: '90%', }}>
                                            {path.name}
                                        </Stack>}
                                    </Tag.MuiMainLayoutLink>
                                )
                            })
                        }
                    </Tag.MuiMainLayoutLinks>
                    <Tag.MuiMainLayoutSettingsUser>
                        <Tag.MuiMainLayoutLink>
                            <Person2Outlined /> {'Minha conta'}
                        </Tag.MuiMainLayoutLink>
                        <Tag.MuiMainLayoutLink>
                            <SettingsOutlined /> {'Configurações'}
                        </Tag.MuiMainLayoutLink>
                        <Tag.MuiMainLayoutLink onClick={() => setShowLogoutModal(true)} >
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
                    {childrens}
                </Tag.RenderChildrensAndNavBar>
            </Tag.MuiMainLayoutRitghStep>

            <LogoutConfirmationModal
                open={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleFinalLogout}
                tenantData={tenant} />
        </Tag.MuiMainLayout>
    )
}