import { Fragment, useContext, useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(true); // 🔥 SOLUÇÃO: Começa como true para blindar o flash visual
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

    useEffect(() => {
        // Segurança: Se não houver dados prontos de login ou tenant, desliga a carga e aborta
        if (!user || !tenant?.id || tenant.id === "none") {
            setLoading(false);
            return;
        }

        setLoading(true);

        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');

        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'saida'),
            orderBy('timestamp', 'desc')
        );

        console.log("📤 Escutando exclusivamente as saídas do tenant:", tenant.id);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaSaidas = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                const objetoSaida = {
                    id: doc.id,
                    motivo: data.motivo || "",
                    quantidade: data.quantidade || 0,
                    subtotal: data.subtotal || 0,
                    timestamp: data.timestamp,
                    author: data.author?.userName || "",
                    produto: data.produto || {}
                };

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

            setDownloads(prevState => ({
                ...prevState,
                saidas: listaSaidas,
            }));

            setLoading(false); // 🔓 Trava desligada: dados processados e filtrados na memória
        }, (error) => {
            console.error("Erro ao escutar histórico de saídas:", error);
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
            {saidas.length > 0 ?
                <MuiHeaderTable>
                    <MuiTableClhild>
                        <Checkbox
                            sx={{ color: Root.white }}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                const newSelected = isChecked ? saidas.map(item => item.id) : [];
                                setSelectedItems(newSelected);
                            }}
                        />
                    </MuiTableClhild>
                    <MuiTableClhild>Item Retirado</MuiTableClhild> {/* 💡 Adicionado para casar com o dado */}
                    <MuiTableClhild>Motivo</MuiTableClhild>
                    <MuiTableClhild>Qtd Retirada</MuiTableClhild>
                    <MuiTableClhild>Valor Total</MuiTableClhild>
                    <MuiTableClhild>Quem Tirou</MuiTableClhild>
                    <MuiTableClhild>Data/Hora</MuiTableClhild>
                </MuiHeaderTable> : null
            }

            <MuiRowTable>
                {loading ? (
                    /* ⏳ ESTADO 1: Firebase trabalhando -> Mostra única e exclusivamente o Skeleton */
                    <LoadingTable />
                ) : saidas.length > 0 ? (
                    /* 📊 ESTADO 2: Carga finalizada e existem registros -> Renderiza o grid */
                    <Fragment>
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
                                    <MuiTableRowCell>
                                        <Checkbox
                                            sx={{ color: Root.white }}
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </MuiTableRowCell>

                                    {/* 1. Item Retirado */}
                                    <MuiTableRowCell>
                                        {item.produto?.nomeItem || '---'}
                                    </MuiTableRowCell>

                                    {/* 2. Motivo */}
                                    <MuiTableRowCell>
                                        {item.motivo ? item.motivo.replace('_', ' ') : '---'}
                                    </MuiTableRowCell>

                                    {/* 3. Qtd Retirada */}
                                    <MuiTableRowCell>
                                        {item.quantidade} {item.quantidade > 1 ? 'unidades' : 'unidade'}
                                    </MuiTableRowCell>

                                    {/* 4. Valor Total */}
                                    <MuiTableRowCell>
                                        {item.subtotal ? `R$ ${Number(item.subtotal).toFixed(2)}` : '---'}
                                    </MuiTableRowCell>

                                    {/* 5. Quem Tirou */}
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
                    </Fragment>
                ) : (
                    /* 📦 ESTADO 3: Carga finalizada e subcoleção limpa -> Chama o Empty State automatizado */
                    <NoTasksFromThisState route={'saidas'} />
                )}
            </MuiRowTable>
        </>)} />
    );
};