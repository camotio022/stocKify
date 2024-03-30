import { MenuItem, Stack, Typography } from "@mui/material";
import { MuiInputNative, MuiSearch, MuiSearchContainer, MuiSearchContainerFather, MuiSearchIcon, MuiSearchIconTeep, MuiSelect, MuiSelectContainer, MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth, StyledInputBase } from "../../pages/Stock/styles";
import { Add, FileDownload } from "@mui/icons-material";
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
            label: 'Download',
            onclick: 'Download',
            variant: null,
            icon: <FileDownload />

        }, {
            label: 'Import Produts',
            onclick: null,
            variant: null,
            icon: null

        }, {
            label: 'New Produt',
            onclick: 'New_Produt',
            variant: 'contained',
            icon: <Add />
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
        if (e.onclick === 'Download') {
            setSaveExcel(!saveExcel)
        }
        if (e.onclick === 'New_Produt') {
            setNewItem(!NewItem)
        }
    }
    if (routes.some((i) => i.route === location.pathname && i.canBar)) {
        return (
            <StylesBar.conatiner>
                <MuiStockNavBar>
                    <Typography sx={{ fontWeight: 'bold' }}>{routes.map((r) => r.label)}</Typography>
                    <MuiStockNavBarRigth>
                        {buttons.map((botton, index) => {
                            const isContained = botton.variant === 'contained';
                            return (
                                <MuiStockBotton
                                    sx={isContained && {
                                        backgroundColor: Root.color_button,
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
                    <MuiSearchContainerFather>
                        <MuiSearchContainer>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </MuiSearchContainer>
                        <MuiSearchIconTeep >
                            <MuiSearchIcon fontSize="small" />
                        </MuiSearchIconTeep>
                    </MuiSearchContainerFather>
                    <MuiSelectContainer>
                        <MuiInputNative
                            size="small"
                            type="date"
                        ></MuiInputNative>

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
                    </MuiSelectContainer>
                </MuiSearch>
            </StylesBar.conatiner>
        )
    }
    return false;
}