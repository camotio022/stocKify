import { Box, Button, InputBase, Select, Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { BorderColor, Search } from "@mui/icons-material";

export const MuiStock = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '98%',
    fontFamily: Root.fontFamilyMonospace,

}))
export const MuiStockModalTop = styled(Stack)(({ }) => ({
    position: 'absolute',
    width: '100%',
    height: '79px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all .5s',
    zIndex: 12,
    color: Root.color_default,
    backgroundColor: Root.color_button,
    borderBottom: `1px solid ${Root.color_app_bar}`
}))
export const MuiStockNavBar = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '50%',
    minHeight: '100%',
    gap: '12px'
}))
export const MuiStockNavBarRigth = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 'auto',
    height: '100%',
    gap: '12px'
}))
export const MuiStockBotton = styled(Button)(({ }) => ({
    // --- 1. BOX MODEL & LAYOUT ---
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 'auto',
    height: 'auto', // Ajustado para ser flexível ao padding
    padding: '8px 16px',
    gap: '8px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: Root.fontFamilySansSerif, 
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(128, 0, 128, 0.05)', 
    color: Root.color_button,
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        backgroundColor: Root.color_button,
        color: '#ffffff',
        boxShadow: `0 4px 12px ${Root.color_button_opacity2}`, 
        transform: 'translateY(-1px)',
    },

    '&:active': {
        transform: 'translateY(0)',
    },

    ':focus': {
        outline: 'none',
        border: '0px',
    }
}))
export const MuiSearchIconTeep = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: Root.color_button,
    color: Root.white,
    ...Root.hoverReverse,
    height: '60%',
}))
export const MuiSearchContainerFather = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',
    width: '70%',
    height: '100%',
});
export const MuiSearchContainer = styled(Stack)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: '4px',
    backgroundColor: Root.color_default,
    color: Root.color_button,
    gap: '4px',
    width: '50%',
    height: '40px',
});

export const SearchIconWrapper = styled(Stack)({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    pointerEvents: 'none',
    marginLeft: '12px'
});

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    color: Root.color_button,
    marginRight: '12px'
}));
export const MuiSearch = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: '12px',
    width: '100%',
    height: '100%',
    fontFamily: Root.fontFamilyMonospace,
}));
export const MuiSearchIcon = styled(Search)(({ theme }) => ({}));
export const MuiInputNative = styled('input')(({ }) => ({
    paddingInline: '6px',
    outline: 'none',
    border: 'none',
    height: '75%',
    width: '100%',
    borderRadius: '4px',
    border: `1px solid ${Root.color_button_opacity}`,
    backgroundColor: Root.color_app_bar,
    color: Root.color_button,
    fontWeight: 'bold',
    fontFamily: Root.fontFamilyMonospace
}))
export const MuiSelectContainer = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '95%',
    gap: '12px',
}))
export const MuiSelect = styled(Select)(({ theme }) => ({
    '&&': {
        '&.MuiOutlinedInput-root': {
            '&:hover fieldset': {
                border: 'none', // Remover a borda ao passar o mouse
            },
            '&.Mui-focused fieldset': {
                border: 'none', // Remover a borda quando estiver focado
            },

        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '8px',
        minWidth: 'auto',
        height: '40px',
        padding: '8px',
        backgroundColor: Root.color_default,
        color: Root.color_button,
        borderRadius: '4px',
        ...Root.hover
    }
}))
export const MuiSelectItem = styled(Stack)(({ }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    width: '15%',
    height: '100%',
    fontFamily: Root.fontFamilyMonospace,
}))
export const MuiSelectItemOptions = styled(Box)(({ }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '10px',
    minWidth: '50%',
    height: '100%',
    marginRight: '10px'
}))
export const MuiSelectItemOption = styled(Box)(({ }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    height: '50%',
    padding: '10px',
    borderRadius: '4px',
    border: `1px solid ${Root.color_app_bar}`,
    ...Root.hoverReverse
}))