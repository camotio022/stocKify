import React, { useContext, useState } from "react"
import * as Tag from './styles.js'
import { Stack } from "@mui/material"
import { Root } from "../styles/Root/root_styles.jsx"
import Image from '../images/layout/junta.jpg'
import { LogoMainLayout } from "./components/Logo/index.jsx"
import { History, Home, Insights, Inventory, Logout, Person2, Settings, StackedBarChart } from "@mui/icons-material"
import { AuthContext } from "../auth_context/index.jsx"
export const MainLayout = ({ childrens }) => {
    const { logout } = useContext(AuthContext)
    const [value, setValue] = useState('home')
    const paths = [
        {
            name: 'Home',
            link: 'home',
            icon: <Home />
        },
        {
            name: 'Stock',
            link: 'stock',
            icon: <Inventory />
        },
        {
            name: 'Insights',
            link: 'insights',
            icon: <Insights />
        },
        {
            name: 'history',
            link: 'history',
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
                                    onClick={() => setValue(path.link)}
                                    sx={path.link === value && {
                                        marginRight: '-9px',
                                        color: Root.color_button,
                                        backgroundColor: Root.color_app_bar,
                                    }} key={index}>
                                    <Stack>
                                        {path.icon}
                                    </Stack>
                                    <Stack>
                                        {path.name}
                                    </Stack>
                                </Tag.MuiMainLayoutLink>
                            )
                        })
                    }
                </Tag.MuiMainLayoutLinks>

                <Tag.MuiMainLayoutSettingsUser>
                    <Settings />
                    <Person2 />
                    <Logout onClick={()=> logout()}/>
                </Tag.MuiMainLayoutSettingsUser>
            </Tag.MuiMainLayoutLogo>
            <Tag.MuiMainLayoutRitghStep>
                {childrens}
            </Tag.MuiMainLayoutRitghStep>
        </Tag.MuiMainLayout>
    )
}