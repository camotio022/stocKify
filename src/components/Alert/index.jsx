import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Root } from '../../styles/Root/root_styles';

export const SimpleAlert = ({ quantidade, item }) => {
    return (
        <Alert sx={{
            border: `1px solid ${Root.color_button_opacity}`,
            height: '50-px',
            width: '90%',
            mb: 1
        }} icon={<CheckIcon fontSize="inherit" />} severity="success">
            {quantidade} {quantidade > 1 ? 'items' : 'item'} de {item} {quantidade > 1 ? 'foram adicionados' : 'foi adicionado'} no estoque com sucesso.
        </Alert>
    );
}