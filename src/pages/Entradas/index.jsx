import { useContext, useEffect, useRef, useState } from "react";
import { TagsExits } from "../ExitsItems/styles"
import { TableContainer } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown, CheckBox } from "@mui/icons-material";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { ContainerTableStock } from "../../components/Table/ShowItens";
export const Entradas = () => {
    const [entradas, setEntradas] = useState([])
    const {
        user,
        setDownloads,
        search,
        select,
    } = useContext(AuthContext)
    const tableRef = useRef(null);
    const [focus, setFocus] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const headerkeys = [
        'Catégoria dos Items',
        'Nome dos Produtos',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada',
        'Quem adicionou'
    ]

    useEffect(() => {
        // 1. Segurança: Se o usuário não estiver carregado ou não tiver uma empresa vinculada, não faz nada
        if (!user || !user.tenant) return;

        // 2. Cria a Query filtrando direto no Firestore pelo tenantId da empresa do usuário
        const q = query(
            collection(db, 'entradas'),
            where('tenant', '==', user.tenant) // 🔥 Trava de segurança: impede o vazamento de dados
        );
        console.log(q, 'wui')
        // 3. O listener em tempo real agora só escuta o que pertence a esta empresa
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const stockItems = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                // Renderização padrão se não houver filtros de busca na UI
                if (!search && !select) {
                    return {
                        id: doc.id,
                        categoria: data.categoria || "",
                        nome: data.nome || "",
                        quantidade: data.quantidade || "",
                        dataValidade: data.dataValidade || "",
                        dataChegada: data.dataChegada || "",
                        author: {
                            userName: data.author?.userName || (user.name === 'none' ? 'Junta Mais' : user.name),
                            userEmail: data.author?.userEmail || user.email,
                            userId: data.author?.userId || user.id,
                        }
                    };
                } else {
                    // Filtros de busca aplicados localmente na tela
                    if ((!search || (data[select] && data[select].toLowerCase().includes(search.toLowerCase()))) && (!select || select === "" || data[select])) {
                        return {
                            id: doc.id,
                            categoria: data.categoria || "",
                            nome: data.nome || "",
                            quantidade: data.quantidade || "",
                            dataValidade: data.dataValidade || "",
                            dataChegada: data.dataChegada || "",
                            author: {
                                userName: data.author?.userName || (user.name === 'none' ? 'Junta Mais' : user.name),
                                userEmail: data.author?.userEmail || user.email,
                                userId: data.author?.userId || user.id,
                            }
                        };
                    } else {
                        return null;
                    }
                }
            }).filter(item => item !== null);

            setEntradas(stockItems);
            setDownloads(prevState => ({
                ...prevState,
                entradas: stockItems,
            }));
        });

        return () => unsubscribe();
        // 💡 IMPORTANTE: Adicionei user.tenantId nas dependências para refazer o listener se mudar de empresa
    }, [search, select, user?.tenant]);

    return (

        <ContainerTableStock children={(<>
            {(entradas.length > 0) &&
                <MuiHeaderTable>
                    <MuiTableClhild sx={{
                        width: '50%',
                        ml: '12px'
                    }}>
                        <CheckBox
                            sx={{
                                color: Root.color_button
                            }}
                        />
                    </MuiTableClhild>
                    {headerkeys.map((header, index) => (
                        <MuiTableClhild key={index}>{header}</MuiTableClhild>
                    ))}
                </MuiHeaderTable>}
            <MuiRowTable>
                {entradas.map((item, index) => (
                    <MuiTableRow
                        index={index + 1}
                        sx={selectedItems.includes(item.item) || (focus === index) ? selectSx : null}
                        key={index}>
                        <MuiTableClhild sx={{
                            width: '50%',
                            ml: '12px'
                        }}>
                            <CheckBox
                                sx={{
                                    color: Root.color_button
                                }}
                                checked={false}
                            />
                        </MuiTableClhild>
                        {Object.entries(item).map(([key, value], i) => {
                            if ((key === 'id')) {
                                return null
                            }
                            if (key === 'author') {
                                return (
                                    <MuiTableRowCell key={i}>
                                        {item.author.userName}
                                    </MuiTableRowCell>
                                );
                            }
                            return (
                                <MuiTableRowCell key={i}>{
                                    key === 'quantidade' ? (item.quantidade > 1
                                        ? `${item.quantidade} unidades`
                                        : `${item.quantidade} unidade`)
                                        : value
                                }</MuiTableRowCell>
                            );

                            return null;
                        })}
                    </MuiTableRow>
                ))}
            </MuiRowTable>
        </>)} />

    )
}