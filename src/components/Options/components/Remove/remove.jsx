import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";

export const StylesRemoveItem = {
    quetion: styled(Stack)(({})=> ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
    })),
    mapSugests: styled(Stack)(({})=> ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '4px',
        width: '90%',
        height: 'auto',
    })),
    inputQuantidade: styled('input')(({})=> ({
        color: Root.color_default,
        border: 'none',
        width: '90%',
        height: '38px',
        paddingInline: '18px',
        backgroundColor: 'transparent',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'textfield',
        margin: 0,
        outline: 'none',
    })),
    retirar: styled(Stack)(({})=> ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '90%',
        height: '38px',
        color: Root.color_button,
        boxShadow: Root.boxS,
        ...Root.hover,
        borderRadius: '10px',
        marginTop: '1.2rem'
    })),
}