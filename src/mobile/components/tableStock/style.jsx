import { styled, Container, Stack } from "@mui/material";
import { Root } from "../../../styles/Root/root_styles";

export const StylesTableMobile = {
    container: styled(Container)(({ }) => ({
        width: '100%',
        height: 'auto',
    })),
    tableRow: styled(Stack)(({ }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '95%',
        minHeight: '40px',
        backgroundColor: Root.color_button,
        color: Root.color_default,
        border: `1px solid ${Root.color_button_opacity}`
    })),
    tableRowItem: styled(Stack)(({}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
    })),
}