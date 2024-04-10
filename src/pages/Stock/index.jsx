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
import { TableStock } from "../../mobile/components/tableStock";

export const Stock = () => {
    const {
        user,
        setDownloads,
        selectedItems,
        setSelectedItems, matches } = useContext(AuthContext)
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
            setDownloads(prevState => ({
                ...prevState,
                estoque: stockItems,
            }));
        });
        return () => unsubscribe();
    }, []);
    if (matches) {
        return (
            <TableStock item={stock} />
        )
    }
    return (

        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',

            width: '100%',
            ...Root.scrollBar,
            border: '2px solid white'
        }}>
            <EstoqueTable
                setStock={setStock}
                stock={stock}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        </Stack>

    )
}