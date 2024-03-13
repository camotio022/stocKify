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
import { ModalZindex } from "../../components/Modal";
import generateExcelFile from "../../saveExcel"
import { EstoqueTable } from './components/StoqueTable/index'
import { useState } from "react"
import { Root } from "../../styles/Root/root_styles";
import { DeleteOutline, InsertInvitation, ShoppingCartCheckout } from "@mui/icons-material";
import { NavBarTop } from "../../components/Bar";
import { NewItem } from "../NewItem";

export const Stock = () => {
    const [newItem, setNewItem] = useState(false)
    const [saveExcel, setSaveExcel] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    return (
        <MuiStock>
            {newItem &&
                <NewItem
                    newItem={newItem}
                    setNewItem={setNewItem}
                />
            }
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
                newItem={newItem}
                setNewItem={setNewItem}
                generateExcelFile={generateExcelFile}
                setSaveExcel={setSaveExcel}
                saveExcel={saveExcel}
            />

            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '85%',
                width: '100%',
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