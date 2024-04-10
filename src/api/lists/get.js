import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const my_lists = {
    getLists: async (userId) => {
        if (userId) {
            const querySnapshot = await getDocs(query(collection(db, "lists"), where("userId", "==", userId)));
            const listsData = [];
            querySnapshot.forEach((doc) => {
                listsData.push(doc.data());
            });
            return listsData;
        }
        console.error("userId não fornecido.");
        return [];
    },
    addItemToList: async (listId, newItem) => {
        try {
            if (!listId || !newItem) {
                throw new Error("ID da lista ou novo item não fornecido.");
            }
            const listRef = doc(db, "lists", listId);
            await updateDoc(listRef, {
                listItens: arrayUnion(newItem)
            });
            console.log("Item adicionado com sucesso à lista", listId);
        } catch (error) {
            console.error("Erro ao adicionar/atualizar item na lista:", error.message);
        }
    }
}