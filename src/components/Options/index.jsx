import React, { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Stack, Divider, Typography } from '@mui/material';
import { Close, Details, PlaylistAdd, ProductionQuantityLimits, LeakRemove, QrCode2, Remove } from "@mui/icons-material";
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
    const { tenant } = useContext(AuthContext); // 🌌 Puxa o tenant ativo para o modo camaleão
    const [docs, setDocs] = useState({});

    // Controle individual de modais para evitar colisões no DOM
    const [paper, setPaper] = useState(false);
    const [remove, setRemove] = useState(false);
    const [qr, setQr] = useState(false);

    // Configuração de cores reativas baseadas no inquilino ativo


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

        // 🚀 TRAVA MULTI-TENANT: Escuta o documento dentro do escopo isolado da empresa ativa
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

    const handleAction = (key) => {
        if (key === 'list') setPaper(true);
        if (key === 'toremove') setRemove(true);
        if (key === 'qr') setQr(true);
    };

    // Função para fechar o menu principal limpando os estados
    const handleCloseMenu = () => {
        setOptions(null);
    };

    return (
        <>
            {/* 🌌 MODAL PRINCIPAL: MENU DE OPÇÕES DO PRODUTO */}
            <Dialog
                open={open}
                onClose={handleCloseMenu}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'rgba(20, 15, 35, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        boxShadow: `0 0 40px 5px ${Root.color_button}25`,
                        padding: '16px',
                        overflow: 'visible'
                    }
                }}
            >
                {/* Botão de Fechar Superior */}
                <TagsNewItem.close
                    sx={{
                        border: 'none',
                        background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                    }}
                    onClick={handleCloseMenu}
                >
                    <Close sx={{ fontSize: '14px', color: '#FFF' }} />
                </TagsNewItem.close>

                <DialogTitle sx={{ p: 0, pl: 2, pr: 6, mb: 1, mt: 1 }}>
                    <Typography sx={{
                        color: '#FFF',
                        fontFamily: Root.fontFamilySansSerif,
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}>
                        {name || 'Opções do Item'}
                    </Typography>
                </DialogTitle>

                <Divider
                    sx={{
                        border: 'none', // 🔥 O SEGREDO: Remove a borda padrão do MUI que mata o gradiente
                        height: '2px',  // 🔥 Dá a espessura cirúrgica para a lâmina de neon
                        background: `linear-gradient(90deg, rgba(155, 0, 175, 0.84) 0%, rgb(23, 163, 184) 100%)`,
                        mb: 2,
                        mt: 1 // Um respiro sutil no topo também ajuda a isolar o título
                    }}
                />

                <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((item, index) => {
                        // Tratamento do link de Detalhes (Navegação pura de rota)
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
                                    // Se a ação estiver ativa em segundo plano, acende uma borda neon sutil
                                    ...(((item.key === 'toremove' && remove) || (item.key === 'list' && paper) || (item.key === 'qr' && qr)) && {
                                        borderLeft: `3px solid rgb(23, 163, 184) 100%)`,
                                        background: `linear-gradient(90deg, rgba(155, 0, 175, 0.84) 0%, rgb(23, 163, 184) 100%)`,
                                    })
                                }}
                            >
                                <span style={{ fontFamily: Root.fontFamilySansSerif, fontWeight: 500 }}>{item.name}</span>
                                <Box sx={{ color: item.disabled ? 'inherit' : 'rgb(23, 163, 184) 100%)', display: 'flex' }}>
                                    {item.icon}
                                </Box>
                            </StylesOptions.item>
                        );
                    })}
                </DialogContent>
            </Dialog>

            {/* 📥 MODAL FILHO 1: RETIRAR DO ESTOQUE */}
            {remove && (
                <RemoveItems item={docs} setRemove={setRemove} />
            )}

            {/* 📋 MODAL FILHO 2: ADICIONAR NA LISTA */}
            <Dialog
                open={paper}
                onClose={() => setPaper(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'rgba(20, 15, 35, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '16px',
                        overflow: 'visible'
                    }
                }}
            >
                <TagsNewItem.close
                    sx={{ border: 'none', background: `linear-gradient(90deg, rgba(155, 0, 175, 0.84) 0%, rgb(23, 163, 184) 100%)`, }}
                    onClick={() => setPaper(false)}
                >
                    <Close sx={{ fontSize: '14px', color: '#FFF' }} />
                </TagsNewItem.close>
                <DialogTitle sx={{ color: '#FFF', fontFamily: Root.fontFamilySansSerif, fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', p: 0, mb: 1, mt: 1, textAlign: 'center' }}>
                    Adicionar {name} para lista:
                </DialogTitle>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', mb: 2 }} />
                <DialogContent sx={{ p: 0 }}>
                    <MyLists item={optionItem} />
                </DialogContent>
            </Dialog>

            {/* 🔲 MODAL FILHO 3: ESCANEAR CÓDIGO DE BARRAS / QR CODE */}
            <Dialog
                open={qr}
                onClose={() => setQr(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'rgba(20, 15, 35, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '24px',
                        overflow: 'visible'
                    }
                }}
            >
                <TagsNewItem.close
                    sx={{ border: 'none', background: `linear-gradient(90deg, rgba(155, 0, 175, 0.84) 0%, rgb(23, 163, 184) 100%)`, }}
                    onClick={() => setQr(false)}
                >
                    <Close sx={{ fontSize: '14px', color: '#FFF' }} />
                </TagsNewItem.close>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', p: 0, mt: 2 }}>
                    <Typography sx={{ color: '#FFF', fontFamily: Root.fontFamilySansSerif, fontWeight: 600, textAlign: 'center', fontSize: '1rem' }}>
                        Escaneie o código abaixo para continuar.
                    </Typography>
                    <Box sx={{ p: 2, background: '#FFF', borderRadius: '8px', boxShadow: `0 0 20px rgb(23, 163, 184) 100%) 30` }}>
                        <QRCodeReaderData data={optionItem} />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};