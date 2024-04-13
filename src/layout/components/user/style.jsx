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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '4px',
        backgroundColor: Root.color_app_bar,
        color: Root.color_button,
        ...Root.hover
    })),
    avatar: styled(Avatar)(({ }) => ({
        width: '38px',
        height: '36px',
        backgroundColor: Root.color_app_bar,
        color: Root.color_button
    }))
}