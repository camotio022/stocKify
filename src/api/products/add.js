import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
async function createCommit(refDocId, author, quantidade) {
    try {
        const commitCollectionRef = collection(db, 'commits');
        const commitQuerySnapshot = await getDocs(commitCollectionRef);
        const commitNumber = commitQuerySnapshot.size;

        const newCommit = {
            refDoc: refDocId,
            commitNumber: commitNumber,
            timestamp: new Date(),
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
    add: async (data) => {
        try {
            let id;
            const stockCollectionRef = collection(db, 'stock');
            const querySnapshot = await getDocs(query(stockCollectionRef,
                where("nome", "==", data.nome),
                where("dataValidade", "==", data.dataValidade)
            ));
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(async (doc) => {
                    const existingItem = doc.data();
                    id = doc.id;
                    const newQuantity = Number(existingItem.quantidade) + Number(data.quantidade);
                    await updateDoc(doc.ref, { quantidade: newQuantity });
                    console.log(`Quantity updated for existing item ${doc.id} to ${newQuantity}`);
                });
            } else {
                const docRef = await addDoc(stockCollectionRef, data);
                const docId = docRef.id;
                id = docId;
                await updateDoc(doc(db, 'stock', docId), { id: docId });
                console.log("New item added to stock with ID: ", docRef.id);
            }
            const commitQuerySnapshot = await getDocs(collection(db, 'commits'));
            let lastCommitNumber = commitQuerySnapshot.size;
            const newComnmit = {
                refDoc: id,
                commitNumber: lastCommitNumber,
                timestamp: new Date(),
                author: {
                    userName: data.author.userName,
                    userEmail: data.author.userEmail,
                    userId: data.author.userId,
                },
                quantidade: data.quantidade,
                type: 'entradas'
            }
            await addDoc(collection(db, 'commits'), newComnmit)
            return true;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    },
    to_remove_quantiadade: async (refDoc, quantidade_to_remove, author) => {
        console.log(refDoc, quantidade_to_remove)
        try {
            const stockDocRef = doc(db, 'stock', refDoc);
            const docSnapshot = await getDoc(stockDocRef);
            if (docSnapshot.exists()) {
                const existingItem = docSnapshot.data();
                const newQuantity = existingItem.quantidade - quantidade_to_remove;

                if (newQuantity >= 0) {
                    await updateDoc(stockDocRef, { quantidade: newQuantity });
                    console.log(`Quantity updated for existing item ${refDoc.id} to ${newQuantity}`);
                    await createCommit(refDoc, author, quantidade_to_remove);
                    return true;
                } else {
                    console.error("Quantidade insuficiente para remover.");
                    return false;
                }
            } else {
                console.error("Item não encontrado no estoque.");
                return false;
            }
        } catch (error) {
            console.error("Erro ao remover quantidade: ", error);
            throw error;
        }
    }
}