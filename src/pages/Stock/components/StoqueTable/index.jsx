import { Checkbox, CircularProgress, Stack, TableContainer, Typography } from '@mui/material';
import { useState, useRef, useContext } from 'react';

import { Root } from '../../../../styles/Root/root_styles';
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from './styles';
import { ArrowDropDown, More, MoreHoriz } from '@mui/icons-material';
import { FormatRelativeTime } from '../../../../components/dateCalcs';
import { Options } from '../../../../components/Options';
import { AuthContext } from '../../../../auth_context';
import { ContainerTableStock } from '../../../../components/Table/ShowItens';
import { LoadingModal } from '../../../../components/Loadings/loadingStocks';

export const EstoqueTable = ({
    selectedItems,
    setSelectedItems,
    stock,
    loading
}) => {

    const {
        enablingDeleteButtom,
        setEnablingDeleteButtom,
        tenant // 🟢 Puxamos o tenant completo aqui de dentro do seu contexto global!
    } = useContext(AuthContext)

    const [options, setOptions] = useState('')
    const [focus, setFocus] = useState(null); // Índice do item focado
    const [disabledItems, setDisabledItems] = useState([]); // Lista de itens desabilitados
    const tableRef = useRef(null);

    const focusItem = (index, item) => {
        if (focus === index) {
            setEnablingDeleteButtom(false)
            setDisabledItems((prev) =>
                prev.includes(item.id)
                    ? prev.filter((id) => id !== item.id)
                    : [...prev, item.id]
            );
        } else {
            setEnablingDeleteButtom(true)
            setFocus(index);
        }
    }

    const handleOptions = (item) => {
        setOptions(item)
    }
    function isItemExpired(expiryDate) {
        if (!expiryDate) return false;
        const itemDate = new Date(expiryDate);
        const currentDate = new Date();
        return itemDate < currentDate;
    }
    return (
        <ContainerTableStock children={(<>
            <LoadingModal open={loading} message="Sincronizando estoque em tempo real..." />
            <Options
                open={!!options}           // 🔥 Converte o objeto do item em um Booleano puro (true se houver item selecionado, false se for null)
                optionItem={options}       // Passa o objeto completo do item selecionado
                name={options?.nomeItem || options?.nome || ''} // Proteção contra quebra usando Optional Chaining (?.)
                setOptions={setOptions}    // Função para limpar o estado e fechar o modal
            />

            {/* 🌟 CABEÇALHOS CAMALEÃO: Muta baseado nas colunas que você configurou no Tenant */}
            {
                loading &&
                <MuiHeaderTable>
                    {tenant.colunasEstoque?.map((coluna, index) => (
                        <MuiTableClhild key={index}>
                            {coluna.label}
                        </MuiTableClhild>
                    ))}
                    {/* Mantém a coluna fixa de ações no final */}
                    <MuiTableClhild sx={{ fontWeight: 'bold', width: '50%' }}>
                        Opções
                    </MuiTableClhild>
                </MuiHeaderTable>
            }

            <MuiRowTable>
                {stock.map((item, index) => {
                    const isFocused = focus === index; // Verifica se o item está focado
                    const isDisabled = disabledItems.includes(item.id); // Verifica se o item está desabilitado

                    return (
                        <MuiTableRow
                            key={item.id}
                            index={index + 1}
                            onClick={() => focusItem(index, item)}
                            sx={
                                isDisabled
                                    ? { opacity: 0.5 } // Estilo para itens desabilitados
                                    : isFocused
                                        ? {
                                            backgroundColor: Root.columnTable,
                                            color: Root.white,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            fontFamily: Root.fontFamilyMonospace,
                                            animation: 'dash 2s infinite'
                                        }
                                        : isItemExpired(item.dataValidade) ? {
                                            // backgroundColor: Root.red,
                                        } : {}
                            }
                        >

                            {tenant?.colunasEstoque?.map((coluna, i) => {
                                const valorCampo = item[coluna.campo];
                                if (coluna.campo === 'preco') {
                                    return (
                                        <MuiTableRowCell key={i}>
                                            R$ {valorCampo}
                                        </MuiTableRowCell>
                                    );
                                }

                                // 2. Tratamento específico para o campo de Data de Chegada (Garante o cálculo relativo)
                                if (coluna.campo === 'dataChegada') {
                                    return (
                                        <MuiTableRowCell key={i}>
                                            <FormatRelativeTime dateTimeString={valorCampo} />
                                        </MuiTableRowCell>
                                    );
                                }

                                // 3. Rende padrão para os outros campos genéricos (Nome, Categoria, Cor, Tamanho, etc.)
                                return (
                                    <MuiTableRowCell key={i}>
                                        {valorCampo !== undefined && valorCampo !== "" ? String(valorCampo) : "---"}
                                        {/* Insere o sulfixo 'unidades' de forma inteligente se for o campo de quantidade */}
                                        {coluna.campo === 'quantidade' && valorCampo && coluna.sufixo &&
                                            ` ${Number(valorCampo) === 1 ? coluna.sufixo[0] : coluna.sufixo[1]}`
                                        }
                                    </MuiTableRowCell>
                                );
                            })}
                            <MuiTableRowCell
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita disparar o foco da linha ao clicar nos três pontinhos
                                    handleOptions(item)
                                }}
                                sx={{
                                    width: '50%',
                                    alignItems: 'center',
                                    zIndex: 1,
                                    '&:hover': {
                                        background: `linear-gradient(90deg,  #822e91 30%, #cd3fe6 100%) !important`,
                                        transform: 'scale(1.02)',
                                        boxShadow: `0 0 3px ${Root.color_button}`,
                                        color: Root.color_app_bar,
                                        borderRadius: '8px',
                                    },
                                }}>
                                <MoreHoriz />
                            </MuiTableRowCell>
                        </MuiTableRow>
                    )
                })}
            </MuiRowTable>
        </>)} />
    );
};