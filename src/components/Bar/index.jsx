import { MenuItem, Typography } from "@mui/material";
import { MuiInputNative, MuiSearch, MuiSearchContainer, MuiSearchContainerFather, MuiSearchIcon, MuiSearchIconTeep, MuiSelect, MuiSelectContainer, MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth, StyledInputBase } from "../../pages/Stock/styles";
import { Add, FileDownload } from "@mui/icons-material";
import { Root } from "../../styles/Root/root_styles";
export const NavBarTop = ({
    saveExcel,
    setSaveExcel,
    NewItem,
    setNewItem
}) => {
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
    return (
        <>
            <MuiStockNavBar>
                <Typography sx={{ fontWeight: 'bold' }}>Products</Typography>
                <MuiStockNavBarRigth>
                    {buttons.map((botton, index) => {
                        const isContained = botton.variant === 'contained';
                        const isImportExcel = botton.onclick === 'excel';
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
        </>
    )
}