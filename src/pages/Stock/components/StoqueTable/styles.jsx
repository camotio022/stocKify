import { TableCell, TableRow, styled } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";

export const MuiTableClhild = styled(TableCell)(({})=> ({
    fontWeight: 'bold',
    fontSize: '16px',
    color: Root.black,
    fontFamily: Root.fontFamilyMonospace
}))

export const MuiTableRow = styled(TableRow)(({})=> ({
    '&:hover': {
        backgroundColor: Root.color_button_opacity,
        transition: 'all .3s',
    }
}))