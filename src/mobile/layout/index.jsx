import React, { Fragment, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    Chip,
    IconButton,
    InputAdornment,
    Stack,
    Grid,
    Badge,
    Avatar
} from '@mui/material';
import {
    SearchOutlined,
    MoreVertOutlined,
    Inventory2Outlined,
    LoginOutlined,
    LogoutOutlined,
    HistoryOutlined,
    Menu as MenuIcon,
    NotificationsOutlined,
    KeyboardArrowDown,
    GridViewOutlined,
    CheckCircle,
    Add,
    Close,
    AutoAwesome,
    ChevronRight,
    TrendingUp,
    WarningAmber,
    FilePresent,
    ArrowDownward,
    ArrowUpward,
    CropFree
} from '@mui/icons-material';
import { LayoutMobile } from "../styles/layout";
import { useLocation, Link } from 'react-router-dom';

const MobileNavLink = ({ item, location }) => {
    const isPathActive = location.pathname === item.link;
    return (
        <Box 
            component={Link}
            to={item.link}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                gap: 0.5,
                color: isPathActive ? '#17A2B8' : 'rgba(255, 255, 255, 0.4)',
                height: '100%',
                px: 1
            }}
        >
            <Stack sx={{ fontSize: '22px' }}>{item.icon}</Stack>
            <Typography variant="caption" sx={{ fontSize: '10px', fontFamily: 'Urbanist, sans-serif' }}>{item.name}</Typography>
        </Box>
    );
};

