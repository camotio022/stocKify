import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/node/styles";

export const StylesBar = {

    conatiner: styled(Box)(({})=> ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'flex-end',
        width: '100%',
        minHeight: '80px',
        height: 'auto',
        padding: '0 24px',
    }))
}