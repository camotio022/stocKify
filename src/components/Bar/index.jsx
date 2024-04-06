import { MenuItem, Stack, Typography } from "@mui/material";
import { MuiInputNative, MuiSearch, MuiSearchContainer, MuiSearchContainerFather, MuiSearchIcon, MuiSearchIconTeep, MuiSelect, MuiSelectContainer, MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth, SearchIconWrapper, StyledInputBase } from "../../pages/Stock/styles";
import { Add, Delete, FileDownload, SaveAlt, Search, Upgrade } from "@mui/icons-material";
import { Root } from "../../styles/Root/root_styles";
import { StylesBar } from "./styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export const NavBarTop = ({
    saveExcel,
    setSaveExcel,
    NewItem,
    setNewItem
}) => {
    const location = useLocation()
    const [canShow, setCanShow] = useState(false)
    const isRoutesNow = [
        {
            label: 'Todos os items do estoque',
            route: '/', canBar: true
        },
        {
            label: 'Todas entradas do estoque',
            route: '/entradas',
            canBar: true
        }
        ,
        {
            label: 'Todas as saídas do estoque',
            route: '/exits',
            canBar: true
        },

    ]
    const routes = isRoutesNow.filter(route => {
        return location.pathname === route.route
    })
    const buttons = [
        {
            label: 'Export',
            onclick: 'Export',
            variant: null,
            icon: <Upgrade />

        }, {
            label: 'Import',
            onclick: null,
            variant: null,
            icon: <SaveAlt />

        }, {
            label: 'Delete',
            onclick: 'Delete',
            variant: 'contained',
            icon: <Delete />
        },
    ]
    const items = [
        { value: 'validade', label: 'Data de validade' },
        { value: 'purchaseDate', label: 'Data de compra' },
        { value: 'donationDate', label: 'Data de Doação' },
        { value: 'itemType', label: 'Tipo de item' },
        { value: 'amount', label: 'Quantidade' },
        { value: 'users', label: 'Users' }
    ];
    const clicks = (e) => {
        if (e.onclick === 'Export') {
            setSaveExcel(!saveExcel)
        }
    }
    if (routes.some((i) => i.route === location.pathname && i.canBar)) {
        return (
            <StylesBar.conatiner>
                <MuiStockNavBar>
                    <Typography sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
,                        color: Root.gray,
                        fontFamily: Root.fontFamilyMonospace
                    }}>{routes.map((r) => r.label)}</Typography>
                    <MuiStockNavBarRigth>
                        {buttons.map((botton, index) => {
                            const isContained = botton.variant === 'contained';
                            return (
                                <MuiStockBotton
                                    sx={isContained && {
                                        backgroundColor: Root.red,
                                        color: Root.white,
                                        ...Root.hoverReverse,

                                    }}
                                    key={index}
                                    variant={botton.variant}
                                    onClick={() => clicks(botton)}
                                >
                                    {botton.icon}
                                    {botton.label}
                                </MuiStockBotton>
                            )
                        })}
                    </MuiStockNavBarRigth>
                </MuiStockNavBar>
                <MuiSearch>
                    <MuiSelect
                        size="small"
                        labelId="outlined-select-currency-label"
                        id="outlined-select-currency"
                        defaultValue="default"
                    >
                        <MenuItem value="default" disabled>Filtres</MenuItem>
                        {items.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </MuiSelect>
                    <MuiSearchContainer>
                        <Search sx={{
                            ml: '12px'
                        }} />
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </MuiSearchContainer>
                    <MuiStockBotton
                        onClick={() => setNewItem(!NewItem)} sx={{
                            backgroundColor: Root.color_button,
                            color: Root.color_default,
                            ...Root.hoverReverse,
                        }}>
                        <Add /> Add New
                    </MuiStockBotton>
                </MuiSearch>
            </StylesBar.conatiner>
        )
    }
    return false;
}