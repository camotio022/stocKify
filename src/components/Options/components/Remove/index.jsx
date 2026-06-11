import React, { useContext, useState } from "react";
import { Stack, Box, CircularProgress, Alert } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
import { StylesRemoveItem } from "./remove"; // Mantido o seu apontamento original de estilos
import { addProduct } from "../../../../api/products/add";
import { AuthContext } from '../../../../auth_context/index.jsx';

export const RemoveItems = ({ item, setRemove }) => {
    const { user, tenant } = useContext(AuthContext); // 🌌 Injetado o tenant do contexto para consistência de cores

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [progress, setProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // Garante que a quantidade total seja tratada como número nativo
    const quantidadeTotal = Number(item.quantidade) || 0;

    // Configuração de cores camaleão consistentes com o restante do modal
    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    // Sugestões inteligentes de valores baseadas no estoque atual (Elimina duplicados matemáticos com o Set)
    const porcentagens = [...new Set([
        Math.round(quantidadeTotal * 0.05),
        Math.round(quantidadeTotal * 0.20),
        Math.round(quantidadeTotal * 0.45),
        Math.round(quantidadeTotal * 0.60),
        Math.round(quantidadeTotal * 0.75),
        Math.round(quantidadeTotal * 0.90),
        quantidadeTotal,
        'Nenhuma das opções'
    ])].filter(val => val === 'Nenhuma das opções' || (typeof val === 'number' && val > 0)); // Evita renderizar 0 se o estoque for muito baixo

    const hadleToRemove = async () => {
        if (!user || !user.tenant) {
            console.error("Usuário deslogado ou sem tenant ativo.");
            return;
        }

        const valorRetirada = Number(inputValue);

        if (!valorRetirada || valorRetirada <= 0 || valorRetirada > quantidadeTotal) {
            return;
        }

        const author = {
            userName: user.name,
            userEmail: user.email,
            userId: user.id
        };

        try {
            setProgress(true);

            // 1. Remove do estoque principal no Firestore
            await addProduct.to_remove_quantiadade(item.id, valorRetirada, author);

            // 2. Registra o histórico na coleção de saídas com a chave do tenant
            await addProduct.registerSaida(item, author, valorRetirada, user.tenant);

            setSuccessMessage(true);

            // Retorna suavemente para a tela de menu do modal pai após exibir o sucesso
            setTimeout(() => {
                setRemove(false); // No novo modelo de injeção, isso executa setView('menu')
            }, 1200);

        } catch (error) {
            console.error("Erro ao processar a retirada do item:", error);
        } finally {
            setProgress(false);
            setInputValue('');
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.2s ease-in-out' }}>
            
            {/* 💬 PERGUNTA CONTEXTUAL */}
            <StylesRemoveItem.quetion>
                Qual é a sua quantidade a retirar?
            </StylesRemoveItem.quetion>

            {/* 🎯 CHIPS DE SUGESTÃO GLASSMORPHISM */}
            <StylesRemoveItem.mapSugests>
                {porcentagens.map((sugestao, index) => {
                    const isSelected = Number(inputValue) === sugestao || (sugestao === 'Nenhuma das opções' && showInput);

                    return (
                        <Box
                            key={index}
                            onClick={() => {
                                if (sugestao === 'Nenhuma das opções') {
                                    setInputValue('');
                                    setShowInput(true);
                                } else {
                                    setShowInput(false);
                                    setInputValue(sugestao);
                                }
                            }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '34px',
                                paddingInline: '16px',
                                borderRadius: '8px',
                                fontFamily: Root.fontFamilySansSerif,
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                border: '1px solid',
                                backgroundColor: isSelected ? `${glowColor}25` : 'rgba(255, 255, 255, 0.02)',
                                color: isSelected ? '#FFF' : 'rgba(255, 255, 255, 0.6)',
                                borderColor: isSelected ? glowColor : 'rgba(255, 255, 255, 0.05)',
                                boxShadow: isSelected ? `0 0 12px ${glowColor}20` : 'none',
                                '&:hover': {
                                    backgroundColor: isSelected ? `${glowColor}35` : 'rgba(255, 255, 255, 0.06)',
                                    color: '#FFF'
                                }
                            }}
                        >
                            {sugestao}
                        </Box>
                    );
                })}
            </StylesRemoveItem.mapSugests>

            {/* ⌨️ INPUT DE QUANTIDADE CUSTOMIZADA */}
            {showInput && (
                <Stack 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: 'rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease-in-out',
                        '&:focus-within': {
                            borderColor: accentColor,
                            boxShadow: `0 0 12px ${accentColor}30`
                        }
                    }}
                >
                    <StylesRemoveItem.inputQuantidade
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite a quantidade a retirar..."
                        type="number"
                        style={{ color: '#FFF', width: '100%', padding: '10px 14px' }}
                    />
                </Stack>
            )}

            {/* ⚡ BOTÃO RETIRAR CONTEXTUALIZADO */}
            {inputValue && Number(inputValue) > 0 && Number(inputValue) <= quantidadeTotal && !successMessage && (
                <StylesRemoveItem.retirar 
                    onClick={hadleToRemove} 
                    disabled={progress}
                    sx={{
                        background: `linear-gradient(90deg, ${glowColor} 0%, ${accentColor} 100%)`,
                        boxShadow: `0 4px 14px ${glowColor}30`,
                        color: '#FFF',
                        cursor: progress ? 'not-allowed' : 'pointer',
                        '&:hover': {
                            filter: 'brightness(1.1)',
                            boxShadow: `0 0 20px ${glowColor}50`
                        }
                    }}
                >
                    {progress ? 'Processando...' : `Confirmar Retirada de ${inputValue}`}
                    {progress && (
                        <CircularProgress 
                            size={20} 
                            sx={{ marginLeft: '12px', color: '#FFF' }} 
                        />
                    )}
                </StylesRemoveItem.retirar>
            )}

            {/* ⚠️ CONSOLE DE ALERTAS FLUTUANTES DO VIDRO */}
            <Stack sx={{ width: '100%', alignItems: 'center', gap: 1, mt: 2 }}>
                {inputValue && Number(inputValue) > quantidadeTotal && (
                    <Alert 
                        sx={{ 
                            width: '100%', 
                            borderRadius: '8px', 
                            background: 'rgba(239, 68, 68, 0.15)', 
                            color: '#FEE2E2', 
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            fontFamily: Root.fontFamilySansSerif
                        }} 
                        variant="outlined" 
                        severity="error"
                    >
                        Estoque insuficiente. Disponível: {quantidadeTotal} itens.
                    </Alert>
                )}

                {successMessage && (
                    <Alert 
                        sx={{ 
                            width: '100%', 
                            borderRadius: '8px', 
                            background: 'rgba(34, 197, 94, 0.15)', 
                            color: '#DCFCE7', 
                            border: '1px solid rgba(34, 197, 94, 0.25)',
                            fontFamily: Root.fontFamilySansSerif
                        }} 
                        variant="outlined" 
                        severity="success"
                    >
                        Baixa concluída! Atualizando inventário...
                    </Alert>
                )}
            </Stack>
        </Box>
    );
};