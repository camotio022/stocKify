import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta2.png'
import { ExitToApp, History, Home, Insights, Inventory, Logout, Person2, Settings } from "@mui/icons-material"
import { AuthContext } from "../auth_context/index.jsx"
import { useLocation } from "react-router-dom"
import { LogoMainLayout } from "../components/Logo/index.jsx"
export const MainLayout = ({ childrens }) => {
    const location = useLocation()
    const { logout } = useContext(AuthContext)
    const [value, setValue] = useState('home')
    const paths = [
        {
            name: 'Home',
            link: '/',
            icon: <Home />
        },
        {
            name: 'Exits',
            link: '/exits',
            icon: <ExitToApp />
        },
        {
            name: 'Stock',
            link: '/stock',
            icon: <Inventory />
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
                {childrens}
            </Tag.MuiMainLayoutRitghStep>
        </Tag.MuiMainLayout>
    )
}