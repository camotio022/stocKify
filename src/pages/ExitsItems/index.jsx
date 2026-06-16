import { Fragment, useContext, useEffect, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { Checkbox } from "@mui/material";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";
import { ContainerTableStock } from "../../components/Table/ShowItens";
import { FormatRelativeTime } from "../../components/dateCalcs";
import { LoadingModal } from "../../components/Loadings/loadingStocks";

export const ExitsItems = () => {
    const [loading, setLoading] = useState(true); // 🔓 Começa como true para evitar flash visual
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
        // Segurança: Se não houver dados prontos de login ou tenant, aborta
        if (!user || !tenant?.id || tenant.id === "none") {
            setLoading(false);
            return;
        }

        setLoading(true);

        // 🎯 Aponta para a subcoleção unificada do seu modelo real
        const movimentacoesRef = collection(db, 'tenants', tenant.id, 'movimentacoes');

        // 🛡️ Removemos o orderBy('timestamp') para blindar a query contra campos vazios
        const q = query(
            movimentacoesRef,
            where('tipoMovimentacao', '==', 'saida')
        );

        console.log("📤 Escutando exclusivamente as saídas do tenant em tempo real:", tenant.id);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listaSaidas = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                // 🍎 MAPEAMENTO ALINHADO: Puxa do mapa 'metadata' e 'produto' do seu print de referência!
                const objetoSaida = {
                    id: doc.id,
                    motivo: data.metadata?.motivo || "Retirada de Estoque",
                    quantidade: Number(data.produto?.quantidade || 0),
                    subtotal: Number(data.produto?.subtotal || 0),
                    author: data.metadata?.operador || "Operador",
                    
                    // Une as strings de data e hora do banco em formato ISO legível para ordenação
                    dataEHoraISO: data.dataMovimentacao && data.horaMovimentacao 
                        ? convertToISODate(data.dataMovimentacao, data.horaMovimentacao)
                        : new Date().toISOString(),

                    produto: {
                        id: data.produto?.id || "",
                        nomeItem: data.produto?.nomeItem || "Sem Nome",
                        sku: data.produto?.sku || "N/A"
                    }
                };

                // 🔍 MECANISMO DE FILTRAGEM DINÂMICA (BARRA DE PESQUISA)
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
            })
            .filter(item => item !== null)
            // ⏳ Ordenação cronológica garantida no front (Mais recente primeiro)
            .sort((a, b) => new Date(b.dataEHoraISO) - new Date(a.dataEHoraISO));

            setSaidas(listaSaidas);

            setDownloads(prevState => ({
                ...prevState,
                saidas: listaSaidas,
            }));

            setLoading(false);
        }, (error) => {
            console.error("Erro ao escutar histórico de saídas nas movimentações:", error);
            setLoading(false);
        });

        return () => unsubscribe();

    }, [search, select, user, tenant?.id]);

    // 📅 Conversor utilitário de string DD/MM/AAAA para objeto Date ordenável
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
                    <MuiTableClhild>Item Retirado</MuiTableClhild> 
                    <MuiTableClhild>Motivo</MuiTableClhild>
                    <MuiTableClhild>Qtd Retirada</MuiTableClhild>
                    <MuiTableClhild>Valor Total</MuiTableClhild>
                    <MuiTableClhild>Quem Tirou</MuiTableClhild>
                    <MuiTableClhild>Data/Hora</MuiTableClhild>
                </MuiHeaderTable> : null
            }

            <MuiRowTable>
                {loading ? (
                    <LoadingModal message="Sincronizando as Saídas em tempo real..." />
                ) : saidas.length > 0 ? (
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

                                    {/* 1. Nome do Item vindo do objeto estruturado */}
                                    <MuiTableRowCell>
                                        {item.produto?.nomeItem || '---'}
                                    </MuiTableRowCell>

                                    {/* 2. Motivo Formatado */}
                                    <MuiTableRowCell>
                                        {item.motivo ? item.motivo.replace('_', ' ') : '---'}
                                    </MuiTableRowCell>

                                    {/* 3. Qtd Retirada com tratamento de plural */}
                                    <MuiTableRowCell>
                                        {item.quantidade} {item.quantidade > 1 ? 'unidades' : 'unidade'}
                                    </MuiTableRowCell>

                                    {/* 4. Valor Financeiro Total */}
                                    <MuiTableRowCell>
                                        {item.subtotal ? `R$ ${Number(item.subtotal).toFixed(2)}` : '---'}
                                    </MuiTableRowCell>

                                    {/* 5. Operador (Quem tirou) */}
                                    <MuiTableRowCell>
                                        {item.author || '---'}
                                    </MuiTableRowCell>

                                    {/* 6. Tempo Relativo */}
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
                    <NoTasksFromThisState route={'saidas'} />
                )}
            </MuiRowTable>
        </>)} />
    );
};