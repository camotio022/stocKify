import { Avatar, Stack, styled } from "@mui/material";
import { Root } from "../../../styles/Root/root_styles";

export const StyleUser = {
    contain: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '12px',
        marginRight: '12px',
        justifyContent: 'flex-end',
        width: '50%',
        color: Root.color_button
    })),
    item: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '4px',
        backgroundColor: Root.color_app_bar,
        color: Root.color_button,
        ...Root.hover
    })),
    isRead: styled(Stack)(({})=> ({
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '4px',
        backgroundColor: Root.red,
        color: Root.color_button,
        ...Root.hover,
        top: -4,
        right:-4,
        borderRadius: '50%',
    })),
    avatar: styled(Avatar)(({ }) => ({
        width: '38px',
        height: '36px',
        backgroundColor: Root.color_app_bar,
        color: Root.color_button
    }))
}