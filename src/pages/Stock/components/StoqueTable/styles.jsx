import { Box, Stack, TableCell, TableRow, styled,Typography } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
export const MuiHeaderTable = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',
    gap: '12px'
}))
export const MuiRowTable = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto'
}))
export const MuiTableClhild = styled(Typography)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',
    fontWeight: 'bold',
    flexWrap: 'nowrap',
    fontSize: '14px',
    color: Root.black,
    width: '100%',
    height: '100%',
    color: Root.color_button,
    boxSizing: 'border-box',
    padding: '10px'
}))
export const MuiTableRow = styled(Box)(({ index }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    height: '40px',
    backgroundColor: index % 2 === 1 && Root.tableBg,
    '&:hover': {
        backgroundColor: Root.color_button_opacity,
        transition: 'all .3s',
        boxShadow: Root.boxS
    },
    boxSizing: 'border-box'
}))
export const MuiTableRowCell = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    height: '100%',
    fontSize: '15px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: Root.color_button,
    padding: '10px'
}))