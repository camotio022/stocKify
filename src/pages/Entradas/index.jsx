import { Fragment, useContext, useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(true); // 🔥 COMEÇA COMO TRUE para evitar flashes de "sem dados"
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

        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');
        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'entrada'),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaEntradas = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                const objetoEntrada = {
                    id: doc.id,
                    motivo: data.motivo || "",
                    quantidade: data.quantidade || 0,
                    custoUnitario: data.custoUnitario || 0,
                    subtotal: data.subtotal || 0,
                    timestamp: data.timestamp,
                    author: data.author?.userName || "",
                    produto: data.produto || {}
                };

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

            setDownloads(prevState => ({
                ...prevState,
                entradas: listaEntradas,
            }));

            setLoading(false); // 🔥 Terminou de baixar e filtrar? Desliga o loading
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
            {/* 🔒 CABEÇALHO FIXO: Ele sempre fica na tela, protegendo o esqueleto ou a tabela contra quebras de layout */}
            {entradas.length > 0 ?  <MuiHeaderTable>
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
            </MuiHeaderTable>: null}

            <MuiRowTable>
                {loading ? (
                    /* ⏳ ESTADO 1: Se estiver carregando, mostra APENAS o esqueleto */
                    <LoadingTable />
                ) : entradas.length > 0 ? (
                    /* 📊 ESTADO 2: Se o loading acabou e existem dados, renderiza a lista */
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
                    /* 📦 ESTADO 3: Se o loading acabou e o array está zerado, mostra o Empty State premium */
                    <NoTasksFromThisState route={'entradas'} />
                )}
            </MuiRowTable>
        </>)} />
    );
};