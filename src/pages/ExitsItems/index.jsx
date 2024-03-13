import { useRef, useState } from "react";
import { NavBarTop } from "../../components/Bar"
import { Root } from "../../styles/Root/root_styles";
import { TagsExits } from "./styles"
import { Checkbox, TableContainer } from "@mui/material";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
import { saidas } from "./saidas";

export const ExitsItems = ({

}) => {
    const tableRef = useRef(null);
    const [focus, setFocus] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const headerInfos = [
        'Item',
        'Quantidade Retirada',
        'Validade do Pacote',
        'Data de Retirada',
        'Quem Tirou'
    ];
    const focusItem = (index) => {
        setFocus(index)
    }
    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    return (
        <TagsExits.container>
            <NavBarTop />
            <TagsExits.containerTable sx={{
                mt: selectedItems.length > 0 ? '0px' : '17px',
            }}>
                <TableContainer sx={{
                    ...Root.scrollBar,
                    width: '100%',
                    boxSizing: 'border-box'
                }} ref={tableRef}>
                    <MuiHeaderTable>
                        <MuiTableClhild sx={{
                            width: '50%',

                        }}>
                            <Checkbox
                                sx={{
                                    color: Root.color_default
                                }}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const newSelectedItems = isChecked ? saidas.map(item => item.item) : [];
                                    setSelectedItems(newSelectedItems);
                                }}
                            />
                        </MuiTableClhild>
                        {headerInfos.map((header, index) => (
                            <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                        ))}
                    </MuiHeaderTable>
                    <MuiRowTable>
                        {saidas.map((item, index) => (
                            <MuiTableRow
                                onClick={() => focusItem(index)}
                                sx={selectedItems.includes(item.item) || (focus === index) ? {
                                    border: `1px dashed ${Root.color_button}`,
                                    backgroundColor: Root.color_button_opacity,
                                    color: Root.color_button,
                                    fontWeight: 'bold',
                                    fontFamily: Root.fontFamilyMonospace,
                                    animation: 'dash 2s infinite'
                                } : null}
                                key={index}>
                                <MuiTableRowCell sx={{
                                    width: '50%',
                                    borderLeft: `1px solid ${Root.color_button_opacity}`
                                }}>
                                    <Checkbox
                                        checked={selectedItems.includes(item.item)}
                                        onChange={() => handleCheckboxChange(item.item)}
                                    />
                                </MuiTableRowCell>
                                {Object.values(item).map((value, i) => (
                                    <MuiTableRowCell key={i}>{value}</MuiTableRowCell>
                                ))}
                            </MuiTableRow>
                        ))}
                    </MuiRowTable>
                </TableContainer>
            </TagsExits.containerTable>
        </TagsExits.container>
    )
}