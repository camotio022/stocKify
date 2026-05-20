import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
import firebase from "firebase/compat/app";


export const getTenancies = {
    tenancy: async (id) => {
        // Passa o db, o nome da coleção e o ID direto do documento
        const docRef = doc(db, "tenants", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Retorna os dados do documento + o id dele, se precisar
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            console.log("Nenhum inquilino encontrado com esse ID!");
            return null;
        }
    }
}
