import React, { useState, useContext } from 'react';
import { Box, Typography, Button, TextField, CircularProgress, Grid } from '@mui/material';

import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { SEGMENT_TEMPLATES } from './utils';
import { AuthContext } from '../src/auth_context';
import { db } from '../firebase_config';

export const OnboardingScreen = () => {
    const { user, checkTenant } = useContext(AuthContext);
    const navigate = useNavigate();

    // CHOICE -> CREATE_NAME -> SELECT_SEGMENT -> JOIN_INVITE -> LOADING -> SUCCESS
    const [step, setStep] = useState('CHOICE'); 
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');

    const [name, setname] = useState('');
    const [segmento, setSegmento] = useState('vestuario');
    const [codigoConvite, setCodigoConvite] = useState('');

    // 👑 FLUXO 1: CRIAR EMPRESA COM COLUNAS DINÂMICAS
  // 👑 FLUXO 1: CRIAR EMPRESA TOTALMENTE ALINHADA COM O BANCO MANUAL
    const handleCriarEmpresa = async () => {
        if (!name.trim()) {
            setError('Por favor, digite o nome da sua empresa.');
            return;
        }
        if (!user) {
            setError('Sessão do usuário não encontrada. Faça login novamente.');
            return;
        }

        const uidEfetivo = user.uid || user.id;
        if (!uidEfetivo) {
            setError('Erro crítico: Não foi possível capturar o ID único do usuário.');
            return;
        }

        setStep('LOADING');
        setLoadingMessage('Configurando infraestrutura criptografada...');
        setError('');

        try {
            const novoTenantRef = doc(collection(db, "tenants"));
            const tenantId = novoTenantRef.id;
            
            // Gerador de código de convite único
            const inviteCode = `STK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            
            // Puxa as colunas dinâmicas do arquivo de templates baseado no segmento escolhido
            const templateEscolhido = SEGMENT_TEMPLATES[segmento];
            
            const timestampAtual = new Date().toISOString();

            // 🎯 PAYLOAD BLINDADO: Casamento perfeito com os campos que você criou no Console do Firebase
            const payloadTenant = {
                id: tenantId,
                donoId: uidEfetivo,
                name: name.trim(),
                segmento: segmento,
                inviteCode: inviteCode,
                active: true, // 👈 Campo booleano de controle que você usa
                plan: "free", // 👈 Definição do plano padrão para novos cadastros
                dataCriacao: timestampAtual, 
                createdAt: timestampAtual, // 👈 Mantendo as duas variações de data por segurança de mapeamento
                theme: { 
                    primary: '#7C3AED',   // Roxo Stockify
                    secondary: '#00F5D4'  // Neon Reativo
                },
                colunasEstoque: templateEscolhido.columns, // 👈 Injeta a array de colunas do nicho
                colaboradores: [
                    { 
                        userId: uidEfetivo, 
                        userName: user.name || "Proprietário", 
                        role: "owner" 
                    }
                ]
            };

            // Salva o documento principal na raiz da coleção /tenants
            await setDoc(novoTenantRef, payloadTenant);

            // 🛡️ Subcoleção 1: Controle de Convidados Autorizados
            await setDoc(doc(collection(db, "tenants", tenantId, "convidados_autorizados")), {
                email: user.email.toLowerCase(), 
                status: "proprietario", 
                dataEnvio: timestampAtual
            });

            // 🛡️ Subcoleção 2: Usuários Associados (Para performance na leitura do AuthContext)
            await setDoc(doc(collection(db, "tenants", tenantId, "associated_users"), uidEfetivo), {
                userEmail: user.email.toLowerCase(), 
                userId: uidEfetivo
            });

            // Atualiza a sessão local do navegador e dispara o check global do Contexto
            sessionStorage.setItem('activeTenantId', tenantId);
            await checkTenant(tenantId);

            setStep('SUCCESS');
            setTimeout(() => navigate('/'), 1500);

        } catch (err) {
            console.error("Erro ao estruturar Tenant:", err);
            setError('Falha ao criar unidade: ' + err.message);
            setStep('CREATE_NAME');
        }
    };

    // 🛡️ FLUXO 2: VERIFICAÇÃO DE DUAS ETAPAS (CÓDIGO + E-MAIL PRÉ-AUTORIZADO)
    const handleValidarConvite = async () => {
        if (!codigoConvite.trim()) {
            setError('Digite o código de acesso da unidade.');
            return;
        }

        setStep('LOADING');
        setLoadingMessage('Autenticando chaves de acesso da unidade...');
        setError('');

        try {
            const code = codigoConvite.trim().toUpperCase();
            const emailLogado = user.email.toLowerCase();
            const uidEfetivo = user.uid || user.id;

            const qTenant = query(collection(db, "tenants"), where("inviteCode", "==", code));
            const snapTenant = await getDocs(qTenant);

            if (snapTenant.empty) throw new Error("Código de unidade inválido ou expirado.");

            const tenantDoc = snapTenant.docs[0];
            const tenantId = tenantDoc.id;

            // 🛡️ Sacada de segurança: Checa e-mail autorizado na subcoleção do Tenant
            const qEmail = query(collection(db, "tenants", tenantId, "convidados_autorizados"), where("email", "==", emailLogado));
            const snapEmail = await getDocs(qEmail);

            if (snapEmail.empty) {
                throw new Error("Acesso negado. Seu e-mail não foi pré-autorizado por esta unidade.");
            }

            await updateDoc(doc(db, "tenants", tenantId), {
                colaboradores: arrayUnion({ userId: uidEfetivo, userName: user.name || "Operador", role: "editor" })
            });

            await setDoc(doc(collection(db, "tenants", tenantId, "associated_users"), uidEfetivo), {
                userEmail: emailLogado, userId: uidEfetivo
            });

            const conviteDocId = snapEmail.docs[0].id;
            await updateDoc(doc(db, "tenants", tenantId, "convidados_autorizados", conviteDocId), { status: "aceito" });

            setLoadingMessage('Sincronizando permissões de equipe...');
            
            sessionStorage.setItem('activeTenantId', tenantId);
            await checkTenant(tenantId);

            setStep('SUCCESS');
            setTimeout(() => navigate('/'), 1500);

        } catch (err) {
            setError(err.message);
            setStep('JOIN_INVITE');
        }
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0D0B14', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bgcolor: 'rgba(124, 58, 237, 0.15)', filter: 'blur(120px)', top: '10%', left: '10%' }} />
            <Box sx={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', bgcolor: 'rgba(0, 245, 212, 0.1)', filter: 'blur(100px)', bottom: '15%', right: '10%' }} />

            <Box sx={{ background: 'rgba(20, 15, 35, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '24px', p: 5, maxWidth: '550px', width: '90%', boxShadow: '0 24px 50px rgba(0,0,0,0.6)', textAlign: 'center' }}>
                
                {step === 'CHOICE' && (
                    <Box>
                        <Typography variant="h4" sx={{ color: '#FFF', fontWeight: 800, mb: 1 }}>BEM-VINDO AO STOCKIFY</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>Selecione como deseja iniciar a sua jornada de gerenciamento inteligente.</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box onClick={() => setStep('CREATE_NAME')} sx={{ p: 3, borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124, 58, 237, 0.2)', cursor: 'pointer', transition: '0.3s', '&:hover': { background: 'rgba(124, 58, 237, 0.1)', transform: 'translateY(-3px)', borderColor: '#7C3AED' } }}>
                                    <Typography variant="h2" sx={{ mb: 1 }}>👑</Typography>
                                    <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700 }}>Nova Unidade</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box onClick={() => setStep('JOIN_INVITE')} sx={{ p: 3, borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0, 245, 212, 0.2)', cursor: 'pointer', transition: '0.3s', '&:hover': { background: 'rgba(0, 245, 212, 0.08)', transform: 'translateY(-3px)', borderColor: '#00F5D4' } }}>
                                    <Typography variant="h2" sx={{ mb: 1 }}>👥</Typography>
                                    <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700 }}>Tenho Convite</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {step === 'CREATE_NAME' && (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700, mb: 3 }}>Identidade da Organização</Typography>
                        <TextField fullWidth label="Nome da Empresa" value={name} onChange={(e) => setname(e.target.value)} sx={{ mb: 3, input: { color: '#FFF' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(124,58,237,0.3)' } } }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button onClick={() => setStep('CHOICE')} sx={{ color: 'rgba(255,255,255,0.5)' }}>Voltar</Button>
                            <Button onClick={() => name.trim() ? setStep('SELECT_SEGMENT') : setError('Digite o nome')} variant="contained" sx={{ bgcolor: '#7C3AED' }}>Avançar</Button>
                        </Box>
                    </Box>
                )}

               {step === 'SELECT_SEGMENT' && (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700, mb: 1 }}>
            Modelo de Negócio
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
            Mapeamento de colunas automatizado baseado no nicho comercial.
        </Typography>
        
        {/* 🚀 O SEGREDO DO SCROLL RESPONSIVO ESTÁ AQUI */}
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                textAlign: 'left',
                maxHeight: { xs: '50vh', sm: '40vh' }, // Altura máxima dinâmica adaptada para celular vs PC
                overflowY: 'auto', // Ativa o scroll vertical
                pr: 1, // Espaço para a barra não colar nos cards
                mb: 2,
                
                // 🎨 ESTILIZAÇÃO DO SCROLLBAR ESTILO NEON (FUTURISTA)
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(124, 58, 237, 0.3)', // Roxo translúcido
                    borderRadius: '10px',
                    transition: '0.3s',
                    '&:hover': {
                        background: '#7C3AED', // Brilha mais forte no hover
                    }
                },
            }}
        >
            {Object.keys(SEGMENT_TEMPLATES).map((chave) => (
                <Box 
                    key={chave} 
                    onClick={() => setSegmento(chave)} 
                    sx={{ 
                        p: 2.5, 
                        borderRadius: '12px', 
                        cursor: 'pointer', 
                        transition: '0.2s', 
                        background: segmento === chave ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.02)', 
                        border: segmento === chave ? '2px solid #7C3AED' : '1px solid rgba(255,255,255,0.08)',
                        '&:hover': {
                            background: segmento === chave ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.05)',
                            transform: 'translateX(2px)' // Efeito sutil ao passar o mouse
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Typography variant="h4">{SEGMENT_TEMPLATES[chave].icon}</Typography>
                        <Box sx={{ minWidth: 0, flex: 1 }}> {/* Evita que quebre texto longo */}
                            <Typography sx={{ color: '#FFF', fontWeight: 700, fontSize: { xs: '14px', sm: '16px' } }}>
                                {SEGMENT_TEMPLATES[chave].label}
                            </Typography>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.4)',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1, // Limita a visualização das colunas a uma linha para não virar bagunça
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                Colunas: {SEGMENT_TEMPLATES[chave].columns.map(c => c.label).join(', ')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
        
        {error && <Typography variant="caption" color="error" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>{error}</Typography>}
        
        {/* 📱 BOTÕES FIXOS NA BASE */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button onClick={() => setStep('CREATE_NAME')} sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Voltar
            </Button>
            <Button 
                onClick={handleCriarEmpresa} 
                variant="contained" 
                sx={{ 
                    bgcolor: '#00F5D4', 
                    color: '#0D0B14', 
                    fontWeight: 700,
                    boxShadow: '0 0 15px rgba(0, 245, 212, 0.3)',
                    '&:hover': {
                        bgcolor: '#00d1b2',
                        boxShadow: '0 0 25px rgba(0, 245, 212, 0.5)',
                    }
                }}
            >
                Criar Unidade
            </Button>
        </Box>
    </Box>
)}

                {step === 'JOIN_INVITE' && (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 700, mb: 1 }}>Chave de Acesso</Typography>
                        <TextField fullWidth placeholder="Ex: STK-X98R2" value={codigoConvite} onChange={(e) => setCodigoConvite(e.target.value)} inputProps={{ style: { textTransform: 'uppercase', textAlign: 'center', letterSpacing: '2px', fontSize: '20px' } }} sx={{ mb: 2, input: { color: '#00F5D4' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(0, 245, 212, 0.3)' } } }} />
                        {error && <Typography variant="caption" color="error" sx={{ display: 'block', mb: 2 }}>{error}</Typography>}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button onClick={() => setStep('CHOICE')} sx={{ color: 'rgba(255,255,255,0.5)' }}>Voltar</Button>
                            <Button onClick={handleValidarConvite} variant="contained" sx={{ bgcolor: '#00F5D4', color: '#0D0B14', fontWeight: 700 }}>Validar Acesso</Button>
                        </Box>
                    </Box>
                )}

                {step === 'LOADING' && (
                    <Box sx={{ py: 3 }}>
                        <CircularProgress size={60} thickness={4.5} sx={{ color: '#7C3AED', filter: 'drop-shadow(0px 0px 8px #7C3AED)', mb: 3 }} />
                        <Typography variant="h6" sx={{ color: '#00F5D4', fontWeight: 700 }}>Sincronizando Sessão</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>{loadingMessage}</Typography>
                    </Box>
                )}

                {step === 'SUCCESS' && (
                    <Box sx={{ py: 3 }}>
                        <Typography variant="h1" sx={{ mb: 2, filter: 'drop-shadow(0px 0px 12px #00F5D4)' }}>⚡</Typography>
                        <Typography variant="h5" sx={{ color: '#00F5D4', fontWeight: 800 }}>AMBIENTE CONFIGURADO</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};