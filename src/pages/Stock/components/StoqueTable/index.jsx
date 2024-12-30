import { Checkbox, CircularProgress, Stack, TableContainer, Typography } from '@mui/material';
import { useState, useRef, useContext } from 'react';

import { Root } from '../../../../styles/Root/root_styles';
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from './styles';
import { ArrowDropDown, More, MoreHoriz } from '@mui/icons-material';
import { FormatRelativeTime } from '../../../../components/dateCalcs';
import { Options } from '../../../../components/Options';
import { AuthContext } from '../../../../auth_context';

export const EstoqueTable = ({
    selectedItems,
    setSelectedItems,
    stock,

}) => {
    const { enablingDeleteButtom, setEnablingDeleteButtom } = useContext(AuthContext)
    const [options, setOptions] = useState('')
    const [focus, setFocus] = useState(null); // Índice do item focado
    const [disabledItems, setDisabledItems] = useState([]); // Lista de itens desabilitados
    const tableRef = useRef(null);
    const headerInfos = [
        'Categoria',
        'Nome do alimento',
        'Doador & Valor',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada',
        'Opções'
    ];
    const focusItem = (index, item) => {
        if (focus === index) {
            setEnablingDeleteButtom(false)
            setDisabledItems((prev) =>
                prev.includes(item.id)
                    ? prev.filter((id) => id !== item.id)
                    : [...prev, item.id]
            );
        } else {
            setEnablingDeleteButtom(true)
            setFocus(index);
        }
    }
    const handleOptions = (item) => {
        setOptions(item)
    }
    function isItemExpired(expiryDate) {
        const itemDate = new Date(expiryDate);
        const currentDate = new Date();
        return itemDate < currentDate;
    }
    return (
        <TableContainer sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            backgroundColor: Root.color_default,
            borderRadius: '4px',
            ...Root.scrollBar,
            color: Root.color_button,
        }} ref={tableRef}>
            {!stock &&
                <Stack sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    minWidth: '100%',
                    height: '100%',
                }}>
                    <Typography sx={{
                        color: Root.color_button,
                        fontWeight: 'bold',
                        fontFamily: Root.fontFamilyMonospace,
                    }}>
                        Loading data, please wait...
                    </Typography>
                    <CircularProgress sx={{
                        color: Root.color_button,
                    }} />
                </Stack>}
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
                    const { typeItem, price, donation, ...otherKeys } = item;
                    const isFocused = focus === index; // Verifica se o item está focado
                    const isDisabled = disabledItems.includes(item.id); // Verifica se o item está desabilitado
                    return (
                        <MuiTableRow
                            key={item.id}
                            index={index + 1}
                            onClick={() => focusItem(index, item)}
                            sx={
                                isDisabled
                                    ? { opacity: 0.5 } // Estilo para itens desabilitados
                                    : isFocused
                                        ? {
                                            border: `1px dashed ${Root.color_button}`,
                                            backgroundColor: Root.color_button_opacity,
                                            color: Root.color_button,
                                            fontWeight: 'bold',
                                            animation: 'dash 2s infinite',
                                        }
                                        : isItemExpired(item.dataValidade) ? {
                                            borderLeft: `4px solid ${Root.green}`,
                                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                        } : {}
                            }
                        >

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