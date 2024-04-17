import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { Checkbox, TableContainer } from "@mui/material";
import { MuiHeaderTable, MuiRowTable, MuiTableClhild, MuiTableRow, MuiTableRowCell } from "../Stock/components/StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { NoTasksFromThisState } from "../../components/NoTaskThisStates";
import { LoadingTable } from "../../components/LoadingSkeletonCard";
export const ExitsItems = () => {
    const [loading, setLoading] = useState(false)
    const { setDownloads } = useContext(AuthContext)
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
    const fetchData = async () => {
        setLoading(true)
        const unsubscribe = onSnapshot(collection(db, 'saidas'), (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    nome: data.nomeItem || "",
                    quantidade: data.quantidade || "",
                    dataValidade: data.dataValidade || "",
                    dataRetirada: data.dataRetirada || "",
                    horaRetirada: data.horaRetirada || "",
                    author: data.author.userName || "",
                };
            });
            setSaidas(stockItems);
            setDownloads(prevState => ({
                ...prevState,
                saidas: stockItems,
            }));
            setLoading(false)
            console.log('passou')
        });
        return () => unsubscribe();

    }
    useEffect(() => {
        fetchData();
    }, []);


    const selectSx = {
        border: `1px dashed ${Root.color_button}`,
        backgroundColor: Root.color_button_opacity,
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
                        {saidas.length > 0 ? saidas.map((item, index) => (
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
                        )) : (<>
                            <NoTasksFromThisState />
                        </>)}
                    </Fragment>
                }
            </MuiRowTable>
        </TableContainer>

    )
}