import { Stack, Input, MenuItem, FormControl, Select, InputLabel, TextField, Box } from "@mui/material"
import {
    MuiInputNative,
    MuiSearch,
    MuiSearchContainer,
    MuiSearchContainerFather,
    MuiSearchIcon,
    MuiSearchIconTeep,
    MuiSelect,
    MuiSelectContainer,
    MuiSelectItem,
    MuiSelectItemOption,
    MuiSelectItemOptions,
    MuiStock, MuiStockModalTop, SearchIconWrapper, StyledInputBase,
} from "./styles"
import { NavBarTop } from "./components/Bar"
import { ModalZindex } from "../../components/Modal";
import generateExcelFile from "../../saveExcel"
import { EstoqueTable } from './components/StoqueTable/index'
import { useState } from "react"
import { Root } from "../../styles/Root/root_styles";
import { DeleteOutline, InsertInvitation, ShoppingCartCheckout } from "@mui/icons-material";
import { TableScroll } from "./components/TableScroll";
const items = [
    { value: 'validade', label: 'Data de validade' },
    { value: 'purchaseDate', label: 'Data de compra' },
    { value: 'donationDate', label: 'Data de Doação' },
    { value: 'itemType', label: 'Tipo de item' },
    { value: 'amount', label: 'Quantidade' },
    { value: 'users', label: 'Users' }
];
export const Stock = () => {
    const [saveExcel, setSaveExcel] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    return (
        <MuiStock>
            {selectedItems.length > 0 && <MuiStockModalTop>
                <MuiSelectItem>
                    {selectedItems.length}
                </MuiSelectItem>
                <MuiSelectItemOptions>
                    {[
                        {
                            icon: <InsertInvitation />,
                            label: 'About expire',
                        },
                        {
                            icon: <ShoppingCartCheckout />,
                            label: 'Remove items',
                        },
                        {
                            icon: <DeleteOutline />,
                            label: 'Delete itens',
                        },
                    ].map((item, index) => {
                        return (
                            <MuiSelectItemOption key={index}>
                                {item.icon} {item.label}
                            </MuiSelectItemOption>
                        )
                    })}
                </MuiSelectItemOptions>
            </MuiStockModalTop>}
            {saveExcel && <ModalZindex
                setSaveExcel={setSaveExcel}
                saveExcel={saveExcel}
            />}
            <NavBarTop
                generateExcelFile={generateExcelFile}
                setSaveExcel={setSaveExcel}
                saveExcel={saveExcel}
            />
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
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '85%',
                width: '95%',
                mt: selectedItems.length > 0 ? '0px' : '17px',
                ...Root.scrollBar
            }}>
                <EstoqueTable
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />
            </Stack>
        </MuiStock>
    )
}