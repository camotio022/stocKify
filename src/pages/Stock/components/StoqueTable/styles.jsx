import { Box, Stack, TableCell, TableRow, styled, Typography } from "@mui/material";
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
    gap: '8px',
    flexWrap: 'nowrap',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.02em',
    textTransform: 'none',
    color: '#4A4A68',
    textShadow: `0px 0px 1px ${Root.color_button_opacity}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        color: Root.color_button, // O roxo do logo
        transform: 'translateX(2px)', // Pequeno deslocamento elegante
    }
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
    boxSizing: 'border-box',
    padding: '10px 16px',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '14px', 
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#4A4A68',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        color: Root.color_button,
        transform: 'translateX(3px)',
    }
}))