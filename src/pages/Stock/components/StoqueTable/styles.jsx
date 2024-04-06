import { Box, Stack, TableCell, TableRow, styled } from "@mui/material";
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
export const MuiTableClhild = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: Root.black,
    fontFamily: Root.fontFamilyMonospace,
    width: '100%',
    height: '100%',
    color: Root.color_button,

    boxSizing: 'border-box'
}))
export const MuiTableRow = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    height: '40px',
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
    fontFamily: Root.fontFamilyMonospace,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))