import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";
import firebase from "firebase/compat/app";


export const getTenancies = {
    tenancy: async (tenancyId) => {
        try {
            const docSnap = await firebase.firestore().collection('tenants').doc(tenancyId).get();

            if (docSnap.exists) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
