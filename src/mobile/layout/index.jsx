
import { ExitToApp, History, Home, Insights, Inventory, Menu } from "@mui/icons-material"
import { LogoMainLayout } from "../../components/Logo"
import { LayoutMobile } from "../styles/layout"
import { Root } from "../../styles/Root/root_styles"
import { Box, Stack } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { Fragment, useContext } from "react"
import { AuthContext } from '../../auth_context'


const renderLink = (item, index, location, paths) => {
    const path = location.pathname === item.link;
    const previousIndex = paths.findIndex((item) => item.link === location.pathname) - 1;

    const linkStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '61px',
        height: '61px',
        border: `1px solid ${Root.color_default}`,
        backgroundColor: Root.color_default,
        color: path ? Root.color_default : Root.color_button,
        fontWeight: path ? 'bold' : 'normal',
        fontFamily: path ? Root.fontFamilyMonospace : '',
        animation: 'dash 2s infinite',
        borderRadius: '50%',
    };

    return (
        <LayoutMobile._containerItemMap key={index}>
            {!path && (
                <Box
                    sx={{
                        position: 'absolute',
                        content: "''",
                        width: '100%',
                        height: '100%',
                        backgroundColor: Root.color_button,
                        borderTopRightRadius: index === previousIndex && '50%',
                        borderTopLeftRadius: index === (2 + previousIndex) && '50%'
                    }}
                />
            )}
            <Link to={item.link} style={path ? {
                ...linkStyles,
                backgroundColor: Root.color_button,
            } :
                {
                    ...linkStyles,
                }} key={index}>
                <Stack sx={{ fontSize: '90%' }}>
                    {item.icon}
                </Stack>
                <Stack sx={{ fontSize: '80%' }}>
                    {item.name}
                </Stack>

            </Link>
        </LayoutMobile._containerItemMap>
    );
};

export const Mobile = ({ childrens }) => {
    const { user } = useContext(AuthContext)
    const lengthNameAll = user.name.split(' ')
    const firstLatter = user.name.split(' ')[0]
    const secondLatter = user.name.split(' ')[1]
    const location = useLocation()
    const paths = [
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
            name: 'Stock',
            link: '/',
            icon: <Home />
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
        <LayoutMobile._containerMobile>
            <LayoutMobile._app_bar>
                {paths.map((item, index) => (
                    <Fragment key={index}>
                        {renderLink(item, index, location, paths)}
                    </Fragment>
                ))}
            </LayoutMobile._app_bar>
            <LayoutMobile._bigTitle>
                {paths
                    .filter(item => item.link === location.pathname)
                    .map(item => item.name)
                }
            </LayoutMobile._bigTitle>
            {childrens}
            <LayoutMobile._app_bar_top>
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'auto',
                    height: '90%'
                }}>
                    <LogoMainLayout black={true} top={true} />
                </Stack>
                <LayoutMobile._userAvatar>
                    {firstLatter[0]}
                    {lengthNameAll.length > 1 && secondLatter[0]}
                </LayoutMobile._userAvatar>
            </LayoutMobile._app_bar_top>
        </LayoutMobile._containerMobile>
    )
}