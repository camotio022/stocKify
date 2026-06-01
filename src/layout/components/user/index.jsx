import { CardMembership, EditCalendar, Group, KeyboardArrowDown, MailOutline, Notifications } from "@mui/icons-material"
import { Avatar, Box, Stack } from "@mui/material"
import { Root } from "../../../styles/Root/root_styles"
import { useContext } from "react"
import { AuthContext } from "../../../auth_context"
import { StyleUser } from "./style"
import { notificationsMasks } from "../../../pages/Notifications/mask"

export const UserItens = ({ }) => {
    const { user, setNotifications, notifications } = useContext(AuthContext)
    const firstLatter = user.name.split(' ')[0]
    const secondLatter = user.name.split(' ')[1]
    const centerRow = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '12px',
    }
    const isRead = notificationsMasks.filter((item) => item.isRead === true)
    return (
        <StyleUser.contain>
            <StyleUser.item sx={notifications ? {
                ...Root.borderImage,
                color: Root.white
            } : {
                color: Root.white
            }} onClick={() => setNotifications(!notifications)}>
                {isRead.length > 0 && <StyleUser.isRead >{isRead.length}</StyleUser.isRead>}
                <Notifications />
            </StyleUser.item>

            <Stack sx={{
                ...centerRow,
                width: 'auto',
                ml: 2,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                fontWeight: 600, // Semi-bold para destacar o usuário sem ser agressivo
                letterSpacing: '0.02em',
            }}
            >
                <StyleUser.avatar src={user.photoURL}>
                    {firstLatter[0]}
                    {secondLatter ? secondLatter[0] : ''}
                </StyleUser.avatar>
                <StyleUser.stackNameArrow>
                    {user.name}
                    <KeyboardArrowDown />
                </StyleUser.stackNameArrow>
            </Stack>
        </StyleUser.contain>
    )
}