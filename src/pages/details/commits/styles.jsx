import { Stack, styled } from "@mui/material";
import { Root } from "../../../styles/Root/root_styles";
export const StyleCommits = {
    container: styled(Stack)(({})=> ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        minHeight: 'auto',
        backgroundColor: Root.color_default,
    })),
    card: styled(Stack)(({})=> ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: '1px',
        width: "100%",
        height: 'auto',
        backgroundColor: Root.white,
        color: Root.color_button,
        borderBottom: `1px solid ${Root.color_button_opacity}`,
    })), 
}