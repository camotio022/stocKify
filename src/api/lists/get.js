import { collection, getDocs, where } from "firebase/firestore";
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
    
}