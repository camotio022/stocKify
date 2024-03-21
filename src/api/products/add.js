import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

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
            }
            await addDoc(collection(db, 'commits'), newComnmit)
            return true;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    }
}