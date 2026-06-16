import { Fragment, useContext, useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { ContainerTableStock } from "../../components/Table/ShowItens";
import { FormatRelativeTime } from "../../components/dateCalcs";
import { LoadingTable } from "../../components/LoadingSkeletonCard";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";
import { LoadingModal } from "../../components/Loadings/loadingStocks";

export const Entradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(true); 
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
        if (!user || !tenant?.id || tenant.id === "none") {
            setLoading(false);
            return;
        }

        setLoading(true);

        // 🎯 Rota de subcoleção sênior unificada
        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');
        
        // 🛡️ Removemos o orderBy('timestamp') para evitar o crash de campo inexistente
        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'entrada')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaEntradas = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                
                // 🍎 MAPEAMENTO REAL: Puxa os dados de dentro de 'metadata' e 'produto' do seu print!
                const objetoEntrada = {
                    id: doc.id,
                    motivo: data.metadata?.motivo || "Cadastro Inicial",
                    fornecedor: data.metadata?.fornecedor || "N/A",
                    quantidade: Number(data.produto?.quantidade || 0),
                    subtotal: Number(data.produto?.subtotal || 0),
                    author: data.metadata?.operador || "Operador",
                    
                    // Une os seus campos de string para o FormatRelativeTime conseguir computar
                    dataEHoraISO: data.dataMovimentacao && data.horaMovimentacao 
                        ? convertToISODate(data.dataMovimentacao, data.horaMovimentacao)
                        : new Date().toISOString(),
                        
                    produto: {
                        id: data.produto?.id || "",
                        nomeItem: data.produto?.nomeItem || "Sem Nome",
                        sku: data.produto?.sku || "N/A"
                    }
                };

                // 🔍 MECANISMO DE BUSCA INTELIGENTE ADAPTADO
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
            })
            .filter(item => item !== null)
            // ⏳ Ordenação feita diretamente no Front para simular o 'desc' por data/hora com segurança
            .sort((a, b) => new Date(b.dataEHoraISO) - new Date(a.dataEHoraISO));

            setEntradas(listaEntradas);

            setDownloads(prevState => ({
                ...prevState,
                entradas: listaEntradas,
            }));
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar histórico de entradas nas movimentações:", error);
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, [search, select, user, tenant?.id]);

    // 📅 Função auxiliar sênior para transformar sua data e hora manuais em formato ordenável
    function convertToISODate(dataStr, horaStr) {
        try {
            const [dia, mes, ano] = dataStr.split('/');
            return `${ano}-${mes}-${dia}T${horaStr}`;
        } catch {
            return new Date().toISOString();
        }
    }

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
            {entradas.length > 0 ? <MuiHeaderTable>
                <MuiTableClhild>
                    <Checkbox
                        sx={{ ml: 0.7, color: Root.white }}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newSelected = isChecked ? entradas.map(item => item.id) : [];
                            setSelectedItems(newSelected);
                        }}
                    />
                </MuiTableClhild>
                <MuiTableClhild>Item Adicionado</MuiTableClhild>
                <MuiTableClhild>Motivo</MuiTableClhild>
                <MuiTableClhild>Qtd Adicionada</MuiTableClhild>
                <MuiTableClhild>Custo Total</MuiTableClhild>
                <MuiTableClhild>Quem Adicionou</MuiTableClhild>
                <MuiTableClhild>Data/Hora</MuiTableClhild>
            </MuiHeaderTable> : null}

            <MuiRowTable>
                {loading ? (
                    <LoadingModal message="Sincronizando as Entradas em tempo real..." />
                ) : entradas.length > 0 ? (
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
                                    <MuiTableRowCell>
                                        <Checkbox
                                            sx={{ color: Root.white }}
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </MuiTableRowCell>

                                    {/* Exibe o nome de dentro do objeto produto estruturado */}
                                    <MuiTableRowCell>
                                        {item.produto?.nomeItem || '---'}
                                    </MuiTableRowCell>

                                    <MuiTableRowCell>
                                        {item.motivo ? item.motivo.replace('_', ' ') : '---'}
                                    </MuiTableRowCell>

                                    <MuiTableRowCell>
                                        {item.quantidade} {item.quantidade > 1 ? 'unidades' : 'unidade'}
                                    </MuiTableRowCell>

                                    <MuiTableRowCell>
                                        {item.subtotal ? `R$ ${Number(item.subtotal).toFixed(2)}` : '---'}
                                    </MuiTableRowCell>

                                    <MuiTableRowCell>
                                        {item.author || '---'}
                                    </MuiTableRowCell>

                                    <MuiTableRowCell>
                                        {item.dataEHoraISO ? (
                                            <FormatRelativeTime
                                                dateTimeString={item.dataEHoraISO}
                                            />
                                        ) : '---'}
                                    </MuiTableRowCell>
                                </MuiTableRow>
                            );
                        })}
                    </Fragment>
                ) : (
                    <NoTasksFromThisState route={'entradas'} />
                )}
            </MuiRowTable>
        </>)} />
    );
};