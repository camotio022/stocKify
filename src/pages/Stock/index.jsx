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
        // 🔐 GATILHO DE SEGURANÇA: Se o usuário ou o ID do tenant não estiverem carregados, não faz nada
        if (!user || !user.tenant) return;

        // 1. Criamos uma consulta filtrada que só traz os itens pertencentes a este Tenant específico
        const stockQuery = query(
            collection(db, 'stock'),
            where('id', '==', user.tenant) // Filtra direto no servidor do Firebase
        );
console.log("Escutando estoque do tenant:", stockQuery)
        // 2. Escutamos apenas a query filtrada, protegendo os dados
        const unsubscribe = onSnapshot(stockQuery, (snapshot) => {
            const stockItems = snapshot.docs.map((doc) => {
                const data = doc.data();

                // 💡 DICA: Removendo a duplicidade de código limpando a lógica do map
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

                // 3. Aplica a sua filtragem local de busca (Search / Select) se houver
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

            // 4. Atualiza os estados sincronizados
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