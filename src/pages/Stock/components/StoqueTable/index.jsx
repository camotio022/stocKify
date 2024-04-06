import { Checkbox, TableContainer } from '@mui/material';
import { useState, useRef } from 'react';

import { Root } from '../../../../styles/Root/root_styles';
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from './styles';
import { ArrowDropDown, More, MoreHoriz } from '@mui/icons-material';
import { FormatRelativeTime } from '../../../../components/dateCalcs';
import { Options } from '../../../../components/Options';

export const EstoqueTable = ({
    selectedItems, setSelectedItems,
    stock,
}) => {
    const [options, setOptions] = useState('')
    const [focus, setFocus] = useState(null)
    const tableRef = useRef(null);
    const headerInfos = [
        'Id',
        'Categoria',
        'Nome do alimento',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada',
        'Opções'
    ];
    const focusItem = (index) => {
        setFocus(index)
    }
    const handleOptions = (item) => {
        setOptions(item)
    }
    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    return (
        <TableContainer sx={{
            ...Root.scrollBar,
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            backgroundColor: Root.color_default,
            borderRadius: '4px',
            paddingInline: '4px',
            color: Root.color_button,
        }} ref={tableRef}>
            {options && <Options
                optionItem={options}
                name={options.nome}
                setOptions={setOptions}
            />}
            <MuiHeaderTable>
                <MuiTableClhild sx={{
                    width: '50%',
                }}>
                    <Checkbox
                        sx={{
                            color: Root.color_button
                        }}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newSelectedItems = isChecked ? estoque.map(item => item.id) : [];
                            setSelectedItems(newSelectedItems);
                        }}
                    />
                </MuiTableClhild>
                {headerInfos.map((header, index) => (
                    <MuiTableClhild sx={header === 'Opções' && {
                        fontWeight: 'bold',
                        width: '50%',
                    }} key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                ))}
            </MuiHeaderTable>
            <MuiRowTable>
                {stock.map((item, index) => (
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
                        }}>
                            <Checkbox
                                sx={{
                                    color: Root.color_button
                                }}
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                        </MuiTableRowCell>
                        {Object.keys(item).map((key, i) => {
                            if (key === 'author') {
                                return null;
                            }
                            if (key === 'dataChegada') {
                                return (
                                    <MuiTableRowCell key={i}>
                                        <FormatRelativeTime dateTimeString={item.dataChegada} />
                                    </MuiTableRowCell>
                                );
                            }
                            return (
                                <MuiTableRowCell key={i}>
                                    {item[key]} {key === 'quantidade' && 'unidades'}
                                </MuiTableRowCell>
                            );
                        })}
                        <MuiTableRowCell
                            onClick={(e) => {
                                handleOptions(item)
                            }}
                            sx={{
                                width: '50%',
                                ...Root.hoverReverse
                            }}>
                            <MoreHoriz />
                        </MuiTableRowCell>
                    </MuiTableRow>
                ))}
            </MuiRowTable>
        </TableContainer>
    );
};