import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Checkbox } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { ContainerTableStock } from "../../components/Table/ShowItens";
import { FormatRelativeTime } from "../../components/dateCalcs";
import { LoadingTable } from "../../components/LoadingSkeletonCard";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";

export const Entradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        user,
        setDownloads,
        search,
        select,
        tenant
    } = useContext(AuthContext);
    
    const [focus, setFocus] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

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

    useEffect(() => {
        // Segurança: Só ativa o listener se houver usuário e tenant ativo real
        if (!user || !tenant?.id || tenant.id === "none") return;

        setLoading(true);

        // 🚀 NOVA ROTA DE DADOS: Subcoleção unificada dentro do tenant ativo
        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');
        
        // 🔥 TRAVA CIRÚRGICA: Traz apenas registros de ENTRADA ordenados por data
        // Nota: Lembre-se de clicar no link do console do navegador no primeiro teste para criar o Índice Composto se necessário!
        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'entrada'),
            orderBy('timestamp', 'desc')
        );

        console.log("📥 Escutando exclusivamente as entradas do tenant:", tenant.id);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaEntradas = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                // Objeto de entrada perfeitamente estruturado de acordo com o novo modelo
                const objetoEntrada = {
                    id: doc.id,
                    motivo: data.motivo || "",
                    quantidade: data.quantidade || 0,
                    custoUnitario: data.custoUnitario || 0,
                    subtotal: data.subtotal || 0,
                    timestamp: data.timestamp,
                    author: data.author?.userName || "",
                    produto: data.produto || {} // Dados denormalizados do produto (Nome, SKU, etc.)
                };

                // 🔍 Sistema de busca e filtros locais mantido do seu contexto
                if (!search && !select) {
                    return objetoEntrada;
                } else {
                    const valorParaFiltrar = select === 'nomeItem' ? objetoEntrada.produto?.nomeItem : objetoEntrada[select];
                    if (
                        (!search || (valorParaFiltrar && String(valorParaFiltrar).toLowerCase().includes(search.toLowerCase()))) &&
                        (!select || select === "" || valorParaFiltrar)
                    ) {
                        return objetoEntrada;
                    }
                    return null;
                }
            }).filter(item => item !== null);

            setEntradas(listaEntradas);
            
            // Alimenta a sua estrutura global de downloads mantendo compatibilidade
            setDownloads(prevState => ({
                ...prevState,
                entradas: listaEntradas,
            }));
            
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar histórico de entradas:", error);
            setLoading(false);
        });

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
            {entradas.length > 0 && (
                <MuiHeaderTable>
                    {/* Coluna do Checkbox Geral */}
                    <MuiTableClhild sx={{ }}>
                        <Checkbox
                            sx={{ ml: 0.7, color: Root.white }}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                const newSelected = isChecked ? entradas.map(item => item.id) : [];
                                setSelectedItems(newSelected);
                            }}
                        />
                    </MuiTableClhild>
                    {/* 🔒 Seus Cabeçalhos Fixos e Universais para Entradas */}
                    <MuiTableClhild>Item Adicionado</MuiTableClhild>
                    <MuiTableClhild>Motivo</MuiTableClhild>
                    <MuiTableClhild>Qtd Adicionada</MuiTableClhild>
                    <MuiTableClhild>Custo Total</MuiTableClhild>
                    <MuiTableClhild>Quem Adicionou</MuiTableClhild>
                    <MuiTableClhild>Data/Hora</MuiTableClhild>
                </MuiHeaderTable>
            )}

            <MuiRowTable>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <Fragment>
                        {entradas.map((item, index) => {
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
                                            sx={{ color: Root.white  }}
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </MuiTableRowCell>

                                    {/* 📦 Cruzamento Perfeito com cada Cabeçalho acima: */}
                                    
                                    {/* 1. Item Adicionado (Nome do Produto vindo do objeto denormalizado) */}
                                    <MuiTableRowCell>
                                        {item.produto?.nomeItem || '---'}
                                    </MuiTableRowCell>

                                    {/* 2. Motivo */}
                                    <MuiTableRowCell>
                                        {item.motivo ? item.motivo.replace('_', ' ') : '---'}
                                    </MuiTableRowCell>

                                    {/* 3. Qtd Adicionada */}
                                    <MuiTableRowCell>
                                        {item.quantidade} {item.quantidade > 1 ? 'unidades' : 'unidade'}
                                    </MuiTableRowCell>

                                    {/* 4. Custo Total (Subtotal pago ao fornecedor) */}
                                    <MuiTableRowCell>
                                        {item.subtotal ? `R$ ${Number(item.subtotal).toFixed(2)}` : '---'}
                                    </MuiTableRowCell>

                                    {/* 5. Quem Adicionou */}
                                    <MuiTableRowCell>
                                        {item.author || '---'}
                                    </MuiTableRowCell>

                                    {/* 6. Data/Hora */}
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
                        {entradas.length === 0 && <NoTasksFromThisState routeTasks={'entradas'} />}
                    </Fragment>
                )}
            </MuiRowTable>
        </>)} />
    );
};