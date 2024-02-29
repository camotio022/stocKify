import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TableContainer } from '@mui/material';
import { useState, useRef } from 'react';
import { estoque } from '../mock';
import { Root } from '../../../../styles/Root/root_styles';

export const EstoqueTable = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const tableRef = useRef(null);
    const headerInfos = [
        'ID',
        'Nome',
        'Tipo',
        'Quantidade',
        'Valor',
        'Data de Validade',
        'Data de Chegada'
    ];

    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <TableContainer sx={{ ...Root.scrollBar }} ref={tableRef}>
            <Table sx={{ position: 'relative' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const newSelectedItems = isChecked ? estoque.map(item => item.id) : [];
                                    setSelectedItems(newSelectedItems);
                                }}
                            />
                        </TableCell>
                        {headerInfos.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {estoque.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            </TableCell>
                            <TableCell>#{item.id}</TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.tipo}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.dataValidade}</TableCell>
                            <TableCell>{item.dataChegada}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EstoqueTable;
