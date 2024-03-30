import { Stack, styled } from "@mui/material";

export const StylesBar = {

    conatiner: styled(Stack)(({})=> ({
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 'auto',
        paddingBlock: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.125)',
    }))
}