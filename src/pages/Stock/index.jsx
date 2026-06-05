import React from 'react';
import { EstoqueTable } from './components/StoqueTable/index'
import { useContext, useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"; // 🟢 Removemos a query e o where antigos
import { db } from "../../../firebase_config";
import { AuthContext } from "../../auth_context";
import { TableStock } from "../../mobile/components/tableStock";

export const Stock = () => {
    const [stock, setStock] = useState([])
    const [loading, setLoading] = useState(false)
    const {
        user,
        setDownloads,
        selectedItems,
        setSelectedItems,
        matches,
        search,
        select,
        tenant, // 🟢 Objeto completo da empresa vindo do Contexto
    } = useContext(AuthContext)

    useEffect(() => {
        // Se o usuário ou o tenant (ou o id dele) não existirem, não roda a busca
        if (!user || !tenant?.id) return;

        setLoading(false)
        const tenantIdPuro = tenant.id;
        // 🎯 A NOVA ROTA ISOLADA: Aponta direto para tenants/{tenantId}/stock
        const subcolecaoRef = collection(db, 'tenants', tenantIdPuro, 'produtos');
    
        const unsubscribe = onSnapshot(subcolecaoRef, (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
                const data = doc.data();
                const itemFormatado = {
                    id: doc.id,
                    ...data, 
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
            setLoading(true)
        }, (error) => {
            console.error("Erro ao escutar subcoleção de estoque do tenant:", error);
        });

        return () => unsubscribe();

    }, [search, select, user, tenant?.id]);
    if (matches) {
        return (
            <TableStock item={stock} />
        )
    }
    return (
        <EstoqueTable
            loading={loading}
            setStock={setStock}
            stock={stock}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
        />
    )
}