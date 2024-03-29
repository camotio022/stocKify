import { Box, Stack, TableCell, TableRow, styled } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
export const MuiHeaderTable = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',
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
    justifyContent: 'center',
    gap: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: Root.black,
    fontFamily: Root.fontFamilyMonospace,
    backgroundColor: Root.color_button,
    width: '100%',
    height: '100%',
    color: Root.color_default,
    borderRight: `1px solid ${Root.color_app_bar}`,
    boxSizing: 'border-box'
}))
export const MuiTableRow = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40px',
    '&:hover': {
        backgroundColor: Root.color_button_opacity,
        transition: 'all .3s',
        boxShadow: Root.boxS
    },
    borderBottom: `1px solid ${Root.color_button_opacity}`,
    boxSizing: 'border-box'

}))
export const MuiTableRowCell = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    height: '100%',
    borderRight: `1px solid ${Root.color_button_opacity}`,
    fontFamily: Root.fontFamilyMonospace,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))