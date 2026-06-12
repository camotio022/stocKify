import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import { MuiSearch, MuiSearchContainer, MuiSelect, MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth, StyledInputBase } from "../../pages/Stock/styles";
import { Add, AddRounded, Delete, SaveAlt, Search, Upgrade } from "@mui/icons-material";
import { Root } from "../../styles/Root/root_styles";
import { StylesBar } from "./styles";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth_context";
import { ButtonNeon } from "../../styles/Tags/styles";
export const NavBarTop = ({
    saveExcel,
    setSaveExcel,
    NewItem,
    setNewItem,
}) => {
    const {
        tenant,
        select,
        setSelect,
        search,
        setSearch,
        enablingDeleteButtom
    } = useContext(AuthContext)
    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;
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
            label: 'Saídas Registradas',
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
                        color: Root.white,
                    }}>
                        {routes.map((r) => r.label)}
                    </Typography>


                    <MuiStockNavBarRigth>
                        {buttons.map((botton, index) => {
                            const isContained = botton.variant === 'contained';
                            return (
                                <MuiStockBotton
                                    sx={isContained && {
                                        backgroundColor: Root.danger,
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
                    <ButtonNeon
                        onClick={() => setNewItem(!NewItem)}
                        sx={{
                            background: `linear-gradient(90deg, ${glowColor} 0%, ${accentColor} 100%)`,
                            '&:hover': {
                                filter: 'brightness(1.1)',
                                boxShadow: `0 0 20px ${glowColor}50`,
                                transform: 'translateY(-1px)'
                            },
                            '&:active': {
                                transform: 'translateY(0px)'
                            }
                        }}
                    >
                        <AddRounded sx={{ fontSize: '18px' }} />
                        Novo produto
                    </ButtonNeon>

                    {/* 🔍 CONTAINER DE FILTRO COMPATÍVEL COM O SEU FOCO NEON */}
                    <MuiSearchContainer
                        sx={{
                            '&:focus-within': {
                                borderColor: accentColor,
                                boxShadow: `0 0 12px ${accentColor}30`,
                                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                            }
                        }}
                    >
                        {/* 🧭 ÍCONE DE LUPA POSICIONADO ANTES (UX PADRÃO APPLE/STRIPE) */}
                        <Search
                            sx={{
                                color: accentColor,
                                fontSize: '18px',
                                transition: 'transform 0.2s',
                            }}
                        />

                        <StyledInputBase
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={select ? `Filtrar por ${filtro.label}...` : 'Filtrar por nome...'}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </MuiSearchContainer>
                </MuiSearch>
            </StylesBar.conatiner>
        )
    }
    return false;
}