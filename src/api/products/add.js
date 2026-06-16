import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

// 📅 Mantendo o seu formato exato de data (Ex: 15/06/2026)
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
}

// ⏰ Mantendo o seu formato exato de hora (Ex: 13:56:12)
function getHoraExata() {
    const dataAtual = new Date();
    const h = dataAtual.getHours().toString().padStart(2, '0');
    const m = dataAtual.getMinutes().toString().padStart(2, '0');
    const s = dataAtual.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}
async function createCommit(refDocId, author, quantidade) {
    try {
        const commitCollectionRef = collection(db, 'commits');
        const commitQuerySnapshot = await getDocs(commitCollectionRef);
        const commitNumber = commitQuerySnapshot.size;

        const newCommit = {
            refDoc: refDocId,
            commitNumber: commitNumber,
            timestamp: formatDate(new Date()),
            author: author,
            quantidade: quantidade,
            type: 'saidas'
        };

        await addDoc(commitCollectionRef, newCommit);
        console.log("Commit added successfully.");
    } catch (error) {
        console.error("Error creating commit: ", error);
        throw error;
    }
}
export const addProduct = {
    add: async (tenantId, data) => {
        if (!tenantId) throw new Error("Operação cancelada: tenantId não fornecido.");

        try {
            let produtoId;
            const stockCollectionRef = collection(db, 'tenants', tenantId, 'produtos');

            // Query usando a chave universal 'nome' que padronizamos
            const querySnapshot = await getDocs(query(stockCollectionRef,
                where("nome", "==", data.nome)
            ));

            if (querySnapshot.size > 0) {
                // Produto já existe: incrementa o saldo atual
                const docSnapshot = querySnapshot.docs[0];
                const existingItem = docSnapshot.data();
                produtoId = docSnapshot.id;

                const newQuantity = Number(existingItem.quantidade || 0) + Number(data.quantidade || 0);

                await updateDoc(docSnapshot.ref, {
                    quantidade: newQuantity,
                    dataAtualizacao: new Date().toISOString()
                });
                console.log(`[Stockify Stock] Saldo atualizado para ${newQuantity}`);
            } else {
                // Produto novo: cria o documento na subcoleção /stock
                const docRef = await addDoc(stockCollectionRef, data);
                produtoId = docRef.id;

                await updateDoc(doc(db, 'tenants', tenantId, 'produtos', produtoId), { id: produtoId });
                console.log("[Stockify Stock] Novo item registrado no saldo.");
            }

            // =========================================================================
            // 🚀 ESPELHO FIEL DO SEU CADASTRO MANUAL (image_73f222.png)
            // =========================================================================
            const movimentacoesCollectionRef = collection(db, 'tenants', tenantId, 'movimentacoes');

            const payloadMovimentacao = {
                tipoMovimentacao: "entrada", // Carimbo fixo de entrada
                dataMovimentacao: formatDate(new Date()),
                horaMovimentacao: getHoraExata(),

                // 📦 Objeto 'metadata' igualzinho ao seu print
                metadata: {
                    fornecedor: data.fornecedor || "Não informado",
                    numeroNotaFiscal: data.numeroNotaFiscal || "N/A",
                    observacao: data.observacao || "",
                    motivo: data.motivo || "Cadastro Inicial de Estoque",
                    // Salva quem operou o sistema se você tiver o auth estruturado
                    operador: data.author?.userName || "Operador"
                },

                // 🍎 Objeto 'produto' estruturado exatamente igual ao seu cadastro manual
                produto: {
                    id: produtoId,
                    nomeItem: data.nome, // Mapeia 'nome' para o seu campo 'nomeItem'
                    quantidade: Number(data.quantidade || 0),
                    sku: data.sku || data.numero_serie || "N/A",
                    subtotal: (Number(data.quantidade || 0) * Number(data.preco || 0)).toFixed(2)
                }
            };

            // Salva na coleção /movimentacoes exatamente com a sua cara
            await addDoc(movimentacoesCollectionRef, payloadMovimentacao);
            console.log(`[Stockify] Movimentação registrada seguindo o modelo manual.`);

            return true;
        } catch (error) {
            console.error("Erro ao rodar API de estoque e movimentação:", error);
            throw error;
        }
    },
    novas_entradas: async (data) => {
        for (const chave in data) {
            if (data.hasOwnProperty(chave) && data[chave] === undefined) {
                console.log(`O campo ${chave} não está definido.`);
            }
        }
        try {
            await addDoc(collection(db, 'entradas'), data);
            console.log('Entrada adicionada com sucesso!')
        } catch (error) {
            console.error(error)
        }

    },
    // 👑 REMOVER QUANTIDADE DO ESTOQUE + LANÇAR HISTÓRICO DE SAÍDA NO MODELO OFICIAL
    to_remove_quantiadade: async (tenantId, refDoc, quantidade_to_remove, author, metadataAvulso = {}) => {
        if (!tenantId) throw new Error("Operação cancelada: tenantId não fornecido.");
        if (!refDoc) return false;

        try {
            // 🎯 CORREÇÃO CRÍTICA: Aponta direto para a subcoleção '/produtos' que você renomeou!
            const produtoDocRef = doc(db, 'tenants', tenantId, 'produtos', refDoc);
            const docSnapshot = await getDoc(produtoDocRef);

            if (!docSnapshot.exists()) {
                console.error("Item não encontrado na subcoleção de produtos desse tenant.");
                return false;
            }

            const existingItem = docSnapshot.data();
            const currentQuantity = Number(existingItem.quantidade || 0);
            const quantityToRemove = Number(quantidade_to_remove);
            const newQuantity = currentQuantity - quantityToRemove;

            // 🛡️ Trava de segurança: impede o saldo de ficar negativo
            if (newQuantity < 0) {
                console.error("Quantidade insuficiente para realizar a baixa.");
                return false;
            }

            // 1️⃣ Atualiza o saldo real do item na subcoleção correta: /produtos
            await updateDoc(produtoDocRef, {
                quantidade: newQuantity,
                dataAtualizacao: new Date().toISOString()
            });
            console.log(`[Stockify Produtos] Quantidade atualizada para o item ${refDoc}. Novo saldo: ${newQuantity}`);

            // =========================================================================
            // 2️⃣ REGISTRO HISTÓRICO ESPELHADO NO SEU MODELO MANUAL (image_73f222.png)
            // =========================================================================
            const movimentacoesCollectionRef = collection(db, 'tenants', tenantId, 'movimentacoes');

            const payloadMovimentacaoSaida = {
                tipoMovimentacao: "saida", // Carimbo de baixa
                dataMovimentacao: formatDate(new Date()),
                horaMovimentacao: getHoraExata(),

                // Objeto 'metadata' do seu print de referência
                metadata: {
                    fornecedor: metadataAvulso.fornecedor || "N/A",
                    numeroNotaFiscal: metadataAvulso.numeroNotaFiscal || "N/A",
                    observacao: metadataAvulso.observacao || "",
                    motivo: metadataAvulso.motivo || "Retirada de insumo / Baixa de estoque",
                    operador: author?.userName || "Operador"
                },

                // Objeto 'produto' estruturado exatamente igual ao seu cadastro manual
                produto: {
                    id: refDoc,
                    nomeItem: existingItem.nome || "Item Sem Nome",
                    quantidade: quantityToRemove,
                    sku: existingItem.sku || existingItem.numero_serie || "N/A",
                    subtotal: (quantityToRemove * Number(existingItem.preco || 0)).toFixed(2)
                }
            };

            // Salva na coleção única /movimentacoes do Tenant
            await addDoc(movimentacoesCollectionRef, payloadMovimentacaoSaida);
            console.log("[Stockify] Movimentação de SAÍDA registrada com sucesso.");

            return true;

        } catch (error) {
            console.error("Erro crítico ao processar a retirada no documento de produtos: ", error);
            throw error;
        }
    }
}