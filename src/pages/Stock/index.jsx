import { Stack } from "@mui/material"
import {
    MuiSelectItem,
    MuiSelectItemOption,
    MuiSelectItemOptions,
    MuiStock, MuiStockModalTop
} from "./styles"
import { ModalZindex } from "../../components/Modal";
import generateExcelFile from "../../saveExcel"
import { EstoqueTable } from './components/StoqueTable/index'
import { useEffect, useState } from "react"
import { Root } from "../../styles/Root/root_styles";
import { DeleteOutline, InsertInvitation, ShoppingCartCheckout } from "@mui/icons-material";
import { NavBarTop } from "../../components/Bar";
import { NewItem } from "../NewItem";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const Stock = () => {
    const [stock, setStock] = useState([])
    const [newItem, setNewItem] = useState(false)
    const [saveExcel, setSaveExcel] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'stock'), (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
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
            setStock(stockItems);
        });
        return () => unsubscribe();
    }, []);

    console.log(stock)
    return (
        <MuiStock>
            {newItem &&
                <NewItem
                    newItem={newItem}
                    setNewItem={setNewItem}
                />
            }
            {selectedItems.length > 0 && <MuiStockModalTop>
                <MuiSelectItem>
                    {selectedItems.length}
                </MuiSelectItem>
                <MuiSelectItemOptions>
                    {[
                        {
                            icon: <InsertInvitation />,
                            label: 'About expire',
                        },
                        {
                            icon: <ShoppingCartCheckout />,
                            label: 'Remove items',
                        },
                        {
                            icon: <DeleteOutline />,
                            label: 'Delete itens',
                        },
                    ].map((item, index) => {
                        return (
                            <MuiSelectItemOption key={index}>
                                {item.icon} {item.label}
                            </MuiSelectItemOption>
                        )
                    })}
                </MuiSelectItemOptions>
            </MuiStockModalTop>}
            {saveExcel && <ModalZindex
                setSaveExcel={setSaveExcel}
                saveExcel={saveExcel}
                stock={stock}
            />}
            <NavBarTop
                newItem={newItem}
                setNewItem={setNewItem}
                generateExcelFile={generateExcelFile}
                setSaveExcel={setSaveExcel}
                saveExcel={saveExcel}
            />

            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '85%',
                width: '100%',
                mt: selectedItems.length > 0 ? '0px' : '17px',
                ...Root.scrollBar
            }}>
                <EstoqueTable
                    setStock={setStock}
                    stock={stock}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />
            </Stack>

        </MuiStock>
    )
}