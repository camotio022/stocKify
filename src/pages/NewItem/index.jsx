import React, { useContext, useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import { TagsNewItem } from "./styles";
import { CircularProgress, InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material'; 
import { Root } from "../../styles/Root/root_styles";
import { addProduct } from "../../api/products/add";
import { AuthContext } from '../../auth_context/index';
import { SimpleAlert } from "../../components/Alert";

// 🚀 Importação do nosso dicionário de 20 segmentos oficial


import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase_config";
import { SEGMENT_TEMPLATES } from "../../../hooks/utils";

export const NewItem = ({ newItem, setNewItem }) => {
    const { user, tenant } = useContext(AuthContext);
    const [progress, setProgress] = useState(false);
    const [success, setSuccess] = useState(false);

    // 🧬 Estados Dinâmicos para a Regra de Negócio Real
    const [colunas, setColunas] = useState([]); 
    const [formData, setFormData] = useState({}); 
    
    // 🧠 Estado para controlar o primeiro select da engrenagem assistida
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    // Pega o dicionário específico do segmento atual do Tenant
    const segmentoAtivo = tenant?.segmento || "mercearia_mercado";
    const dicionarioDoNicho = SEGMENT_TEMPLATES[segmentoAtivo]?.dicionario || {};

    // 🔍 BUSCA A ARRAY 'colunasEstoque' EXCLUSIVA DO TENANT NO FIREBASE
    useEffect(() => {
        const fetchTenantColumns = async () => {
            if (!tenant?.id) return;
            try {
                const tenantRef = doc(db, "tenants", tenant.id);
                const tenantSnap = await getDoc(tenantRef);

                if (tenantSnap.exists()) {
                    const tenantData = tenantSnap.data();
                    const colunasDoBanco = tenantData.colunasEstoque || [];
                    setColunas(colunasDoBanco);

                    // 🛡️ Inicializa o formulário limpo usando 'col.campo'
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

        if (newItem) {
            fetchTenantColumns();
            setCategoriaSelecionada(""); // Reseta a categoria ao abrir o modal
        }
    }, [newItem, tenant?.id]);

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

        // 🧹 Tratamento sanitário usando o seu 'col.campo' oficial
        const cleanPayload = {};
        colunas.forEach(col => {
            if (col.campo && col.campo !== 'id' && col.campo !== 'actions' && col.campo !== 'dataChegada') {
                const value = formData[col.campo];

                if (col.type === 'number') {
                    cleanPayload[col.campo] = value !== "" && value !== undefined ? Number(value) : 0;
                } else {
                    cleanPayload[col.campo] = value !== undefined ? value : "";
                }
            }
        });

        // 🚀 A SUA NOVA ESTRATÉGIA: Payload com rastreabilidade completa de categorias no Firebase
        const payload = {
            ...cleanPayload,
            categoria_assistida: categoriaSelecionada || "Geral", // Salva o grupo (Ex: Secos & Enlatados)
            segmento_origem: segmentoAtivo, // Salva o nicho de origem
            dataChegada: new Date().toISOString().split('T')[0],
            author: {
                userName: user?.name || 'Operador',
                userEmail: user?.email || '',
                userId: user?.id || user?.uid || ''
            }
        };

        try {
            // 💥 Chamada única e atômica: adiciona em /produtos e já gera a movimentação de entrada em /movimentacoes
            await addProduct.add(tenant.id, payload);

            setSuccess(true);
            setTimeout(() => {
                // Reseta o formulário
                const resetForm = {};
                colunas.forEach(col => { if (col.campo) resetForm[col.campo] = ""; });
                setFormData(resetForm);
                setCategoriaSelecionada("");

                setSuccess(false);
                setNewItem(false);
            }, 2000);
        } catch (err) {
            console.error("Erro crítico ao registrar produto dinâmico na subcoleção:", err);
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

                {/* 🔄 RENDERIZADOR DINÂMICO DE ENTRADAS ASSISTIDAS */}
                {colunas.map((col, index) => {
                    if (!col.campo || col.campo === 'id' || col.campo === 'actions' || col.campo === 'dataChegada') return null;

                    const chaveUnica = col.campo || `input-${index}`;
                    const ehObrigatorio = col.required ?? true;

                    // 🧠 VALIDAÇÃO ESTRATÉGICA SUPREMA: Se o campo for o Nome Assistido por Filtro
                    if (col.campo === "nome" && col.type === "select_assistido") {
                        return (
                            <Box key={chaveUnica} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                
                                {/* Dropdown PASSO 1: Selecionar a Categoria do Dicionário */}
                                <TagsNewItem.fromControl variant="filled" required={ehObrigatorio}>
                                    <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }}>Categoria do Item</InputLabel>
                                    <Select
                                        value={categoriaSelecionada}
                                        onChange={(e) => {
                                            setCategoriaSelecionada(e.target.value);
                                            setFormData(prev => ({ ...prev, nome: "" })); // Limpa o nome anterior
                                        }}
                                    >
                                        {Object.keys(dicionarioDoNicho).map((cat) => (
                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                        ))}
                                    </Select>
                                </TagsNewItem.fromControl>

                                {/* Dropdown PASSO 2: Selecionar o Item correspondente filtrado */}
                                <TagsNewItem.fromControl 
                                    variant="filled" 
                                    required={ehObrigatorio}
                                    disabled={!categoriaSelecionada}
                                    sx={{ opacity: !categoriaSelecionada ? 0.5 : 1 }}
                                >
                                    <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }}>{col.label}</InputLabel>
                                    <Select
                                        name="nome"
                                        value={formData.nome || ''}
                                        onChange={handleInputChange}
                                    >
                                        {categoriaSelecionada && dicionarioDoNicho[categoriaSelecionada].map((itemSugerido) => (
                                            <MenuItem key={itemSugerido} value={itemSugerido}>
                                                {itemSugerido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TagsNewItem.fromControl>
                            </Box>
                        );
                    }

                    // 🎭 CENÁRIO B: Dropdown tradicional fixo (Ex: tamanho)
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

                    // ⌨️ CENÁRIO C: Inputs tradicionais controlados (quantidade, preco, codigo_barras)
                    return (
                        <TagsNewItem.textfield
                            key={chaveUnica}
                            id={chaveUnica}
                            name={col.campo}
                            required={ehObrigatorio}
                            label={col.label || col.campo}
                            type={col.type || 'text'}
                            variant="filled"
                            value={formData[col.campo] !== undefined ? formData[col.campo] : ''}
                            onChange={handleInputChange}
                            InputLabelProps={col.type === 'date' ? { shrink: true } : undefined}
                            inputProps={{
                                ...(col.type === 'number' && { min: 0, step: "any" })
                            }}
                            sx={{ '&:focus-within': { borderColor: accentColor }, '& .MuiInputLabel-root.Mui-focused': { color: accentColor } }}
                        />
                    );
                })}

                {/* 🛡️ BOTÃO DE SUBMIT COM VALIDAÇÃO COMPLETA */}
                <TagsNewItem.submit
                    onClick={handleSubmit}
                    disabled={
                        progress ||
                        !tenant?.id ||
                        colunas.length === 0 ||
                        
                        // Garante que o usuário escolheu o nome e a categoria assistida
                        (colunas.some(c => c.type === "select_assistido") && !categoriaSelecionada) ||

                        colunas.some(col => {
                            if (!col.campo || col.campo === 'id' || col.campo === 'actions' || col.campo === 'dataChegada') return false;
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