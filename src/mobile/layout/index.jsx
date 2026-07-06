import React, { Fragment, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    Divider,
    Chip,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Container,
    Link
} from '@mui/material';
import {
    SearchOutlined,
    QrCodeScannerOutlined,
    FilterListOutlined,
    MoreVertOutlined,
    EditOutlined,
    DeleteOutline,
    InfoOutlined,
    LocalMallOutlined,
    Inventory2Outlined,
    LoginOutlined,
    LogoutOutlined,
    InsightsOutlined,
    HistoryOutlined,
    TerminalOutlined
} from '@mui/icons-material';
import { Root } from '../../styles/Root/root_styles';
import { LayoutMobile } from "../styles/layout"
import { useLocation } from 'react-router-dom';

// 📱 COMPONENTE ATÔMICO DE RENDERIZAÇÃO DE LINK LINK RESPONSIVO
const MobileNavLink = ({ item, index, location, paths }) => {
    const isPathActive = location.pathname === item.link;
    const previousIndex = paths.findIndex((p) => p.link === location.pathname) - 1;

    // 💎 DESIGN SYSTEM: Estilização futurista com a paleta Stockify
    const linkStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        textDecoration: 'none',

        // Estado Ativo: Gradiente Elétrico e Glow Roxo
        ...(isPathActive ? {
            background: `linear-gradient(135deg, ${Root.color_button || '#8A2BE2'}, ${Root.cyan || '#00FFFF'})`,
            color: '#ffffff',
            boxShadow: `0 0 15px ${Root.color_button || '#8A2BE2'}`,
            transform: 'translateY(-5px)',
            fontWeight: '700',
        } : {
            // Estado Inativo: Discreto sobre o fundo escuro
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: 'rgba(255, 255, 255, 0.6)',
        })
    };

    return (
        <LayoutMobile._containerItemMap key={index} sx={{ position: 'relative' }}>
            {/* Curva de transição suave nativa do seu layout */}
            {!isPathActive && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        borderTopRightRadius: index === previousIndex && '50%',
                        borderTopLeftRadius: index === (2 + previousIndex) && '50%',
                        pointerEvents: 'none'
                    }}
                />
            )}

            <Link to={item.link} style={linkStyles}>
                <Stack sx={{ fontSize: '110%', mb: 0.2 }}>
                    {item.icon}
                </Stack>
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: '10px',
                        fontFamily: isPathActive ? 'Orbitron' : 'Urbanist',
                        letterSpacing: isPathActive ? '0.5px' : '0'
                    }}
                >
                    {item.name}
                </Typography>
            </Link>
        </LayoutMobile._containerItemMap>
    );
};










