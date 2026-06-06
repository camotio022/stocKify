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
        // 🟢 PEGA A STRING PURA: Sem JSON.parse para não estourar erro de sintaxe!
        const idDoStorage = sessionStorage.getItem("activeTenantId");

        // Define o ID final: Prioriza o estado do contexto (se já estiver pronto), 
        // se não, usa a String pura do storage como plano B imediato.
        const tenantIdEfetivo = tenant?.id && tenant.id !== "none" ? tenant.id : idDoStorage;

        // 🔴 Se mesmo olhando o storage o ID for nulo, indefinido ou "none", aí sim barra
        if (!user || !tenantIdEfetivo || tenantIdEfetivo === "none") return;

        setLoading(false);

        // 🎯 Conecta na subcoleção usando a String pura do ID garantido
        const subcolecaoRef = collection(db, 'tenants', tenantIdEfetivo, 'produtos');

        const unsubscribe = onSnapshot(subcolecaoRef, (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    author: {
                        userName: data.author?.userName || (user.name === 'none' ? 'Junta Mais' : user.name),
                        userEmail: data.author?.userEmail || user.email,
                        userId: data.author?.userId || user.id,
                    }
                };
            });

            const filteredItems = stockItems.filter(item => {
                if (!search && !select) return true;
                const valorCampo = item[select];
                return (!search || (valorCampo && String(valorCampo).toLowerCase().includes(search.toLowerCase()))) &&
                    (!select || select === "" || valorCampo);
            });

            setStock(filteredItems);
            setDownloads(prevState => ({ ...prevState, estoque: filteredItems }));
            setLoading(true);
        }, (error) => {
            console.error("Erro ao escutar subcoleção de estoque do tenant:", error);
        });

        return () => unsubscribe();

        // Monitora o tenant?.id para refazer a inscrição caso o estado do contexto mude depois
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