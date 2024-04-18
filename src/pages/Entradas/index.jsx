import { useContext, useEffect, useRef, useState } from "react";
import { TagsExits } from "../ExitsItems/styles"
import { TableContainer } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { collection, onSnapshot } from "firebase/firestore";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown, CheckBox } from "@mui/icons-material";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
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
        'ID',
        'Catégoria',
        'Nome',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada',
        'Quem adicionou'
    ]
    useEffect(() => {
        const c = collection(db, 'entradas');
        const unsubscribe = onSnapshot(c, (querySnapshot) => {
            const stockItems = querySnapshot.docs.map((doc) => {
                const data = doc.data();
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
    }, [search, select]);

    return (

        <TableContainer sx={{
            ...Root.scrollBar,
            width: '1oo%',
            boxSizing: 'border-box',
            backgroundColor: Root.color_default,
            borderRadius: '4px',
            border: '2px solid white'
        }} ref={tableRef}>
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
                    <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                ))}
            </MuiHeaderTable>
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
        </TableContainer>
    )
}