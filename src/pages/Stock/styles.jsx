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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '7%',
}))
export const MuiStockNavBarRigth = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
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
    gap: 3,
    minWidth: '150px',
    height: 'auto',
    border: `1px solid ${Root.color_button}`,
    backgroundColor: Root.color_app_bar,
    color: Root.color_button,
    fontWeight: 500,
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
export const MuiSearchContainer = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    backgroundColor: Root.color_button,
    color: Root.color_default,
    gap: '4px',
    marginLeft: 0,
    width: '35%',
    height: '80%',

});

export const SearchIconWrapper = styled('div')({
    padding: '0 8px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    padding: '8px 8px 8px 32px',
    width: '100%',
    color: Root.color_default,
}));
export const MuiSearch = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '6vh',
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
export const MuiSelect = styled(Select)(({ }) => ({
    paddingInline: '6px',
    outline: 'none',
    border: 'none',
    height: '75%',
    width: '100%',
    color: Root.color_button,
    fontWeight: 'bold',
    fontFamily: Root.fontFamilyMonospace
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