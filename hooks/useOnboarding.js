import { useState, useContext } from 'react';
import { db } from '../firebase_config';

import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { AuthContext } from '../src/auth_context';

export const useOnboarding = () => {
    const { user, setTenant } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState('CHOICE'); // CHOICE, CREATE_QUIZ, JOIN_INVITE, LOADING, SUCCESS
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState(null);

    const createNewTenant = async (formQuizData) => {
        setCurrentStep('LOADING');
        setLoadingMessage('Configurando infraestrutura criptografada...');
        setError(null);

        try {
            // Gera referências e IDs na raiz
            const newTenantRef = doc(collection(db, "tenants"));
            const tenantId = newTenantRef.id;

            // Gerador automático do código de convite inicial da unidade
            const inviteCode = `STK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

            const payload = {
                name: formQuizData.name,
                segmento: formQuizData.segmento,
                theme: formQuizData.theme,
                inviteCode,
                donoId: user.uid,
                dataCriacao: new Date().toISOString(),
                colaboradores: [{ userId: user.uid, userName: user.name || "Dono", role: "owner" }]
            };

            // Salva o Tenant e atualiza a flag do usuário na raiz
            await setDoc(newTenantRef, payload);
            await updateDoc(doc(db, "users", user.uid), { tenantId, hasTenant: true });

            setLoadingMessage('Isolando ambiente seguro multi-tenant...');
            setCurrentStep('SUCCESS');
        } catch (err) {
            setError(err.message);
            setCurrentStep('CHOICE');
        }
    };

    // 👥 FLUXO 2: ENTRAR POR CONVITE COM VALIDAÇÃO DUPLA (SUA IDÉIA!)
    const joinTenantByInvite = async (inviteCodeRaw) => {
        setCurrentStep('LOADING');
        setLoadingMessage('Autenticando chaves de acesso da unidade...');
        setError(null);

        try {
            const code = inviteCodeRaw.trim().toUpperCase();
            const email = user.email.toLowerCase();

            // 🛡️ ETAPA 1: Busca o código da empresa na raiz
            const qTenant = query(collection(db, "tenants"), where("inviteCode", "==", code));
            const snapTenant = await getDocs(qTenant);

            if (snapTenant.empty) throw new Error("Código de unidade não encontrado.");

            const tenantDoc = snapTenant.docs[0];
            const tenantId = tenantDoc.id;

            // 🛡️ ETAPA 2: Validação invisível na subcoleção baseada no e-mail do usuário
            const qEmail = query(collection(db, "tenants", tenantId, "convidados_autorizados"), where("email", "==", email));
            const snapEmail = await getDocs(qEmail);

            if (snapEmail.empty) {
                throw new Error("Acesso negado. Seu e-mail não foi pré-autorizado por esta unidade.");
            }

            // 💥 SE PASSOU NAS DUAS ETAPAS: Atualiza o time e vincula o perfil
            await updateDoc(doc(db, "tenants", tenantId), {
                colaboradores: arrayUnion({ userId: user.uid, userName: user.name || "Operador", role: "editor" })
            });

            // Atualiza o status do convite na subcoleção do Tenant
            const conviteId = snapEmail.docs[0].id;
            await updateDoc(doc(db, "tenants", tenantId, "convidados_autorizados", conviteId), { status: "aceito" });

            // Atualiza o usuário para o Dashboard liberar
            await updateDoc(doc(db, "users", user.uid), { tenantId, hasTenant: true });

            setLoadingMessage('Sincronizando permissões de equipe...');
            setCurrentStep('SUCCESS');
        } catch (err) {
            setError(err.message);
            setCurrentStep('JOIN_INVITE'); // Mantém o cara na tela para tentar de novo
        }
    };

    return {
        currentStep,
        setCurrentStep,
        loadingMessage,
        error,
        createNewTenant,
        joinTenantByInvite
    };
};