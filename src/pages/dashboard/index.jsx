import React, { useState } from 'react';
import {
    Box, Typography, TextField, Card, CardContent, Chip, IconButton, 
    Stack, Grid, Button, InputAdornment
} from '@mui/material';
import {
    SearchOutlined, MoreVertOutlined, Inventory2Outlined, HistoryOutlined, 
    CheckCircle, Add, AutoAwesome, TrendingUp, WarningAmber, 
    FilePresent, ArrowDownward, ArrowUpward, CropFree
} from '@mui/icons-material';
import { Root } from '../../styles/Root/root_styles';

export const EstoqueContent = ({ produtos = [], tenant, setNewItem }) => {
    const [search, setSearch] = useState('');

    return (
        <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            height: '100vh', // Trava na altura da tela
            overflowY: 'auto', 
            color: '#fff',
      
            p: { xs: 2, md: 4 }, 
            gap: 4,
            boxSizing: 'border-box',
            // 🔥 SCROLLBAR INVISÍVEL/MODERNA
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' },
            '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.2)' }
        }}>
            
            {/* 🔝 CABEÇALHO */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Stack>
                    <Typography sx={{ fontSize: { xs: '18px', md: '22px' }, fontWeight: '800', fontFamily: 'Urbanist, sans-serif' }}>
                        Visão Geral do Inventário
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        Painel de Controle • Sincronizado agora
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px rgba(16,185,129,0.8)', animation: 'pulse 2s infinite' }} />
                    </Typography>
                </Stack>

                <Button 
                    variant="contained" 
                    startIcon={<AutoAwesome />} 
                    sx={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', textTransform: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)' }}
                >
                    Assistente IA
                </Button>
            </Box>

      

            {/* 📊 ESTRUTURA GRID: ESQUERDA (RESUMOS) | DIREITA (AÇÕES RÁPIDAS) */}
            <Grid container spacing={3}>
                
                {/* COLUNA ESQUERDA */}
                <Grid item xs={12} lg={9} component={Stack} gap={3}>
                    
                    {/* 4 Cards de Resumo */}
                    <Grid container spacing={2}>
                        {[
                            { title: 'Produtos', val: '245', sub: 'No catálogo', color: 'blue', icon: <Inventory2Outlined sx={{ fontSize: 18 }}/> },
                            { title: 'Em estoque', val: '3.421', sub: 'Disponíveis', color: 'purple', icon: <HistoryOutlined sx={{ fontSize: 18 }}/> },
                            { title: 'Entradas hoje', val: '32', sub: '+12% que ontem', color: 'green', icon: <TrendingUp sx={{ fontSize: 18 }}/> },
                            { title: 'Atenção', val: '4', sub: 'Estoque crítico', color: 'orange', icon: <WarningAmber sx={{ fontSize: 18 }}/>, warn: true }
                        ].map((c, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <Box sx={{ p: 2, backgroundColor: c.warn ? 'rgba(255, 122, 27, 0.3)' : Root.columnTable, border: '1px solid', borderColor: c.warn ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255,255,255,0.05)', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Box sx={{ width: 28, height: 28, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, backgroundColor: c.color === 'blue' ? 'rgba(37,99,235,0.2)' : c.color === 'purple' ? 'rgba(124,58,237,0.2)' : c.color === 'green' ? 'rgba(16,185,129,0.2)' : 'rgba(249,115,22,0.2)', color: c.warn ? '#F97316' : '#00D2FF' }}>
                                        {c.icon}
                                    </Box>
                                    <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', whiteSpace: 'nowrap' }}>{c.title}</Typography>
                                    <Typography sx={{ fontSize: { xs: '20px', md: '24px' }, fontWeight: '800', my: 0.2, color: c.warn ? '#F97316' : '#fff', fontFamily: 'Urbanist, sans-serif' }}>{c.val}</Typography>
                                    <Typography sx={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{c.sub}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Card do Gráfico Corrigido (Sem sobrepor texto) */}
                    <Card sx={{ background: Root.columnTable, border: '1px solid rgba(255, 255, 255, 0.45)', borderRadius: '16px', color: '#fff', boxShadow: 'none' }}>
                        <CardContent sx={{ p: '24px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <Stack gap={0.5}>
                                <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Valor total patrimonial do estoque</Typography>
                                <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                                    <Typography sx={{ fontSize: { xs: '28px', md: '36px' }, fontWeight: '900', fontFamily: 'Urbanist, sans-serif' }}>R$ 25.300,00</Typography>
                                    <Chip label="↑ 12,5% vs semana" size="small" sx={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontWeight: '700' }} />
                                </Box>
                            </Stack>
                            
                            <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} gap={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                {/* SVG responsivo */}
                                <svg width="100%" maxWidth="240" height="70" viewBox="0 0 240 70" style={{ minWidth: '150px' }}>
                                    <path d="M0 30 Q 40 10, 80 25 T 160 15 T 240 5" fill="none" stroke="#06B6D4" strokeWidth="3" />
                                    <circle cx="240" cy="5" r="4" fill="#06B6D4" />
                                </svg>
                                <Button variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', textTransform: 'none', borderRadius: '10px', fontSize: '12px', '&:hover': { borderColor: '#fff' } }}>
                                    Ver insights detalhados
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* COLUNA DIREITA (Ações Rápidas) */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{ p: 3, backgroundColor: Root.columnTable, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', height: '100%', boxSizing: 'border-box' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', mb: 2, letterSpacing: '0.5px' }}>⚡ FLUXOS RÁPIDOS</Typography>
                        <Stack gap={1.5}>
                            {[
                                { name: 'Entrada de estoque', icon: <ArrowDownward sx={{ fontSize: 18, color: '#06B6D4' }} />, bg: 'rgba(6,182,212,0.1)' },
                                { name: 'Saída/Baixa', icon: <ArrowUpward sx={{ fontSize: 18, color: '#F97316' }} />, bg: 'rgba(249,115,22,0.1)' },
                                { name: 'Importar Excel', icon: <FilePresent sx={{ fontSize: 18, color: '#10B981' }} />, bg: 'rgba(16,185,129,0.1)' },
                                { name: 'Escanear lote', icon: <CropFree sx={{ fontSize: 18, color: '#6366F1' }} />, bg: 'rgba(99,102,241,0.1)' },
                            ].map((act, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.02)', transition: '0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' } }}>
                                    <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: act.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{act.icon}</Box>
                                    <Typography sx={{ fontSize: '13px', fontWeight: '600', color: '#ccc' }}>{act.name}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
};