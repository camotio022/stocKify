import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta2.png'
import { DeleteOutline, ExitToApp, History, Home, InsertInvitation, Insights, Inventory, Logout, Person2, Settings, ShoppingCartCheckout } from "@mui/icons-material"
import { AuthContext } from "../auth_context/index.jsx"
import { useLocation } from "react-router-dom"
import { LogoMainLayout } from "../components/Logo/index.jsx"
import { NavBarTop } from "../components/Bar/index.jsx"
import generateExcelFile from "../saveExcel/index.js"
import { NewItem } from "../pages/NewItem/index.jsx"
import { MuiSelectItem, MuiSelectItemOption, MuiSelectItemOptions, MuiStockModalTop } from "../pages/Stock/styles.jsx"
import { ModalZindex } from "../components/Modal/index.jsx"
export const MainLayout = ({ childrens }) => {
    const location = useLocation()
    const {
        logout,
        newItem,
        setNewItem,
        saveExcel,
        setSaveExcel,
        selectedItems
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
    return (
        <Tag.MuiMainLayout>
            <Tag.MuiMainLayoutLogo>
                <LogoMainLayout
                    image={Image}
                    text={'STOCKIFY'}
                />
                <Tag.MuiMainLayoutLinks>
                    {
                        paths.map((path, index) => {
                            return (
                                <Tag.MuiMainLayoutLink
                                    to={path.link}
                                    sx={path.link === location.pathname && {
                                        color: Root.color_default,
                                        boxShadow: Root.boxShadow,
                                        height: '50px'
                                    }} key={index}>
                                    <Stack sx={{ fontSize: '90%' }}>
                                        {path.icon}
                                    </Stack>
                                    {path.link === location.pathname && <Stack sx={{ fontSize: '90%', }}>
                                        {path.name}
                                    </Stack>}
                                </Tag.MuiMainLayoutLink>
                            )
                        })
                    }
                </Tag.MuiMainLayoutLinks>
                <Tag.MuiMainLayoutSettingsUser>
                    <Settings />
                    <Person2 />
                    <Logout onClick={() => logout()} />
                </Tag.MuiMainLayoutSettingsUser>
            </Tag.MuiMainLayoutLogo>
            <Tag.MuiMainLayoutRitghStep>
                {newItem &&
                    <NewItem
                        newItem={newItem}
                        setNewItem={setNewItem}
                    />
                }
                {selectedItems.length > 0 && <MuiStockModalTop>
                    <MuiSelectItem>
                        {selectedItems.length}
                    </MuiSelectItem>
                    <MuiSelectItemOptions>
                        {[
                            {
                                icon: <InsertInvitation />,
                                label: 'About expire',
                            },
                            {
                                icon: <ShoppingCartCheckout />,
                                label: 'Remove items',
                            },
                            {
                                icon: <DeleteOutline />,
                                label: 'Delete itens',
                            },
                        ].map((item, index) => {
                            return (
                                <MuiSelectItemOption key={index}>
                                    {item.icon} {item.label}
                                </MuiSelectItemOption>
                            )
                        })}
                    </MuiSelectItemOptions>
                </MuiStockModalTop>}
                {saveExcel && <ModalZindex
                    setSaveExcel={setSaveExcel}
                    saveExcel={saveExcel}
                    stock={''}
                />}
                <NavBarTop
                    newItem={newItem}
                    setNewItem={setNewItem}
                    generateExcelFile={generateExcelFile}
                    setSaveExcel={setSaveExcel}
                    saveExcel={saveExcel}
                />
                {childrens}
            </Tag.MuiMainLayoutRitghStep>
        </Tag.MuiMainLayout>
    )
}