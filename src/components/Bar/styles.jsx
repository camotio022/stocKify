import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/node/styles";

export const StylesBar = {

    conatiner: styled(Box)(({})=> ({
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '80px',
  
    }))
}