import { InputBase, Stack, styled } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { Search } from "@mui/icons-material";

export const MuiStock = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '98%',
    height: '98%',
    fontFamily: Root.fontFamilyMonospace,
    boxShadow: Root.boxS,
}))
export const MuiStockNavBar = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
    height: '7%',
    borderBottom: `1px solid ${Root.color_button_opacity}`
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
    height: '38px',
    border: `1px solid ${Root.color_button}`,
    backgroundColor: Root.color_app_bar,
    color: Root.color_button,
    fontWeight: 'bold',
    borderRadius: '4px',
    ...Root.hover
}))
export const MuiSearchContainer = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    backgroundColor: Root.color_button_opacity,
    gap: '4px',
    ...Root.hover,
    marginLeft: 0,
    width: '35%',
    height: '80%'
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
    color: Root.white
}));
export const MuiSearch = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
    height: '6vh',
    fontFamily: Root.fontFamilyMonospace,
    borderBottom: `1px solid ${Root.color_button_opacity}`
}));
export const MuiSearchIcon = styled(Search)(({ theme }) => ({}));