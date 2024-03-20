import {
    collection,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase_config";
export const get_items = {
    stock: {
        get: async (id) => {
            if (id) {
                const docSnap = await getDoc(doc(db, "stock", id));
                if (docSnap.exists()) {
                    return docSnap.data();
                } else {
                    console.log("No such document!");
                }
                return {};
            }
            const querySnapshot = await getDocs(collection(db, "stock"));
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data());
            });
            return usersData;
        },
    }
}