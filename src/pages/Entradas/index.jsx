import { useRef, useState } from "react";
import { TagsExits } from "../ExitsItems/styles"
import { TableContainer } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
export const Entradas = () => {
    const tableRef = useRef(null);
    const [focus, setFocus] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const headerkeys = [
        'ID',
        'Nome',
        'Catégoria',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada',
        'Quem adicionou'
    ]
    return (
        <TagsExits.container>
            <TagsExits.containerTable sx={{
                mt: selectedItems.length > 0 ? '0px' : '17px',
            }}>
                <TableContainer sx={{
                    ...Root.scrollBar,
                    width: '100%',
                    boxSizing: 'border-box'
                }} ref={tableRef}>
                    <MuiHeaderTable>
                        {headerkeys.map((header, index) => (
                            <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                        ))}
                    </MuiHeaderTable>
                    <MuiRowTable>
                        {[].map((item, index) => (
                            <MuiTableRow
                                sx={selectedItems.includes(item.item) || (focus === index) ? selectSx : null}
                                key={index}>
                                {Object.entries(item).map(([key, value], i) => {
                                    if (key !== 'id') {
                                        return (
                                            <MuiTableRowCell key={i}>{
                                                key === 'quantidade' ? (item.quantidade > 1
                                                    ? `${item.quantidade} unidades`
                                                    : `${item.quantidade} unidade`)
                                                    : value
                                            }</MuiTableRowCell>
                                        );
                                    }
                                    return null;
                                })}
                            </MuiTableRow>
                        ))}
                    </MuiRowTable>
                </TableContainer>

            </TagsExits.containerTable>
        </TagsExits.container>
    )
}