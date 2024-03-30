import { useContext, useEffect, useRef, useState } from "react";
import { TagsExits } from "../ExitsItems/styles"
import { TableContainer } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { collection, onSnapshot } from "firebase/firestore";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
export const Entradas = () => {
    const [entradas, setEntradas] = useState([])
    const { user, setDownloads } = useContext(AuthContext)
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
        const c = collection(db, 'entradas')
        const unsubscribe = onSnapshot(c, (querySnapshot) => {
            const stockItems = querySnapshot.docs.map((doc) => {
                const data = doc.data();
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
            });
            setEntradas(stockItems)
            setDownloads(prevState => ({
                ...prevState,
                entradas: stockItems,
            }));
        });

        return () => unsubscribe();
    }, []);

    return (
        <TagsExits.container>
            <TagsExits.containerTable sx={{
                mt: selectedItems.length > 0 ? '0px' : '17px',
            }}>
                <TableContainer sx={{
                    ...Root.scrollBar,
                    width: '100%',
                    boxSizing: 'border-box'
                }} ref={tableRef}>
                    <MuiHeaderTable>
                        {headerkeys.map((header, index) => (
                            <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
                        ))}
                    </MuiHeaderTable>
                    <MuiRowTable>
                        {entradas.map((item, index) => (
                            <MuiTableRow
                                sx={selectedItems.includes(item.item) || (focus === index) ? selectSx : null}
                                key={index}>
                                {Object.entries(item).map(([key, value], i) => {
                                    if (key === 'author') {
                                        return (
                                            <MuiTableRowCell key={i}>
                                                {item.author.userName}
                                            </MuiTableRowCell>
                                        );
                                    }
                                    return (
                                        <MuiTableRowCell sx={key === 'id' && {
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            borderLeft: `1px solid ${Root.color_button_opacity}`

                                        }} key={i}>{
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

            </TagsExits.containerTable>
        </TagsExits.container>
    )
}