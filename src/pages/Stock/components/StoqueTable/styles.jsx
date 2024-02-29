import { TableCell, styled } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";

export const MuiTableClhild = styled(TableCell)(({})=> ({
    fontWeight: 'bold',
    fontSize: '16px',
    color: Root.black,
    fontFamily: Root.fontFamilyMonospace
}))