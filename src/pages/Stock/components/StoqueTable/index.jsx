import { Checkbox, TableContainer } from '@mui/material';
import { useState, useRef } from 'react';

import { Root } from '../../../../styles/Root/root_styles';
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from './styles';
import { ArrowDropDown, More, MoreHoriz } from '@mui/icons-material';
import { FormatRelativeTime } from '../../../../components/dateCalcs';
import { Options } from '../../../../components/Options';

export const EstoqueTable = ({
    selectedItems,
    setSelectedItems,
    stock,

}) => {
    const [options, setOptions] = useState('')
    const [focus, setFocus] = useState(null)
    const tableRef = useRef(null);
    const headerInfos = [
        'Categoria',
        'Nome do alimento',
        'Doador/Valor',
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
    return (
        <TableContainer sx={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            backgroundColor: Root.color_default,
            borderRadius: '4px',
            ...Root.scrollBar,
            color: Root.color_button,
        }} ref={tableRef}>
            {options && <Options
                optionItem={options}
                name={options.nome}
                setOptions={setOptions}
            />}
            <MuiHeaderTable>
                {headerInfos.map((header, index) => (
                    <MuiTableClhild sx={header === 'Opções' && {
                        fontWeight: 'bold',
                        width: '50%',
                    }} key={index}>{header}</MuiTableClhild>
                ))}
            </MuiHeaderTable>
            <MuiRowTable>
                {stock.map((item, index) => {
                    const { typeItem, price, donation, ...otherKeys } = item
                    return (
                        <MuiTableRow
                            index={index + 1}
                            onClick={() => focusItem(index)}
                            sx={selectedItems.includes(item.id) || (focus === index) ? {
                                border: `1px dashed ${Root.color_button}`,
                                backgroundColor: Root.color_button_opacity,
                                color: Root.color_button,
                                fontWeight: 'bold',
                                animation: 'dash 2s infinite'
                            } : null}
                            key={item.id}>

                            {Object.keys(item).map((key, i) => {
                                if ((key === 'author') ||
                                    (key === 'id') ||
                                    (key === 'typeItem')) {
                                    return null;
                                }
                                if (key === 'donation' || key === 'price') {
                                    if (item.typeItem === 'comprado' && key === 'price') {
                                        return (
                                            <MuiTableRowCell key={i}>
                                                R$ {item.price}
                                            </MuiTableRowCell>
                                        );
                                    }
                                    if (item.typeItem === 'doação' && key === 'donation') {
                                        return (
                                            <MuiTableRowCell key={i}>
                                                {item.donation}
                                            </MuiTableRowCell>
                                        );
                                    }
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
                                    alignItems: 'center',
                                    ...Root.hoverReverse
                                }}>
                                <MoreHoriz />
                            </MuiTableRowCell>
                        </MuiTableRow>
                    )
                })}
            </MuiRowTable>
        </TableContainer>
    );
};