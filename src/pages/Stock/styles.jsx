import { Box, InputBase, Select, Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { Search } from "@mui/icons-material";

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
    height: '100%',

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
export const MuiStockBotton = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '8px',
    minWidth: 'auto',
    height: '24px',
    padding: '8px',
    backgroundColor: Root.color_default,
    color: Root.color_button,
    borderRadius: '4px',
    ...Root.hover
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
    'border': `1px solid ${Root.color_button_opacity}`,
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
            '& fieldset': {
                border: 'none', // Remover a borda
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