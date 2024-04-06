import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta1.png'
import { DeleteOutline, ExitToApp, History, Home, InsertInvitation, Insights, Inventory, Logout, Person2, Settings, ShoppingCartCheckout } from "@mui/icons-material"
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
export const MainLayout = ({ childrens }) => {
    const location = useLocation()
    const {
        logout,
        newItem,
        setNewItem,
        saveExcel,
        setSaveExcel,
        selectedItems,
        matches
    } = useContext(AuthContext)
    const paths = [
        {
            name: 'Stock',
            link: '/',
            icon: <Home />
        },
        {
            name: 'Entrou',
            link: '/entradas',
            icon: <Inventory />
        },
        {
            name: 'Exits',
            link: '/exits',
            icon: <ExitToApp />
        },
        {
            name: 'Insight',
            link: '/insights',
            icon: <Insights />
        },
        {
            name: 'history',
            link: '/history',
            icon: <History />
        },
    ]
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
                    <LayoutMobile._bigTitle>
                        Junta Mais
                    </LayoutMobile._bigTitle>
                </Stack>
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
                                            color: Root.color_button,
                                            backgroundColor: Root.color_app_bar,
                                            fontWeight: 'bold',
                                            boxShadow: Root.boxS,
                                            height: '50px'
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
                            <Person2 /> {'Porfile'}
                        </Tag.MuiMainLayoutLink>
                        <Tag.MuiMainLayoutLink>
                            <Settings /> {'Settings'}
                        </Tag.MuiMainLayoutLink>
                        <Tag.MuiMainLayoutLink>
                            <Logout onClick={() => logout()} /> {'Logout'}
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
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    paddingInline: '12px',
                    height: '95%',
                }}>
                    <NavBarTop
                        newItem={newItem}
                        setNewItem={setNewItem}
                        generateExcelFile={generateExcelFile}
                        setSaveExcel={setSaveExcel}
                        saveExcel={saveExcel}
                    />
                    {childrens}
                </Stack>
            </Tag.MuiMainLayoutRitghStep>
        </Tag.MuiMainLayout>
    )
}