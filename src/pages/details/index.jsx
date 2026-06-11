import React, { useEffect, useState, useContext } from "react";
import { StylesDetailsItems } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { Root } from "../../styles/Root/root_styles";
import { Close, UnfoldMore, Inventory2Rounded } from "@mui/icons-material";
import { Stack, Box, Typography, Divider } from "@mui/material";
import { TagsNewItem } from "../NewItem/styles";
import { Commits } from "./commits";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";

// Componente Interno Customizado para as Tags de Metadados
export const SectionTag = ({ value, labelExtern, borderGlow }) => {
    return (
        <StylesDetailsItems.sectionsRow>
            <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5 }}>
                {labelExtern}
            </Typography>
            <StylesDetailsItems.sectionsRowValue sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: `${borderGlow}40` }}>
                {value || 'Não informado'}
            </StylesDetailsItems.sectionsRowValue>
        </StylesDetailsItems.sectionsRow>
    );
};

export const DetailsItems = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { tenant } = useContext(AuthContext); // 🌌 Proteção Multi-Tenant ativa
    const [item, setItem] = useState({});

    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    const closeDetails = () => {
        navigate(-1);
    };

    // Filtra chaves do objeto que serão exibidas nas Tags de baixo
    const filteredKeys = Object.keys(item).filter(key => (
        key !== 'author' &&
        key !== 'nome' &&
        key !== 'quantidade' &&
        key !== 'id'
    ));

    // Mapeamento de Labels e Cores de Neon para cada metadado
    const keyMapping = {
        dataChegada: { label: 'Data de Chegada', color: Root.cyan },
        dataValidade: { label: 'Data de Validade', color: '#10B981' }, // Verde Esmeralda
        categoria: { label: 'Categoria do Item', color: '#F59E0B' },  // Âmbar
        sufixo: { label: 'Sufixo de Medida', color: glowColor }
    };

    useEffect(() => {
        if (!id || !tenant?.id) return;

        // 🚀 TRAVA MULTI-TENANT: Monitoramento em tempo real seguro isolado por empresa
        const stockDocRef = doc(db, 'tenants', tenant.id, 'produtos', id);
        const unsubscribe = onSnapshot(stockDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setItem({ id: docSnap.id, ...docSnap.data() });
            }
        }, (error) => {
            console.error("Erro ao escutar detalhes do documento:", error);
        });

        return () => unsubscribe();
    }, [id, tenant?.id]);

    return (
        <StylesDetailsItems.container>

            {/* 🗺️ BREADCRUMB / NAVEGAÇÃO SUPERIOR */}
            <StylesDetailsItems.nav_bar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Inventory2Rounded sx={{ color: Root.white, fontSize: '1.4rem' }} />
                    <StylesDetailsItems.title sx={{ color: '#FFF', fontSize: '1.1rem' }}>
                        Estoque / Detalhes do Produto
                    </StylesDetailsItems.title>
                </Box>
            </StylesDetailsItems.nav_bar>

            {/* 🔮 MASTER CARD GLASSMORPHIC */}
            <StylesDetailsItems.container2>

                {/* Botão de Fechar Absoluto Cravado na Direita */}
                <TagsNewItem.close
                    onClick={closeDetails}
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        border: 'none',
                        background: `linear-gradient(90deg, ${glowColor}, ${accentColor})`,
                        zIndex: 9999
                    }}
                >
                    <Close sx={{ fontSize: '14px', color: '#FFF' }} />
                </TagsNewItem.close>

                {/* Bloco de Título Principal */}
                <Box sx={{ mt: 1 }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: Root.fontFamilySansSerif, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Item Selecionado
                    </Typography>
                    <StylesDetailsItems.title sx={{ color: '#FFF', fontSize: '2rem', textAlign: 'left', mt: 0.5, lineHeight: 1.2 }}>
                        {item.nome || 'Carregando produto...'}
                    </StylesDetailsItems.title>
                </Box>

                {/* Bloco de Quantidade Consolidada */}
                <Box>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: Root.fontFamilySansSerif, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', mb: 0.5 }}>
                        Volume em Estoque
                    </Typography>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 900, color: accentColor, fontFamily: Root.fontFamilySansSerif, display: 'flex', alignItems: 'baseline', gap: 1, lineHeight: 1 }}>
                        {item.quantidade || 0}
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'lowercase' }}>
                            {/* 🎯 O SEGREDO: Se for array de [singular, plural], escolhe pelo índice. Se for string pura, tira o 's' se for 1 */}
                            {Array.isArray(item.sufixo)
                                ? (Number(item.quantidade) === 1 ? item.sufixo[0] : item.sufixo[1])
                                : (Number(item.quantidade) === 1 ? (item.sufixo?.replace(/s$/, '') || 'unidade') : (item.sufixo || 'unidades'))
                            }
                        </span>
                    </Typography>
                </Box>

                <Divider sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)', my: 0.5 }} />

                {/* Mapeamento Dinâmico de Metadados em Formato de Grade */}
                <StylesDetailsItems.sections>
                    {filteredKeys.map((key, index) => {
                        const { label, color } = keyMapping[key] || { label: key, color: 'rgba(255,255,255,0.1)' };
                        return (
                            <SectionTag
                                key={index}
                                labelExtern={label}
                                value={item[key]}
                                borderGlow={color}
                            />
                        );
                    })}
                </StylesDetailsItems.sections>

            </StylesDetailsItems.container2>

            {/* 📊 SEÇÃO DE AUDITORIA (COMMITS HISTÓRICOS) */}
            <Box sx={{ width: '100%', mt: 2 }}>
                <Typography sx={{ mb: 1.5, pl: 1, fontSize: '1rem', fontWeight: 800, color: '#FFF', fontFamily: Root.fontFamilySansSerif, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Histórico de Commits Operacionais
                </Typography>

                <StylesDetailsItems.bar>
                    {['Entradas & Saídas', 'Número/Commits', 'Quantidade/Commits', 'Data', 'Usuário'].map((tag, index) => (
                        <StylesDetailsItems.barTag key={index}>
                            {tag} <UnfoldMore sx={{ fontSize: '16px', opacity: 0.6 }} />
                        </StylesDetailsItems.barTag>
                    ))}
                </StylesDetailsItems.bar>

                {/* Lista de Commits Injetada */}
                <Box sx={{ mt: 1 }}>
                    <Commits id={item.id} />
                </Box>
            </Box>

        </StylesDetailsItems.container>
    );
};