export const EstoqueMobile = ({ produtos = [], role, tenant, setNewItem, setSaveExcel }) => {
    const location = useLocation()
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const paths = [
        {
            name: 'Estoque',
            link: '/',
            icon: <Inventory2Outlined />
        },
        {
            name: 'Entradas',
            link: '/entradas',
            icon: <LoginOutlined />
        },
        {
            name: 'Saídas',
            link: '/exits',
            icon: <LogoutOutlined />
        },
        {
            name: 'Insights',
            link: '/insights',
            icon: <InsightsOutlined />
        },
        {
            name: 'Histórico',
            link: '/history',
            icon: <HistoryOutlined />
        },
    ]

    // Pega o nome da rota atual para renderizar no título gigante
    const currentRouteName = paths.find(item => item.link === location.pathname)?.name || "Stockify";
    // 🎯 Abre a gaveta de opções (Menu) de cada Card
    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(id);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    // 🔍 Filtro reativo baseado na pesquisa do operador
    const produtosFiltrados = produtos.filter(prod =>
        prod.nome?.toLowerCase().includes(search.toLowerCase())
    );

    // 🛠️ Pega o segmento ou a lista de colunas personalizadas que o Tenant configurou no banco
    // Fallback caso a empresa não tenha colunas salvas, trazendo chaves padrão generificadas
    const colunasDoTenant = tenant.colunasEstoque

    return (
        <Box sx={{
            width: '100vw',                     // 🚀 Garante largura total da tela física
            height: '100vh',                 // 🚀 Ocupa toda a altura disponível
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',               // 🎯 CENTRALIZA todos os itens filhos perfeitamente na horizontal
            justifyContent: 'flex-start',
            gap: 2.5,
            px: 2,                              // Padding de segurança para os cards não colarem no vidro
            pt: '85px',                         // Empurra o conteúdo para baixo da topbar fixa
            pb: '110px',                        // Empurra o último card para cima do menu inferior fixo
            boxSizing: 'border-box',
            overflowY: 'auto',                  // 🔥 ATIVA O SCROLL VERTICAL REAL NO CONTAINER MESTRE
            overflowX: 'hidden',                // Bloqueia dança para os lados
            backgroundColor: '#020205',         // Aplica o tema escuro do Stockify tirando o vermelho
            ...Root.scrollBar
        }}>

<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
                <TextField 
                    fullWidth 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="[ ACESSAR_INVENTÁRIO_GLOBAL ]" 
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined sx={{ color: '#00FFFF', filter: 'drop-shadow(0 0 5px #00FFFF)' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton sx={{ color: '#00FFFF', animation: 'pulse 2s infinite' }}>
                                    <QrCodeScannerOutlined />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{ 
                        input: { color: '#ffffff', fontFamily: 'Orbitron', fontSize: '13px', letterSpacing: '1px' }, 
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(5, 5, 20, 0.6)',
                            borderRadius: '4px', // Cantos secos, estilo militar/HUD
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 255, 255, 0.2)',
                            boxShadow: 'inset 0 0 15px rgba(0, 255, 255, 0.05)',
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' },
                            '&.Mui-focused': {
                                border: '1px solid #00FFFF',
                                boxShadow: '0 0 15px rgba(0, 255, 255, 0.25), inset 0 0 10px rgba(0, 255, 255, 0.1)',
                            }
                        }
                    }}
                />

                {/* BOTÕES ESTILO CENTRAL DE CONTROLE */}
                <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={() => setSaveExcel(true)}
                        sx={{ 
                            backgroundColor: 'rgba(10, 10, 30, 0.8)', 
                            border: '1px solid #8A2BE2', 
                            color: '#8A2BE2', 
                            fontFamily: 'Orbitron', 
                            fontSize: '11px', 
                            fontWeight: '700',
                            borderRadius: '4px', 
                            py: 1.2,
                            letterSpacing: '1px',
                            boxShadow: '0 0 10px rgba(138, 43, 226, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(138, 43, 226, 0.1)', color: '#ffffff' }
                        }}
                    >
                        EXTRACT.XLS
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={() => setNewItem(true)}
                        sx={{ 
                            background: 'transparent',
                            border: '1px solid #00FFFF',
                            color: '#00FFFF', 
                            fontWeight: '700', 
                            fontFamily: 'Orbitron', 
                            fontSize: '11px', 
                            borderRadius: '4px', 
                            py: 1.2,
                            letterSpacing: '1px',
                            boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
                            '&:hover': { background: 'linear-gradient(90deg, #8A2BE2, #00FFFF)', color: '#fff' }
                        }}
                    >
                        + INJETAR_ITEM
                    </Button>
                </Box>
            </Box>

            {/* 🌌 NEXUS CARDS FEED (PRODUTOS DO TENANT) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
                {produtosFiltrados.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#8A2BE2', textAlign: 'center', mt: 4, fontFamily: 'Orbitron', letterSpacing: '2px' }}>
                        // SISTEMA_VAZIO_REGISTRO_NULO
                    </Typography>
                ) : (
                    produtosFiltrados.map((prod) => (
                        <Card 
                            key={prod.id} 
                            sx={{ 
                                background: 'linear-gradient(180deg, rgba(6, 6, 20, 0.85) 0%, rgba(2, 2, 8, 0.95) 100%)', 
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(138, 43, 226, 0.4)', // Linha roxa cyberpunk
                                borderLeft: '4px solid #00FFFF', // Detalhe técnico ciano na esquerda
                                borderRadius: '4px', // Formato de cartão de dados/chip
                                color: 'white',
                                position: 'relative',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                                '&:hover': { 
                                    borderColor: '#00FFFF',
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.15)'
                                }
                            }}
                        >
                            {/* Linha técnica sutil no topo do card */}
                            <Box sx={{ position: 'absolute', top: 0, right: '50px', left: '4px', height: '1px', background: 'linear-gradient(90deg, #00FFFF, transparent)' }} />

                            <CardContent sx={{ p: '22px !important' }}>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Chip 
                                        label={prod.categoria?.toUpperCase() || "CORE"} 
                                        size="small" 
                                        sx={{ 
                                            background: 'rgba(0, 255, 255, 0.05)', 
                                            color: '#00FFFF', 
                                            fontWeight: '700', 
                                            fontFamily: 'Orbitron', 
                                            fontSize: '9px', 
                                            border: '1px solid rgba(0, 255, 255, 0.3)',
                                            borderRadius: '2px',
                                            letterSpacing: '1px'
                                        }} 
                                    />
                                    <IconButton size="small" onClick={(e) => handleOpenMenu(e, prod.id)} sx={{ color: '#8A2BE2', '&:hover': { color: '#00FFFF' } }}><MoreVertOutlined /></IconButton>
                                </Box>

                                {/* Nome do Produto Principal */}
                                <Typography variant="h5" sx={{ fontFamily: 'Orbitron', fontWeight: '700', color: '#ffffff', mb: 0.5, letterSpacing: '0.5px' }}>
                                    {prod.nome}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                                    <TerminalOutlined sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px' }} />
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.5px' }}>
                                        NODE_ID: {prod.id?.substring(0, 10).toUpperCase()}
                                    </Typography>
                                </Box>

                                <Divider sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)', mb: 2.5 }} />

                                {/* 🔄 CENTRAL DE TELEMETRIA DINÂMICA: GERA OS DADOS SENSÍVEIS DO TENANT */}
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                    {colunasDoTenant.map((col, idx) => {
                                        const valorBruto = prod[col.campo];

                                        // Status Monetário Futurista
                                        if (col.isCurrency) {
                                            return (
                                                <Box key={idx} sx={{ borderLeft: '1px solid rgba(138,43,226,0.3)', pl: 1.5 }}>
                                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', fontSize: '9px', fontFamily: 'Orbitron', letterSpacing: '1px' }}>
                                                        {col.label.toUpperCase()}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Orbitron', fontWeight: '700', color: '#00FFFF', textShadow: '0 0 10px rgba(0,255,255,0.3)', mt: 0.5 }}>
                                                        CR$ {valorBruto ? parseFloat(valorBruto).toFixed(2) : '0.00'}
                                                    </Typography>
                                                </Box>
                                            );
                                        }

                                        // Status Logístico / Unidade de Medida
                                        if (col.isUnit) {
                                            return (
                                                <Box key={idx} sx={{ borderLeft: '1px solid rgba(138,43,226,0.3)', pl: 1.5 }}>
                                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', fontSize: '9px', fontFamily: 'Orbitron', letterSpacing: '1px' }}>
                                                        {col.label.toUpperCase()}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Orbitron', fontWeight: '700', color: '#ffffff', mt: 0.5 }}>
                                                        {valorBruto || 0} <span style={{ fontSize: '11px', color: '#8A2BE2', fontWeight: 'bold' }}>{tenant?.unidadeMedida?.toUpperCase() || 'UN'}</span>
                                                    </Typography>
                                                </Box>
                                            );
                                        }

                                        // Atributos Genéricos Alinhados (Tamanho, Cor, Validade, etc.)
                                        return (
                                            <Box key={idx} sx={{ borderLeft: '1px solid rgba(138,43,226,0.3)', pl: 1.5 }}>
                                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', fontSize: '9px', fontFamily: 'Orbitron', letterSpacing: '1px' }}>
                                                    {col.label.toUpperCase()}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontFamily: 'Urbanist', fontWeight: '600', color: 'rgba(255,255,255,0.85)', mt: 0.5 }}>
                                                    {valorBruto || 'NUL_DATA'}
                                                </Typography>
                                            </Box>
                                        );
                                    })}
                                </Box>

                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {/* CONTEXT MENU */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    sx: {
                        backgroundColor: '#0a0a1e',
                        border: '1px solid rgba(138, 43, 226, 0.4)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        '& .MuiMenuItem-root': { fontFamily: 'Urbanist', fontSize: '14px', py: 1.2 }
                    }
                }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon sx={{ color: '#00FFFF', minWidth: '35px' }}><EditOutlined fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Editar Registro" />
                </MenuItem>

                {role === 'owner' && (
                    <MenuItem onClick={handleCloseMenu} sx={{ color: '#ff4444' }}>
                        <ListItemIcon sx={{ color: '#ff4444', minWidth: '35px' }}><DeleteOutline fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Remover do Fluxo" />
                    </MenuItem>
                )}
            </Menu>
            <LayoutMobile._app_bar
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'rgba(5, 5, 18, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(0, 255, 255, 0.1)',
                    boxShadow: '0 -5px 25px rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    py: 1,
                    zIndex: 99999
                }}
            >
                {paths.map((item, index) => (
                    <Fragment key={index}>
                        <MobileNavLink
                            item={item}
                            index={index}
                            location={location}
                            paths={paths}
                        />
                    </Fragment>
                ))}
            </LayoutMobile._app_bar>
        </Box>
    );
};