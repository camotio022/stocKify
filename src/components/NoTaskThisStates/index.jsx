import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Root } from '../../styles/Root/root_styles';
import { InboxOutlined, LoginOutlined, LogoutOutlined } from '@mui/icons-material';
const emptyStateConfig = {
    estoque: {
        Icon: InboxOutlined,
        titulo: "Nenhum item encontrado",
        descricao: "Este workspace está pronto. Comece registrando o seu primeiro produto ou insumo acima."
    },
    entradas: {
        Icon: LoginOutlined,
        titulo: "Sem histórico de entradas",
        descricao: "Nenhum lote ou mercadoria foi injetada neste tenant até o momento."
    },
    saidas: {
        Icon: LogoutOutlined,
        titulo: "Sem histórico de saídas",
        descricao: "Nenhuma movimentação de baixa, consumo ou desperdício foi registrada ainda."
    }
};
export const NoTasksFromThisState = ({ onAddClick, route }) => {
    const currentConfig = emptyStateConfig[route] || emptyStateConfig.estoque;
    const { Icon, titulo, descricao } = currentConfig;
return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '400px',
                padding: '40px',
                boxSizing: 'border-box',
            }}
        >
            {/* 📦 2. ÍCONE GLOW NEON AUTOMATIZADO */}
            <Icon 
                sx={{ 
                    fontSize: 80, 
                    color: Root.white, 
                    filter: `drop-shadow(0px 0px 12px ${Root.cyan}40)`, // Seu brilho ciano de elite
                    marginBottom: '24px'
                }} 
            />

            {/* 💬 3. TEXTOS DINÂMICOS */}
            <Typography
                variant="h6"
                sx={{
                    fontFamily: Root.fontFamilySansSerif,
                    fontWeight: 700,
                    color: '#F8FAFC',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    fontSize: '16px'
                }}
            >
                {titulo}
            </Typography>

            <Typography
                sx={{
                    fontFamily: Root.fontFamilySansSerif,
                    fontWeight: 500,
                    color: '#F8FAFC',
                    textAlign: 'center',
                    maxWidth: '320px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                }}
            >
                {descricao}
            </Typography>
        </Box>
    );
};