import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
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
        setSearch,
        enablingDeleteButtom
    } = useContext(AuthContext)
    const location = useLocation()
    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };
    const isRoutesNow = [
        {
            label: 'Inventário Consolidado',
            route: '/', canBar: true
        },
        {
            label: 'Fluxo de Entradas',
            route: '/entradas',
            canBar: true
        }
        ,
        {
            label: 'Fluxo de Saídas',
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
                        fontWeight: 800,
                        fontFamily: Root.fontFamilySansSerif,
                        letterSpacing: '0.15em',
                        background: `linear-gradient(90deg, ${Root.color_button}, ${Root.color_button_secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: `drop-shadow(0px 0px 5px rgba(147, 45, 210, 0.3))`,
                    }}>
                        {routes.map((r) => r.label)}
                    </Typography>
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
                                    disabled={isContained ? !enablingDeleteButtom : false}
                                >
                                    {botton.icon}
                                    {botton.label}
                                </MuiStockBotton>
                            )
                        })}
                    </MuiStockNavBarRigth>
                </MuiStockNavBar>
                <MuiSearch>
                    <FormControl style={{ maxWidth: '100px' }}>
                        <InputLabel>Filtros</InputLabel>
                        <MuiSelect
                            size="small"
                            labelId="outlined-select-currency-label"
                            id="outlined-select-currency"
                            value={select}
                            onChange={handleSelectChange}
                        >
                            {filtres.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </MuiSelect>
                    </FormControl>
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
                            backgroundColor: Root.green,
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