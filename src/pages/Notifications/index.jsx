import React from "react"
import { Stack } from "@mui/material"
import { Root } from "../../styles/Root/root_styles"

export const NotificationsApp = ({ }) => {
    return (
        <Stack sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '30%',
            height: '100%',
            right: '12px',
            backgroundColor: Root.color_button_opacity,
            
        }}>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: Root.color_default,
                height: '100%',
                width: '100%',
      
                borderTopLeftRadius: '50%',
                borderBottomRightRadius: '50%',
            }}>
                opsa sdsdsds
            </Stack>

        </Stack>
    )
}