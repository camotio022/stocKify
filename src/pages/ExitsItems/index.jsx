import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { Checkbox, TableContainer } from "@mui/material";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";
import { LoadingTable } from "../../components/LoadingSkeletonCard";
export const ExitsItems = () => {
    const [loading, setLoading] = useState(false)
    const { setDownloads, search, select, user } = useContext(AuthContext)
    const [saidas, setSaidas] = useState([])
    const tableRef = useRef(null);
    const [focus, setFocus] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const headerInfos = [
        'Item',
        'Quantidade Retirada',
        'Validade do Pacote',
        'Data/Horas',
        'Quem Tirou'
    ];
    const focusItem = (index) => {
        setFocus(index)
    }
    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    useEffect(() => {
        // 1. Segurança: Só ativa o listener se o usuário estiver logado e tiver uma empresa mapeada
        if (!user || !user.tenant) return;

        setLoading(true);

        // 2. Cria a Query amarrada ao tenantId da empresa atual
        const q = query(
            collection(db, 'saidas'),
            where('tenant', '==', user.tenant) // 🔥 Trava multi-tenant: isola as saídas por empresa
        );
        console.log(q)
        // 3. Executa o listener em tempo real diretamente na Query filtrada
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const stockItems = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                // Renderização padrão sem filtros de pesquisa na UI
                if (!search && !select) {
                    return {
                        tenant: user.tenant,
                        id: doc.id,
                        nome: data.nomeItem || "",
                        quantidade: data.quantidade || "",
                        dataValidade: data.dataValidade || "",
                        dataRetirada: data.dataRetirada || "",
                        horaRetirada: data.horaRetirada || "",
                        author: data.author?.userName || "", // 💡 Modificado para evitar quebras se o author sumir
                    };
                } else {
                    // Filtros aplicados localmente na tabela de saídas
                    if ((!search || (data[select] && data[select].toLowerCase().includes(search.toLowerCase()))) && (!select || select === "" || data[select])) {
                        return {
                            id: doc.id,
                            nome: data.nomeItem || "",
                            quantidade: data.quantidade || "",
                            dataValidade: data.dataValidade || "",
                            dataRetirada: data.dataRetirada || "",
                            horaRetirada: data.horaRetirada || "",
                            author: data.author?.userName || "",
                        };
                    } else {
                        return null;
                    }
                }
            }).filter(item => item !== null);

            setSaidas(stockItems);
            setDownloads(prevState => ({
                ...prevState,
                saidas: stockItems,
            }));
            setLoading(false);
            console.log('Saídas atualizadas com sucesso para o tenant:', user.tenant);
        }, (error) => {
            console.error("Erro ao buscar saídas:", error);
            setLoading(false); // Garante que desliga o loading mesmo se o Firebase der erro de permissão
        });

        // 4. Limpeza correta: o useEffect agora recebe diretamente a função de desmontagem
        return () => unsubscribe();

        // 💡 Adicionado as dependências necessárias para re-executar a busca se os filtros ou o tenant mudarem
    }, [search, select, user?.tenant]);


    const selectSx = {
        border: `1px dashed ${Root.color_button}`,
        backgroundColor: Root.color_button_secondary,
        color: Root.color_button,
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        animation: 'dash 2s infinite'
    }
    return (

        <TableContainer sx={{
            backgroundColor: Root.color_default,
            ...Root.scrollBar,
            width: '100%',
            boxSizing: 'border-box',
            border: '2px solid white'
        }} ref={tableRef}>
            <MuiHeaderTable>
                <MuiTableClhild sx={{
                    width: '50%',

                }}>
                    <Checkbox
                        sx={{
                            color: Root.color_button
                        }}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newSelectedItems = isChecked ? saidas.map(item => item.item) : [];
                            setSelectedItems(newSelectedItems);
                        }}
                    />
                </MuiTableClhild>
                {headerInfos.map((header, index) => (
                    <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                ))}
            </MuiHeaderTable>
            <MuiRowTable>
                {loading ?
                    <LoadingTable />
                    :
                    <Fragment>
                        {saidas.map((item, index) => (
                            <MuiTableRow
                                index={index + 1}
                                onClick={() => focusItem(index)}
                                sx={selectedItems.includes(item.item) || (focus === index) ? selectSx : null}
                                key={index}>
                                <MuiTableRowCell sx={{
                                    width: '50%',
                                    color: Root.color_button,
                                }}>
                                    <Checkbox
                                        sx={{
                                            color: Root.color_button
                                        }}
                                        checked={selectedItems.includes(item.item)}
                                        onChange={() => handleCheckboxChange(item.item)}
                                    />
                                </MuiTableRowCell>
                                {Object.entries(item).map(([key, value], i) => {
                                    if (key === 'dataRetirada') {
                                        return (
                                            <MuiTableRowCell key={i}>
                                                {item.dataRetirada}/{item.horaRetirada ? item.horaRetirada : 'null'}
                                            </MuiTableRowCell>
                                        )
                                    }
                                    if (key !== 'id' && key !== 'horaRetirada') {
                                        return (
                                            <MuiTableRowCell key={i}>{
                                                key === 'quantidade' ? (item.quantidade > 1
                                                    ? `${item.quantidade} unidades`
                                                    : `${item.quantidade} unidade`)
                                                    : value
                                            }</MuiTableRowCell>
                                        );
                                    }
                                    return null;
                                })}
                            </MuiTableRow>
                        ))}
                        {(saidas.length < 0) && <NoTasksFromThisState routeTasks={'saídas'} />}
                    </Fragment>
                }
            </MuiRowTable>
        </TableContainer>

    )
}