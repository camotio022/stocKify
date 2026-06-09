import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { Checkbox } from "@mui/material";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";
import { LoadingTable } from "../../components/LoadingSkeletonCard";
import { ContainerTableStock } from "../../components/Table/ShowItens";
import { FormatRelativeTime } from "../../components/dateCalcs";

export const ExitsItems = () => {
    const [loading, setLoading] = useState(false);
    const { setDownloads, search, select, user, tenant } = useContext(AuthContext);
    const [saidas, setSaidas] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [focus, setFocus] = useState(null);

    const focusItem = (index) => {
        setFocus(index);
    };

    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Extrai as colunas dinâmicas que o tenant configurou para o estoque
    const colunasDinamicas = tenant?.colunasEstoque || [];

    useEffect(() => {
        // Segurança: Só ativa o listener se houver usuário e tenant ativo real
        if (!user || !tenant?.id || tenant.id === "none") return;

        setLoading(true);

        // 🚀 ROTA DE DADOS ATUALIZADA: Subcoleção dentro do tenant ativo
        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');

        // 🔥 TRAVA CIRÚRGICA: Traz apenas documentos de SAÍDA ordenados por data
        // Nota: Lembre-se de clicar no link do console do navegador no primeiro teste para criar o Índice Composto!
        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'saida'),
            orderBy('timestamp', 'desc')
        );

        console.log("📤 Escutando exclusivamente as saídas do tenant:", tenant.id);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaSaidas = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                // Objeto de saída perfeitamente estruturado
                const objetoSaida = {
                    id: doc.id,
                    motivo: data.motivo || "",
                    quantidade: data.quantidade || 0,
                    subtotal: data.subtotal || 0,
                    timestamp: data.timestamp,
                    author: data.author?.userName || "",
                    produto: data.produto || {} // Dados denormalizados do produto para o modo camaleão
                };

                // 🔍 Sistema de busca e filtros locais baseado no contexto do app
                if (!search && !select) {
                    return objetoSaida;
                } else {
                    const valorParaFiltrar = select === 'nomeItem' ? objetoSaida.produto?.nomeItem : objetoSaida[select];
                    if (
                        (!search || (valorParaFiltrar && String(valorParaFiltrar).toLowerCase().includes(search.toLowerCase()))) &&
                        (!select || select === "" || valorParaFiltrar)
                    ) {
                        return objetoSaida;
                    }
                    return null;
                }
            }).filter(item => item !== null);

            setSaidas(listaSaidas);

            // Alimenta a sua estrutura global de downloads mantendo compatibilidade
            setDownloads(prevState => ({
                ...prevState,
                saidas: listaSaidas,
            }));

            setLoading(false);
        }, (error) => {
            console.error("Erro ao escutar histórico de saídas:", error);
            setLoading(false);
        });

        // Limpeza do listener ao desmontar a tela
        return () => unsubscribe();

    }, [search, select, user, tenant?.id]);
    const selectSx = {
        backgroundColor: Root.cyan,
        color: Root.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        animation: 'dash 2s infinite'
    };

    return (
        <ContainerTableStock children={(<>
            <MuiHeaderTable>
                {/* Coluna do Checkbox Geral no Cabeçalho */}
                <MuiTableClhild >
                    <Checkbox
                        sx={{ color: Root.white }}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newSelected = isChecked ? saidas.map(item => item.id) : [];
                            setSelectedItems(newSelected);
                        }}
                    />
                </MuiTableClhild>

                {/* 🔒 Seus Cabeçalhos Fixos e Universais */}
                <MuiTableClhild>Motivo</MuiTableClhild>
                <MuiTableClhild>Qtd Retirada</MuiTableClhild>
                <MuiTableClhild>Valor Total</MuiTableClhild>
                <MuiTableClhild>Quem Tirou</MuiTableClhild>
                <MuiTableClhild>Data/Hora</MuiTableClhild>
            </MuiHeaderTable>
            <MuiRowTable>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <>
                        {saidas.map((item, index) => {
                            const isSelected = selectedItems.includes(item.id);
                            const isFocused = focus === index;
                            return (
                                <MuiTableRow
                                    index={index + 1}
                                    onClick={() => focusItem(index)}
                                    sx={isSelected || isFocused ? selectSx : null}
                                    key={item.id}
                                >
                                    {/* Checkbox Individual */}
                                    <MuiTableRowCell>
                                        <Checkbox
                                            sx={{ color: Root.white }}
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </MuiTableRowCell>

                                    {/* 📦 Cruzamento Perfeito com cada Cabeçalho acima: */}

                                    {/* 1. Motivo */}
                                    <MuiTableRowCell>
                                        {item.motivo ? item.motivo.replace('_', ' ') : '---'}
                                    </MuiTableRowCell>

                                    {/* 2. Qtd Retirada */}
                                    <MuiTableRowCell>
                                        {item.quantidade} {item.quantidade > 1 ? 'unidades' : 'unidade'}
                                    </MuiTableRowCell>

                                    {/* 3. Valor Total */}
                                    <MuiTableRowCell>
                                        {item.subtotal ? `R$ ${Number(item.subtotal).toFixed(2)}` : '---'}
                                    </MuiTableRowCell>

                                    {/* 4. Quem Tirou */}
                                    <MuiTableRowCell>
                                        {item.author || '---'}
                                    </MuiTableRowCell>

                                    {/* 5. Data/Hora */}
                                    <MuiTableRowCell>
                                        {item.timestamp ? (
                                            <FormatRelativeTime
                                                dateTimeString={item.timestamp.toDate ? item.timestamp.toDate().toISOString() : item.timestamp}
                                            />
                                        ) : '---'}
                                    </MuiTableRowCell>
                                </MuiTableRow>
                            );
                        })}
                    </>
                )}

            </MuiRowTable>
        </>)} />
    );
};