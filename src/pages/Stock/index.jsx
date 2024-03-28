import { Stack } from "@mui/material"
import {
    MuiSelectItem,
    MuiSelectItemOption,
    MuiSelectItemOptions,
    MuiStock, MuiStockModalTop
} from "./styles"
import { ModalZindex } from "../../components/Modal";
import { EstoqueTable } from './components/StoqueTable/index'
import { useContext, useEffect, useState } from "react"
import { Root } from "../../styles/Root/root_styles";
import { DeleteOutline, InsertInvitation, ShoppingCartCheckout } from "@mui/icons-material";
import { NavBarTop } from "../../components/Bar";
import { NewItem } from "../NewItem";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";

export const Stock = () => {
    const {
        user,
        newItem,
        setNewItem,
        saveExcel,
        setSaveExcel,
        selectedItems,
        setSelectedItems, } = useContext(AuthContext)
    const [stock, setStock] = useState([])

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
    return (
        <MuiStock>
           
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