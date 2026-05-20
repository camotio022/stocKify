import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const getTenancy = {
    tenancy: async (tenancyId) => {
        if (!tenancyId) return null;

        try {
            const docRef = doc(db, 'tenants', tenancyId); // Altere 'empresas' para o nome exato da sua coleção
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.warn(`[getTenancy]: Tenant com ID ${tenancyId} não foi encontrado.`);
                return null;
            }
        } catch (error) {
            console.error('[getTenancy]: Erro ao buscar os dados do inquilino:', error);
            throw error; // Repassa o erro para o componente que chamou tratar (ex: mostrar um alerta na tela)
        }
    }
}
