import { MailOutline, Notifications } from "@mui/icons-material"
import { Avatar, Box, Stack } from "@mui/material"
import { Root } from "../../../styles/Root/root_styles"
import { useContext } from "react"
import { AuthContext } from "../../../auth_context"
import { StyleUser } from "./style"

export const UserItens = ({ }) => {
    const { user, setNotifications,notifications } = useContext(AuthContext)
    const firstLatter = user.name.split(' ')[0]
    const secondLatter = user.name.split(' ')[1]
    const centerRow = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '12px',
    }
    return (
        <StyleUser.contain>
            <StyleUser.item onClick >
                <MailOutline />
            </StyleUser.item >
            <StyleUser.item sx={notifications&&{
                backgroundColor: Root.color_button,
                color: Root.color_default,
            }} onClick={()=> setNotifications(!notifications)}>
                <Notifications />
            </StyleUser.item>

            <Stack sx={{ ...centerRow, width: 'auto' }}>
                <StyleUser.avatar>
                    {firstLatter[0]}
                    {secondLatter ? secondLatter[0] : ''}
                </StyleUser.avatar>

            </Stack>
        </StyleUser.contain>
    )
}