export const EstoqueMobile = ({ produtos = [], tenant, setNewItem }) => {
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [fabOpen, setFabOpen] = useState(false); // Mudei para false por padrão para não cobrir a tela de início

    const paths = [
        { name: 'Estoque', link: '/', icon: <Inventory2Outlined /> },
        { name: 'Entradas', link: '/entradas', icon: <LoginOutlined /> },
        { name: 'Saídas', link: '/exits', icon: <LogoutOutlined /> },
        { name: 'Relatórios', link: '/reports', icon: <HistoryOutlined /> },
        { name: 'Mais', link: '/more', icon: <GridViewOutlined /> },
    ];

    const produtosFiltrados = produtos.filter(prod =>
        prod.nome?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ width: '100vw', height: '100vh', color: '#ffffff', display: 'flex', flexDirection: 'column', backgroundColor: '#04020d', overflow: 'hidden', position: 'relative' }}>
            
            {/* 🔝 1. TOPBAR / CABEÇALHO FIXO */}
            <LayoutMobile._app_bar_top>
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', p: '2px' }}>
                        <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#070514', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '14px' }}>T</Box>
                    </Box>
                    <Stack gap={0.2}>
                        <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 0.5 }}>👋 Boa noite, Timóteo</Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>Glow Fashion</Typography>
                            <KeyboardArrowDown sx={{ color: '#fff', fontSize: 16 }} />
                        </Box>
                        <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                            Última sincronização: agora 
                            <Box className="pulse-dot" sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
                        </Typography>
                    </Stack>
                </Box>
                
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Badge badgeContent={8} sx={{ '& .MuiBadge-badge': { backgroundColor: '#6366F1', color: '#fff', fontSize: '10px', height: 16, minWidth: 16 } }}>
                        <NotificationsOutlined sx={{ color: '#fff', fontSize: 24 }} />
                    </Badge>
           <Button 
                               variant="contained" 
                               startIcon={<AutoAwesome />} 
                               sx={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', textTransform: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)' }}
                           >
                               Assistente IA
                           </Button>
                </Box>
            </LayoutMobile._app_bar_top>

            {/* 📜 ÁREA DE SCROLL INDEPENDENTE */}
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pt: '96px', pb: '94px', display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%', boxSizing: 'border-box' }}>
                
                {/* 🔍 INPUT DE BUSCA ARREDONDADO */}
                <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar produtos, categorias, SKUs..."
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 20 }} /></InputAdornment>,
                        endAdornment: <InputAdornment position="end"><CropFree sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }} /></InputAdornment>
                    }}
                    sx={{
                        input: { color: '#ffffff', fontSize: '14px' },
                        '& .MuiOutlinedInput-root': { backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', '& fieldset': { borderColor: 'rgba(255,255,255,0.05)' } }
                    }}
                />

                {/* ➕ BANNER NOVO PRODUTO */}
                <Box onClick={() => setNewItem(true)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: '16px', background: 'linear-gradient(90deg, #5B21B6 0%, #0369A1 100%)', cursor: 'pointer', width: '100%', boxSizing: 'border-box' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Add sx={{ color: '#fff' }} /></Box>
                        <Stack>
                            <Typography sx={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>NOVO</Typography>
                            <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Adicionar produto</Typography>
                        </Stack>
                    </Box>
                    <ChevronRight sx={{ color: 'rgba(255,255,255,0.6)' }} />
                </Box>

                {/* 📊 SEÇÃO: RESUMO INTELIGENTE (4 CARDS) */}
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}><TrendingUp sx={{ fontSize: 16 }} /> RESUMO INTELIGENTE</Typography>
                    <Grid container spacing={1.2}>
                        <Grid item xs={3}>
                            <LayoutMobile._summaryCardCard>
                                <Box className="badge blue"><Inventory2Outlined sx={{ fontSize: 12, color: '#fff' }} /></Box>
                                <Typography className="title">Produtos</Typography>
                                <Typography className="value">245</Typography>
                                <Typography className="sub">No catálogo</Typography>
                            </LayoutMobile._summaryCardCard>
                        </Grid>
                        <Grid item xs={3}>
                            <LayoutMobile._summaryCardCard>
                                <Box className="badge purple"><HistoryOutlined sx={{ fontSize: 12, color: '#fff' }} /></Box>
                                <Typography className="title">Em estoque</Typography>
                                <Typography className="value">3.421</Typography>
                                <Typography className="sub">Itens disponív.</Typography>
                            </LayoutMobile._summaryCardCard>
                        </Grid>
                        <Grid item xs={3}>
                            <LayoutMobile._summaryCardCard>
                                <Box className="badge green"><TrendingUp sx={{ fontSize: 12, color: '#fff' }} /></Box>
                                <Typography className="title">Entradas</Typography>
                                <Typography className="value text-green">32</Typography>
                                <Typography className="sub">Novos prod.</Typography>
                            </LayoutMobile._summaryCardCard>
                        </Grid>
                        <Grid item xs={3}>
                            <LayoutMobile._summaryCardCard className="warning">
                                <Box className="badge orange"><WarningAmber sx={{ fontSize: 12, color: '#F97316' }} /></Box>
                                <Typography className="title text-orange">Atenção</Typography>
                                <Typography className="value text-orange">4</Typography>
                                <Typography className="sub">Estoque baixo</Typography>
                            </LayoutMobile._summaryCardCard>
                        </Grid>
                    </Grid>
                </Box>

                {/* 📈 🛑 CARD DE RELATÓRIOS DO VALOR TOTAL DO ESTOQUE (BLINDADO) */}
                <Box sx={{ width: '100%', display: 'block', boxSizing: 'border-box' }}>
                    <Card sx={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', color: '#fff', boxShadow: 'none' }}>
                        <CardContent sx={{ p: '20px !important', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', boxSizing: 'border-box' }}>
                            <Stack gap={0.5}>
                                <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500', fontFamily: 'Urbanist, sans-serif' }}>
                                    Valor total do estoque
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography sx={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Urbanist, sans-serif' }}>
                                        R$ 25.300
                                    </Typography>
                                    <Chip label="↑ 12,5%" size="small" sx={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '11px', fontWeight: '700', height: 20 }} />
                                </Box>
                                <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Urbanist, sans-serif' }}>
                                    vs. semana passada
                </Typography>
                            </Stack>
                            
                            <Stack alignItems="flex-end" gap={1.5}>
                                <svg width="110" height="35" viewBox="0 0 110 35" style={{ display: 'block' }}>
                                    <path d="M0 28 Q 18 8, 36 22 T 72 12 T 110 4" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                                    <circle cx="110" cy="4" r="3" fill="#06B6D4" />
                                </svg>
                                <Button size="small" startIcon={<TrendingUp sx={{ fontSize: 14 }} />} sx={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '11px', textTransform: 'none', px: 1.5, backgroundColor: 'rgba(255,255,255,0.02)', fontFamily: 'Urbanist, sans-serif' }}>
                                    Ver relatório
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* ⚡ SEÇÃO: AÇÕES RÁPIDAS */}
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', mb: 1.5 }}>⚡ AÇÕES RÁPIDAS</Typography>
                    <Box sx={{ display: 'flex', gap: 1.2, overflowX: 'auto', pb: 1, width: '100%', '::-webkit-scrollbar': { display: 'none' } }}>
                        {[
                            { name: 'Adicionar produto', icon: <Add sx={{ color: '#A855F7' }} />, bg: 'rgba(168,85,247,0.1)' },
                            { name: 'Entrada de estoque', icon: <ArrowDownward sx={{ color: '#06B6D4' }} />, bg: 'rgba(6,182,212,0.1)' },
                            { name: 'Saída de estoque', icon: <ArrowUpward sx={{ color: '#F97316' }} />, bg: 'rgba(249,115,22,0.1)' },
                            { name: 'Importar Excel', icon: <FilePresent sx={{ color: '#10B981' }} />, bg: 'rgba(16,185,129,0.1)' },
                            { name: 'Escanear código', icon: <CropFree sx={{ color: '#6366F1' }} />, bg: 'rgba(99,102,241,0.1)' },
                        ].map((act, i) => (
                            <LayoutMobile._actionCard key={i}>
                                <Box className="icon-box" sx={{ backgroundColor: act.bg }}>{act.icon}</Box>
                                <Typography className="text">{act.name}</Typography>
                            </LayoutMobile._actionCard>
                        ))}
                    </Box>
                </Box>

                {/* 📦 SEÇÃO: INVENTÁRIO CONSOLIDADO */}
                <Box sx={{ width: '100%', pb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                        <Typography sx={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.6)' }}>📦 INVENTÁRIO CONSOLIDADO</Typography>
                        <Box display="flex" alignItems="center" sx={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                            <Typography sx={{ fontSize: '12px', mr: 0.2 }}>Ver todos</Typography>
                            <ChevronRight sx={{ fontSize: 16 }} />
                        </Box>
                    </Box>

                    <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.04)', boxShadow: 'none' }}>
                        <CardContent sx={{ p: '14px !important' }}>
                            <Box display="flex" gap={1.8}>
                                <Stack alignItems="center" gap={1}>
                                    <Box sx={{ width: 76, height: 76, backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5">
                                            <path d="M4 18 C 6 10, 10 10, 12 14 C 14 10, 18 10, 20 18 Z" />
                                        </svg>
                                    </Box>
                                    <Chip icon={<CheckCircle sx={{ '&&': { color: '#10B981', fontSize: 11 } }} />} label="Em estoque" size="small" sx={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', fontSize: '9px', height: 18 }} />
                                </Stack>

                                <Stack flex={1}>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Typography sx={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Top Biquíni Cortininha</Typography>
                                        <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.4)', p: 0 }}><MoreVertOutlined sx={{ fontSize: 18 }} /></IconButton>
                                    </Box>
                                    
                                    <Grid container spacing={1} sx={{ mt: 1 }}>
                                        <Grid item xs={4}><Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>PEÇA / MODELO</Typography><Typography sx={{ fontSize: '11px', fontWeight: '500' }}>Top Biquíni</Typography></Grid>
                                        <Grid item xs={4}><Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>TAMANHO</Typography><Typography sx={{ fontSize: '11px', fontWeight: '500' }}>PP</Typography></Grid>
                                        <Grid item xs={4}><Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>COR</Typography><Typography sx={{ fontSize: '11px', fontWeight: '500' }}>Laranja</Typography></Grid>
                                    </Grid>

                                    <Box display="flex" gap={1} mt={1.5}>
                                        {['Estoque 100', 'Reservado 12', 'Disponível 88'].map((text, idx) => (
                                            <Box key={idx} sx={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', px: 1, py: 0.5, textAlign: 'center', flex: 1 }}>
                                                <Typography sx={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>{text.split(' ')[0]}</Typography>
                                                <Typography sx={{ fontSize: '11px', fontWeight: '700' }}>{text.split(' ')[1]}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* 📥 MENU FLUTUANTE EXPANDIDO (NÃO QUEBRA POIS ESTÁ FORA DA ÁREA DE SCROLL) */}
            {fabOpen && (
                <LayoutMobile._fabMenuWrapper>
                    {[
                        { label: 'Adicionar produto', icon: <Add sx={{ fontSize: 16 }} />, color: '#8B5CF6' },
                        { label: 'Entrada de estoque', icon: <ArrowDownward sx={{ fontSize: 16 }} />, color: '#06B6D4' },
                        { label: 'Saída de estoque', icon: <ArrowUpward sx={{ fontSize: 16 }} />, color: '#F97316' },
                        { label: 'Importar Excel', icon: <FilePresent sx={{ fontSize: 16 }} />, color: '#10B981' },
                        { label: 'Escanear código', icon: <CropFree sx={{ fontSize: 16 }} />, color: '#6366F1' },
                    ].map((menuItem, idx) => (
                        <Box key={idx} className="menu-item-row">
                            <Typography className="menu-text">{menuItem.label}</Typography>
                            <Box className="menu-icon-circle" sx={{ backgroundColor: menuItem.color }}>{menuItem.icon}</Box>
                        </Box>
                    ))}
                </LayoutMobile._fabMenuWrapper>
            )}

            {/* ➕ FAB BOTÃO INTERATIVO */}
            <LayoutMobile._fabButton onClick={() => setFabOpen(!fabOpen)}>
                {fabOpen ? <Close sx={{ fontSize: 22, color: '#fff' }} /> : <Add sx={{ fontSize: 24, color: '#fff' }} />}
            </LayoutMobile._fabButton>

            {/* 📥 NAV FIXA INFERIOR */}
            <LayoutMobile._app_bar>
                {paths.map((item, index) => (
                    <Fragment key={index}>
                        <MobileNavLink item={item} location={location} />
                    </Fragment>
                ))}
            </LayoutMobile._app_bar>
        </Box>
    );
};