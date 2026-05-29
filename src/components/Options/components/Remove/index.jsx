import { Stack } from "@mui/system";
import { StylesOptions } from "../../stylesOptions";
import { Root } from "../../../../styles/Root/root_styles";
import { useContext, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { StylesRemoveItem } from "./remove";
import { addProduct } from "../../../../api/products/add";
import { AuthContext } from '../../../../auth_context/index.jsx';
import { TagsNewItem } from "../../../../pages/NewItem/styles";
import { Close } from "@mui/icons-material";

export const RemoveItems = ({ item, setRemove }) => {
    const { user } = useContext(AuthContext);

    const [alert, setAlert] = useState('error');
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [progress, setProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // Garante que a quantidade total seja tratada como número nativo
    const quantidadeTotal = Number(item.quantidade) || 0;

    // Sugestões inteligentes de valores baseadas no estoque atual
    const porcentagens = new Set([
        Math.round(quantidadeTotal * 0.05),
        Math.round(quantidadeTotal * 0.20),
        Math.round(quantidadeTotal * 0.45),
        Math.round(quantidadeTotal * 0.60),
        Math.round(quantidadeTotal * 0.75),
        Math.round(quantidadeTotal * 0.90),
        quantidadeTotal,
        'Nenhuma das opções'
    ]);

    const hadleToRemove = async () => {
        // Validação de segurança inicial
        if (!user || !user.tenant) {
            console.error("Usuário deslogado ou sem tenant ativo.");
            return;
        }

        const valorRetirada = Number(inputValue);

        if (!valorRetirada || valorRetirada <= 0 || valorRetirada > quantidadeTotal) {
            setAlert('error');
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

            // Define estados de sucesso
            setAlert('success');
            setSuccessMessage(true);

            // Fecha o modal suavemente após o usuário ver o feedback positivo
            setTimeout(() => {
                setRemove(false);
            }, 1500);

        } catch (error) {
            console.error("Erro ao processar a retirada do item:", error);
            setAlert('error');
        } finally {
            setProgress(false);
            // Reseta o input de forma limpa, eliminando o bug de valores artificiais maiores que o estoque
            setInputValue('');
        }
    };

    return (
        <StylesOptions.paper sx={{
            minHeight: '55%',
            gap: 1
        }}>
            <TagsNewItem.close onClick={() => setRemove(false)}>
                <Close fontSize="10px" />
            </TagsNewItem.close>

            <StylesOptions.title>
                Retirando itens
            </StylesOptions.title>

            <StylesOptions.divider />

            <StylesRemoveItem.quetion>
                Qual é a sua quantidade a retirar?
            </StylesRemoveItem.quetion>

            <StylesRemoveItem.mapSugests>
                {[...porcentagens].map((sugestao, index) => {
                    return (
                        <Stack sx={Number(inputValue) === sugestao ? {
                            bgcolor: Root.color_button,
                            color: Root.color_default,
                            paddingInline: '18px',
                            boxShadow: Root.boxS,
                            cursor: 'pointer'
                        } : {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            paddingInline: '18px',
                            bgcolor: Root.color_button_secondary,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            ...Root.hover
                        }} key={index} onClick={() => {
                            if (sugestao === 'Nenhuma das opções') {
                                setInputValue('');
                                setShowInput(true);
                            } else {
                                setShowInput(false);
                                setInputValue(sugestao);
                            }
                        }}>
                            {sugestao}
                        </Stack>
                    );
                })}
            </StylesRemoveItem.mapSugests>

            {showInput && (
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    backgroundColor: Root.color_button,
                    borderRadius: '10px',
                }}>
                    <StylesRemoveItem.inputQuantidade
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite a quantidade a retirar"
                        type="number"
                    />
                </Stack>
            )}

            {/* Condicional do botão: Só exibe se houver valor válido e menor/igual ao estoque */}
            {inputValue && Number(inputValue) > 0 && Number(inputValue) <= quantidadeTotal && !successMessage && (
                <StylesRemoveItem.retirar onClick={hadleToRemove} disabled={progress}>
                    {progress ? 'Retirando...' : `Retirar ${inputValue} un.`}
                    {progress && <CircularProgress size={24} sx={{
                        marginLeft: '10px',
                        color: Root.color_default,
                    }} />}
                </StylesRemoveItem.retirar>
            )}

            {/* Alerta de Erro de Estoque Insuficiente */}
            {inputValue && Number(inputValue) > quantidadeTotal && (
                <Alert sx={{ width: '80%' }} variant="filled" severity="error">
                    Quantidade maior que a do estoque disponível.
                </Alert>
            )}

            {/* Alerta Dinâmico de Sucesso Operacional */}
            {successMessage && (
                <Alert sx={{ width: '80%' }} variant="filled" severity="success">
                    Retirada concluída com sucesso!
                </Alert>
            )}
        </StylesOptions.paper>
    );
};