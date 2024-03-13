import { Checkbox, TableContainer } from '@mui/material';
import { useState, useRef } from 'react';
import { estoque } from '../mock';
import { Root } from '../../../../styles/Root/root_styles';
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from './styles';
import { ArrowDropDown } from '@mui/icons-material';

export const EstoqueTable = ({
    selectedItems, setSelectedItems
}) => {

    const [focus, setFocus] = useState(null)
    const tableRef = useRef(null);
    const headerInfos = [
        'ID',
        'Nome',
        'Tipo',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada'
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
    console.log(selectedItems)

    return (
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
                            const newSelectedItems = isChecked ? estoque.map(item => item.id) : [];
                            setSelectedItems(newSelectedItems);
                        }}
                    />
                </MuiTableClhild>
                {headerInfos.map((header, index) => (
                    <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                ))}
            </MuiHeaderTable>
            <MuiRowTable>
                {estoque.map((item, index) => (
                    <MuiTableRow
                        onClick={() => focusItem(index)}
                        sx={selectedItems.includes(item.id) || (focus === index) ? {
                            border: `1px dashed ${Root.color_button}`,
                            backgroundColor: Root.color_button_opacity,
                            color: Root.color_button,
                            fontWeight: 'bold',
                            fontFamily: Root.fontFamilyMonospace,
                            animation: 'dash 2s infinite'
                        } : null}
                        key={item.id}>
                        <MuiTableRowCell sx={{
                            width: '50%',
                            borderLeft: `1px solid ${Root.color_button_opacity}`
                        }}>
                            <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                        </MuiTableRowCell>
                        {Object.values(item).map((value, i) => (
                            <MuiTableRowCell key={i}>{value}</MuiTableRowCell>
                        ))}
                    </MuiTableRow>
                ))}
            </MuiRowTable>
        </TableContainer>
    );
};