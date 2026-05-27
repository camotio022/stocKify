import React from 'react';
import { EstoqueTable } from './components/StoqueTable/index'
import { useContext, useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { TableStock } from "../../mobile/components/tableStock";

export const Stock = () => {
    const [stock, setStock] = useState([])
    const {
        user,
        setDownloads,
        selectedItems,
        setSelectedItems, matches,
        search,
        select,
        tenant,
    } = useContext(AuthContext)
    useEffect(() => {
        if (!user || !user.tenant) return;
        const stockQuery = query(
            collection(db, 'stock'),
            where('tenant', '==', user.tenant)
        );
        console.log("Escutando estoque do tenant:", stockQuery)
        const unsubscribe = onSnapshot(stockQuery, (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
                const data = doc.data();
                const itemFormatado = {
                    id: doc.id,
                    categoria: data.categoria || "",
                    nome: data.nome || "",
                    donation: data.donation || "",
                    price: data.price || "",
                    typeItem: data.typeItem || "",
                    quantidade: data.quantidade || "",
                    dataValidade: data.dataValidade || "",
                    dataChegada: data.dataChegada || "",
                    author: {
                        userName: data.author?.userName || (user.name === 'none' ? 'Junta Mais' : user.name),
                        userEmail: data.author?.userEmail || user.email,
                        userId: data.author?.userId || user.id,
                    }
                };
                if (!search && !select) {
                    return itemFormatado;
                } else {
                    const valorCampo = data[select];
                    const atendeBusca = !search || (valorCampo && String(valorCampo).toLowerCase().includes(search.toLowerCase()));
                    const atendeSelect = !select || select === "" || valorCampo;

                    if (atendeBusca && atendeSelect) {
                        return itemFormatado;
                    } else {
                        return null;
                    }
                }
            }).filter(item => item !== null);
            setStock(stockItems);
            setDownloads(prevState => ({
                ...prevState,
                estoque: stockItems,
            }));
        }, (error) => {
            console.error("Erro ao escutar estoque do tenant:", error);
        });

        return () => unsubscribe();
    }, [search, select, user?.tenant]); // 🔥 Adicionado o tenant nas dependências para refazer a busca se o inquilino mudar
    if (matches) {
        return (
            <TableStock item={stock} />
        )
    }
    return (
        <EstoqueTable
            setStock={setStock}
            stock={stock}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
        />
    )
}