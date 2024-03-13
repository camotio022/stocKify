import { Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const TagsExits = {
    container: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '98%',
        fontFamily: Root.fontFamilyMonospace,
    })),
    containerTable: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '85%',
        width: '100%',
        ...Root.scrollBar
    }))
}