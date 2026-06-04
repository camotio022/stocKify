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
import { ContainerTableStock } from "../../components/Table/ShowItens";
export const ExitsItems = () => {
    const [loading, setLoading] = useState(false)
    const { setDownloads, search, select, user, tenant } = useContext(AuthContext)
    const [saidas, setSaidas] = useState([])
    const tableRef = useRef(null);
    const [focus, setFocus] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const headerInfos = [
        'Nome dos items',
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
    // 1. Segurança: Só ativa o listener se o usuário estiver logado e tiver o tenant global mapeado
    if (!user || !tenant) return;

    setLoading(true);

    // 🟢 ACESSO CORRIGIDO: Extraindo o ID do texto puro de dentro do objeto tenant
    const tenantIdPuro = tenant.id;

    // 2. Cria a Query amarrada ao ID real da empresa atual
    const q = query(
        collection(db, 'saidas'),
        where('tenant', '==', tenantIdPuro) // 🔥 Agora sim isolando as saídas usando a string correta
    );
    
    console.log("🟢 Escutando saídas do tenant ativo:", tenantIdPuro);

    // 3. Executa o listener em tempo real diretamente na Query filtrada
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const stockItems = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            // Renderização padrão sem filtros de pesquisa na UI
            if (!search && !select) {
                return {
                    tenant: tenantIdPuro, // Atualizado para usar o ID limpo
                    id: doc.id,
                    nome: data.nomeItem || "",
                    quantidade: data.quantidade || "",
                    dataValidade: data.dataValidade || "",
                    dataRetirada: data.dataRetirada || "",
                    horaRetirada: data.horaRetirada || "",
                    author: data.author?.userName || "", 
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
        console.log('Saídas atualizadas com sucesso para o tenant:', tenantIdPuro);
    }, (error) => {
        console.error("Erro ao buscar saídas:", error);
        setLoading(false); 
    });

    // 4. Limpeza correta do listener ao desmontar o componente
    return () => unsubscribe();

    // 💡 REPARADO: Vigiando as dependências corretas, trocando user?.tenant por tenant puro
}, [search, select, user, tenant]);

    const selectSx = {
        backgroundColor: Root.cyan,
        color: Root.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: Root.fontFamilyMonospace,
        animation: 'dash 2s infinite'
    }
    return (
        <ContainerTableStock children={(<>
            {(saidas.length > 0) &&
                <MuiHeaderTable>
                    <MuiTableClhild sx={{
                        width: '50%',
                    }}>
                        <Checkbox
                            sx={{
                                ml: 0.7,
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
                        <MuiTableClhild key={index}>{header}</MuiTableClhild>
                    ))}
                </MuiHeaderTable>}
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
                                    if ((key === 'tenant')) {
                                        return null
                                    }
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
        </>)} />
    )
}