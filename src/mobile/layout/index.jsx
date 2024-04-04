
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

export const Mobile = ({ }) => {
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
            <h1 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                fontFamily: 'cursive',
                width: '100%',
                fontSize: '5.8rem',
                color: 'transparent',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: 'black',
                backgroundImage: 'url(data:image/png;base64,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)',
                color: 'transparent',
                backgroundSize: 'contain',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
            }}>
                {paths
                    .filter(item => item.link === location.pathname)
                    .map(item => item.name)
                }
            </h1>
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
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    border: `1px solid ${Root.color_button_opacity}`,
                    fontWeight: 'bold',
                    fontFamily: Root.fontFamilyMonospace,
                    color: Root.color_button,
                    cursor: 'pointer',
                    mr: '4px',
                    borderRadius: '50%'
                }}>
                    {firstLatter[0]}
                    {lengthNameAll.length > 1 && secondLatter[0]}
                </Stack>
            </LayoutMobile._app_bar_top>
        </LayoutMobile._containerMobile>
    )
}