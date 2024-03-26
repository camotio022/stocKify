import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const get_commits = {

    get: async (id) => {
        if (id) {
            const docSnap = await getDoc(doc(db, "commits", id));
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
            return {};
        }
        const querySnapshot = await getDocs(collection(db, "commits"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
            usersData.push(doc.data());
        });
        return usersData;
    },
    getFullDocs: async (id) => {
        if (id) {
            const commitsRef = collection(db, "commits");
            const querySnapshot = await getDocs(query(commitsRef, where("refDoc", "==", id)));

            if (!querySnapshot.empty) {
                const commitsData = [];
                querySnapshot.forEach((doc) => {
                    commitsData.push(doc.data());
                });
                return commitsData;
            } else {
                console.log("No commits found for the provided id.");
                return [];
            }
        } else {
            const querySnapshot = await getDocs(collection(db, "commits"));
            const commitsData = [];
            querySnapshot.forEach((doc) => {
                commitsData.push(doc.data());
            });
            return commitsData;
        }
    }

}