import React, { useContext, useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import { TagsNewItem } from "./styles";
import { CircularProgress } from '@mui/material';
import { Root } from "../../styles/Root/root_styles";
import { addProduct } from "../../api/products/add";
import { AuthContext } from '../../auth_context/index';
import { SimpleAlert } from "../../components/Alert";

// Imports do Firebase para ler o documento do Tenant logado
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const NewItem = ({ newItem, setNewItem }) => {
    const { user, tenant } = useContext(AuthContext);
    const [progress, setProgress] = useState(false);
    const [success, setSuccess] = useState(false);

    // 🧬 Estados Dinâmicos para a Regra de Negócio Real
    const [colunas, setColunas] = useState([]); // Armazena a array 'colunasEstoque' vinda do Firebase
    const [formData, setFormData] = useState({}); // Controla os inputs gerados na tela

    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    // 🔍 BUSCA A ARRAY 'colunasEstoque' EXCLUSIVA DO TENANT NO FIREBASE
    useEffect(() => {
        const fetchTenantColumns = async () => {
            if (!tenant?.id) return;
            try {
                const tenantRef = doc(db, "tenants", tenant.id);
                const tenantSnap = await getDoc(tenantRef);

                if (tenantSnap.exists()) {
                    const tenantData = tenantSnap.data();

                    // Pega a sua array cadastrada no Firebase
                    const colunasDoBanco = tenantData.colunasEstoque || [];
                    setColunas(colunasDoBanco);

                    // 🛡️ Inicializa o formulário usando 'col.campo' para evitar uncontrolled inputs
                    setFormData(prev => {
                        const initialForm = { ...prev };
                        colunasDoBanco.forEach(col => {
                            if (col.campo && col.campo !== 'id' && col.campo !== 'actions' && col.campo !== 'dataChegada') {
                                if (initialForm[col.campo] === undefined) {
                                    initialForm[col.campo] = "";
                                }
                            }
                        });
                        return initialForm;
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar a array colunasEstoque do tenant:", error);
            }
        };

        if (newItem) fetchTenantColumns();
    }, [newItem, tenant?.id]);

    // 🚀 Atualização limpa capturando a chave pelo name do target nativo
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!tenant?.id) return;
        setProgress(true);

        // 🧹 Tratamento sanitário usando 'col.campo' para salvar sem chaves undefined
        const cleanPayload = {};
        colunas.forEach(col => {
            if (col.campo && col.campo !== 'id' && col.campo !== 'actions' && col.campo !== 'dataChegada') {
                const value = formData[col.campo];

                // Se no esquema do banco diz que é número, limpa e força a conversão matemática
                if (col.type === 'number') {
                    cleanPayload[col.campo] = value !== "" && value !== undefined ? Number(value) : 0;
                } else {
                    cleanPayload[col.campo] = value !== undefined ? value : "";
                }
            }
        });

        // 🚀 Payload montado perfeitamente integrado ao cruzamento de dados
        const payload = {
            ...cleanPayload,
            tenantId: tenant.id,
            dataChegada: new Date().toISOString().split('T')[0],
            author: {
                userName: user?.name || 'Operador',
                userEmail: user?.email || '',
                userId: user?.id || ''
            }
        };

        try {
            await addProduct.add(payload, tenant.id);
            await addProduct.novas_entradas(payload, tenant.id);

            setSuccess(true);
            setTimeout(() => {
                // Reseta o estado do formulário mantendo as chaves estruturadas limpas
                const resetForm = {};
                colunas.forEach(col => { if (col.campo) resetForm[col.campo] = ""; });
                setFormData(resetForm);

                setSuccess(false);
                setNewItem(false);
            }, 2000);
        } catch (err) {
            console.error("Erro crítico ao registrar produto dinâmico:", err);
        } finally {
            setProgress(false);
        }
    };

    if (!newItem) return null;

    return (
        <TagsNewItem.container>
            <TagsNewItem.paper sx={{ borderTop: `3px solid ${accentColor}` }}>

                {success && (
                    <SimpleAlert item={formData.nome || 'Produto'} quantidade={formData.quantidade || ''} />
                )}

                <TagsNewItem.close onClick={() => setNewItem(false)}>
                    <Close sx={{ fontSize: '16px' }} />
                </TagsNewItem.close>

                <TagsNewItem.typography>
                    Novo Registro ({tenant?.name || 'Estoque'})
                </TagsNewItem.typography>

                {/* 🔄 RENDERIZADOR REAL: Mapeia os inputs usando as propriedades 'campo' e 'label' do seu print */}
                {/* 🔄 RENDERIZADOR INTELIGENTE AUTOVALIDADO */}
                {colunas.map((col, index) => {
                    // Ignora chaves administrativas que o sistema controla por fora
                    if (!col.campo || col.campo === 'id' || col.campo === 'actions' || col.campo === 'dataChegada') return null;

                    const chaveUnica = col.campo || `input-${index}`;
                    const ehObrigatorio = col.required ?? true;

                    // 🎭 CENÁRIO A: Se no Firebase você definiu o type como "select", ele vira um Dropdown
                    if (col.type === 'select') {
                        return (
                            <TagsNewItem.fromControl
                                key={chaveUnica}
                                variant="filled"
                                required={ehObrigatorio}
                                sx={{ '&:focus-within': { borderColor: accentColor }, '& .MuiInputLabel-root.Mui-focused': { color: accentColor } }}
                            >
                                <InputLabel>{col.label}</InputLabel>
                                <Select
                                    name={col.campo}
                                    value={formData[col.campo] !== undefined ? formData[col.campo] : ''}
                                    // Simula o formato do evento nativo para reaproveitar a sua função handleInputChange existente
                                    onChange={(e) => handleInputChange({ target: { name: col.campo, value: e.target.value } })}
                                >
                                    {col.options?.map((opcao, optIdx) => (
                                        <MenuItem key={optIdx} value={opcao}>
                                            {opcao}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TagsNewItem.fromControl>
                        );
                    }

                    // ⌨️ CENÁRIO B: Se for text, number ou date, o TextField assume o controle e se valida sozinho
                    return (
                        <TagsNewItem.textfield
                            key={chaveUnica}
                            id={chaveUnica}
                            name={col.campo}
                            required={ehObrigatorio}
                            label={col.label || col.campo}

                            // 🔥 MÁGICA: O input muda de comportamento dinamicamente (vira calendário se for 'date', bloqueia letras se for 'number')
                            type={col.type || 'text'}

                            variant="filled"
                            value={formData[col.campo] !== undefined ? formData[col.campo] : ''}
                            onChange={handleInputChange}

                            // Força o texto do label a encolher se for campo de data para não atropelar o calendário nativo
                            InputLabelProps={col.type === 'date' ? { shrink: true } : undefined}

                            // Validações nativas do HTML5 baseadas no tipo
                            inputProps={{
                                ...(col.type === 'number' && { min: 0, step: "any" }) // Impede números negativos em preço/quaantidade
                            }}
                            sx={{ '&:focus-within': { borderColor: accentColor }, '& .MuiInputLabel-root.Mui-focused': { color: accentColor } }}
                        />
                    );
                })}

                {/* 🛡️ BOTÃO DE SUBMIT COM VALIDAÇÃO DINÂMICA REAL */}
                <TagsNewItem.submit
                    onClick={handleSubmit}
                    disabled={
                        progress ||
                        !tenant?.id ||
                        colunas.length === 0 ||

                        // Varre a array e bloqueia o botão se achar algum campo obrigatorio em branco
                        colunas.some(col => {
                            if (!col.campo || col.campo === 'id' || col.campo === 'actions' || col.campo === 'dataChegada') {
                                return false;
                            }
                            const valor = formData[col.campo];
                            return valor === undefined || String(valor).trim() === "";
                        })
                    }
                    sx={{
                        background: `linear-gradient(90deg, ${glowColor} 0%, ${accentColor} 100%)`,
                        boxShadow: `0 4px 14px ${glowColor}35`,
                        '&:hover': { boxShadow: `0 0 22px ${glowColor}50` }
                    }}
                >
                    {!progress ? 'Confirmar Registro' : 'Registrando...'}
                    {progress && (
                        <CircularProgress size={18} sx={{ marginLeft: '12px', color: '#FFF' }} />
                    )}
                </TagsNewItem.submit>

            </TagsNewItem.paper>
        </TagsNewItem.container>
    );
};