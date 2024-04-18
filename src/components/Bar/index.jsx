import { MenuItem, Typography } from "@mui/material";
import { MuiSearch, MuiSearchContainer, MuiSelect, MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth, StyledInputBase } from "../../pages/Stock/styles";
import { Add, Delete, SaveAlt, Search, Upgrade } from "@mui/icons-material";
import { Root } from "../../styles/Root/root_styles";
import { StylesBar } from "./styles";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth_context";
export const NavBarTop = ({
    saveExcel,
    setSaveExcel,
    NewItem,
    setNewItem,
}) => {
    const {
        select,
        setSelect,
        search,
        setSearch
    } = useContext(AuthContext)
    const location = useLocation()
    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };
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
            label: 'Baixar',
            onclick: 'Export',
            variant: null,
            icon: <Upgrade />

        }, {
            label: 'Importar',
            onclick: null,
            variant: null,
            icon: <SaveAlt />

        }, {
            label: 'Deletar',
            onclick: 'Delete',
            variant: 'contained',
            icon: <Delete />
        },
    ]
    const filtres = [
        { value: '', label: 'Sem filtro' },
        { value: 'nome', label: 'Nome', }, { value: 'categoria', label: 'Categoria', },
        { value: 'dataChegada', label: 'Data de Chegada', }, { value: 'dataValidade', label: 'Data de Validade', },
        { value: 'id', label: 'Id', }, { value: 'author', label: 'Usuário', }, { value: 'donor', label: 'Doador', },
    ]
    const filtro = filtres.find(item => item.value === select);
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
                        , color: Root.gray,
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
                        value={select}
                        onChange={handleSelectChange}
                        defaultValue={!select ? "default" : undefined}
                    >
                        <MenuItem value="default" disabled>Filtres</MenuItem>
                        {filtres.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </MuiSelect>
                    <MuiSearchContainer>
                        <Search sx={{
                            ml: '12px'
                        }} />
                        <StyledInputBase
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={select ?
                                `Filtrar por ${filtro.label}` : 'Filtrar por nome'}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </MuiSearchContainer>
                    <MuiStockBotton
                        onClick={() => setNewItem(!NewItem)} sx={{
                            backgroundColor: Root.color_button,
                            color: Root.color_default,
                            ...Root.hoverReverse,
                        }}>
                        <Add /> Novo produto
                    </MuiStockBotton>
                </MuiSearch>
            </StylesBar.conatiner>
        )
    }
    return false;
}