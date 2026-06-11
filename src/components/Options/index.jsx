import React, { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Divider, Typography, IconButton, Slide } from '@mui/material'; // 🔥 Importado o Slide do MUI
import { Close, Details, PlaylistAdd, ProductionQuantityLimits, LeakRemove, QrCode2, Remove, ArrowBackRounded } from "@mui/icons-material";
import { TagsNewItem } from "../../pages/NewItem/styles";
import { StylesOptions } from "./stylesOptions";
import { RemoveItems } from "./components/Remove";
import { MyLists } from "./components/Lists";
import { QRCodeReaderData } from "./components/Qr_code";
import { Root } from "../../styles/Root/root_styles";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";

export const Options = ({ open, name, setOptions, optionItem }) => {
    const { tenant } = useContext(AuthContext);
    const [docs, setDocs] = useState({});
    const [view, setView] = useState('menu');

    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    const items = [
        { key: 'details', name: 'Detalhes', icon: <Details /> },
        { key: 'toremove', name: 'Retirar do estoque', icon: <Remove /> },
        { key: 'list', name: 'Adicionar na lista', icon: <PlaylistAdd /> },
        { key: 'supervision', name: 'Supervisionar este item', icon: <ProductionQuantityLimits />, disabled: true },
        { key: 'leak', name: 'Vazamento de estoque', icon: <LeakRemove />, disabled: true },
        { key: 'qr', name: 'Código de barras', icon: <QrCode2 /> },
    ];

    useEffect(() => {
        if (!optionItem?.id || !tenant?.id) return;

        const stockDocRef = doc(db, 'tenants', tenant.id, 'produtos', optionItem.id);
        const unsubscribe = onSnapshot(stockDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setDocs({ id: docSnap.id, ...docSnap.data() });
            }
        }, (error) => {
            console.error("Erro ao escutar atualizações do item:", error);
        });

        return () => unsubscribe();
    }, [optionItem?.id, tenant?.id]);

    useEffect(() => {
        if (!open) setView('menu');
    }, [open]);

    const handleAction = (key) => {
        setView(key);
    };

    const handleCloseMenu = () => {
        setOptions(null);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseMenu}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(20, 15, 35, 0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    boxShadow: `0 0 40px 5px ${glowColor}25`,
                    padding: '16px',
                    // Alterado para hidden para o card não vazar para fora do vidro ao deslizar
                    overflow: 'hidden',
                    minHeight: '410px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }
            }}
        >
            {/* ⬅️ BOTÃO VOLTAR */}
            {view !== 'menu' && (
                <IconButton
                    onClick={() => setView('menu')}
                    sx={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': { color: '#FFF', transform: 'translateX(-2px)' },
                        zIndex: 10,
                        transition: 'all 0.2s'
                    }}
                >
                    <ArrowBackRounded sx={{ fontSize: '20px' }} />
                </IconButton>
            )}
            <TagsNewItem.close
                sx={{
                    border: 'none',
                    background: `linear-gradient(90deg, ${glowColor}, ${accentColor})`,
                    zIndex: 10,
                }}
                onClick={handleCloseMenu}
            >
                <Close sx={{ fontSize: '14px', color: '#FFF' }} />
            </TagsNewItem.close>

            {/* 📝 CABEÇALHO */}
            <DialogTitle sx={{ p: 0, pl: view !== 'menu' ? 6 : 2, pr: 6, mb: 1, mt: 1 }}>
                <Typography sx={{
                    color: '#FFF',
                    fontFamily: Root.fontFamilySansSerif,
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}>
                    {view === 'menu' && (name || 'Opções do Item')}
                    {view === 'toremove' && 'Baixa de Estoque'}
                    {view === 'list' && 'Vincular à Lista'}
                    {view === 'qr' && 'Código do Item'}
                </Typography>
            </DialogTitle>

            <Divider
                sx={{
                    border: 'none',
                    height: '2px',
                    background: `linear-gradient(90deg, ${glowColor} 0%, ${accentColor} 100%)`,
                    mb: 2,
                    mt: 1
                }}
            />

      <DialogContent 
    sx={{ 
        p: 0, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        overflow: 'hidden',   
        width: '100%',
        minHeight: '340px',   
    }}
>
    
    {/* 🧭 TELA A: MENU PRINCIPAL (Garante entrada suave absoluta de qualquer lado) */}
    <Slide direction={view === 'menu' ? 'right' : 'left'} in={view === 'menu'} mountOnEnter unmountOnExit timeout={250}>
        <Box sx={{ 
            position: 'absolute', // 🔥 TRAVA DE OURO: Vira absoluto para o slide de voltar passar por cima sem trancos
            top: 0,
            left: 0,
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px' 
        }}>
            {items.map((item, index) => {
                if (item.key === 'details') {
                    return (
                        <StylesOptions.link key={index} to={`/${item.key}/${docs.id}`} style={{ textDecoration: 'none' }}>
                            <StylesOptions.item sx={{ width: '100%' }}>
                                {item.name}
                                {item.icon}
                            </StylesOptions.item>
                        </StylesOptions.link>
                    );
                }

                return (
                    <StylesOptions.item
                        key={index}
                        onClick={() => !item.disabled && handleAction(item.key)}
                        sx={{
                            width: '100%',
                            opacity: item.disabled ? 0.35 : 1,
                            cursor: item.disabled ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontFamily: Root.fontFamilySansSerif, fontWeight: 500 }}>{item.name}</span>
                        <Box sx={{ color: item.disabled ? 'inherit' : accentColor, display: 'flex' }}>
                            {item.icon}
                        </Box>
                    </StylesOptions.item>
                );
            })}
        </Box>
    </Slide>

    {/* 🧭 TELA B: RETIRAR DO ESTOQUE (Sai para a direita na hora de voltar) */}
    <Slide direction={view === 'toremove' ? 'left' : 'right'} in={view === 'toremove'} mountOnEnter unmountOnExit timeout={250}>
        <Box sx={{ position: 'absolute', width: '100%', top: 0, left: 0 }}>
            <RemoveItems item={docs} setRemove={() => setView('menu')} />
        </Box>
    </Slide>

    {/* 🧭 TELA C: ADICIONAR NA LISTA (Sai para a direita na hora de voltar) */}
    <Slide direction={view === 'list' ? 'left' : 'right'} in={view === 'list'} mountOnEnter unmountOnExit timeout={250}>
        <Box sx={{ position: 'absolute', width: '100%', top: 0, left: 0, display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', fontSize: '0.9rem', mb: 1 }}>
                Selecione a lista de destino para o produto <strong>{name}</strong>.
            </Typography>
            <MyLists item={optionItem} />
        </Box>
    </Slide>

    {/* 🧭 TELA D: QR CODE (Sai para a direita na hora de voltar) */}
    <Slide direction={view === 'qr' ? 'left' : 'right'} in={view === 'qr'} mountOnEnter unmountOnExit timeout={250}>
        <Box sx={{ position: 'absolute', width: '100%', top: 0, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%', justifyContent: 'center' }}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: Root.fontFamilySansSerif, textAlign: 'center', fontSize: '0.9rem' }}>
                Aponte o leitor do coletor para o código abaixo.
            </Typography>
            <Box sx={{ p: 2, background: '#FFF', borderRadius: '8px', boxShadow: `0 0 24px ${accentColor}40`, display: 'flex' }}>
                <QRCodeReaderData data={optionItem} />
            </Box>
        </Box>
    </Slide>

</DialogContent>
        </Dialog>
    );
};