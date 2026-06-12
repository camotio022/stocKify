import React, { useState, useEffect, useContext } from "react";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import { TagsColab } from "./styles";
import { AuthContext } from "../../auth_context/index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const CollaboratorSelector = ({ colaboradores, setColaboradores, accentColor }) => {
    const { user, tenant } = useContext(AuthContext);
    const [teamMembers, setTeamMembers] = useState([]); // Guarda os funcionários da unidade

    // 🔍 BUSCA TODOS OS OPERADORES/MENDOS DA MESMA EMPRESA NO FIREBASE
    useEffect(() => {
        const fetchCompanyTeam = async () => {
            if (!tenant?.id) return;
            try {
                // Busca os usuários que pertencem ao mesmo tenantId
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("tenantId", "==", tenant.id));
                const querySnapshot = await getDocs(q);
                
                const members = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Evita mostrar o próprio usuário logado na lista de seleção (ele já é o dono)
                    if (doc.id !== user?.id) {
                        members.push({ id: doc.id, name: data.name, email: data.email });
                    }
                });
                setTeamMembers(members);
            } catch (error) {
                console.error("Erro ao carregar equipe para colaboração:", error);
            }
        };

        fetchCompanyTeam();
    }, [tenant?.id, user?.id]);

    const handleAddColab = (event) => {
        const selectedId = event.target.value;
        if (!selectedId) return;

        const memberToAdd = teamMembers.find(m => m.id === selectedId);
        
        // Evita duplicar o mesmo parceiro no array
        if (memberToAdd && !colaboradores.some(c => c.userId === selectedId)) {
            setColaboradores(prev => [
                ...prev,
                { userId: memberToAdd.id, userName: memberToAdd.name, role: "editor" }
            ]);
        }
    };

    const handleRemoveColab = (userIdToRemove) => {
        setColaboradores(prev => prev.filter(c => c.userId !== userIdToRemove));
    };

    return (
        <TagsColab.wrapper>
            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                👥 Colaboradores da Unidade
            </InputLabel>

            {/* Renderiza os chips dos parceiros adicionados */}
            <TagsColab.chipsArea>
                {colaboradores.map((colab, idx) => (
                    <TagsColab.neonChip
                        key={idx}
                        label={colab.userName}
                        onDelete={() => handleRemoveColab(colab.userId)}
                        sx={{ '&:hover': { borderColor: accentColor } }}
                    />
                ))}
                {colaboradores.length === 0 && (
                    <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '13px', fontStyle: 'italic' }}>
                        Lista privada (Apenas você visualiza)
                    </span>
                )}
            </TagsColab.chipsArea>

            {/* Dropdown de seleção de equipe */}
            <FormControl variant="filled" fullWidth>
                <TagsColab.selectBox
                    displayEmpty
                    value=""
                    onChange={handleAddColab}
                    sx={{ '&:focus-within': { borderColor: accentColor } }}
                >
                    <MenuItem value="" disabled style={{ color: 'rgba(0,0,0,0.5)' }}>
                        + Adicionar parceiro de equipe à lista...
                    </MenuItem>
                    {teamMembers
                        .filter(member => !colaboradores.some(c => c.userId === member.id)) // Filtra os que já foram adicionados
                        .map((member) => (
                            <MenuItem key={member.id} value={member.id}>
                                {member.name}
                            </MenuItem>
                        ))
                    }
                </TagsColab.selectBox>
            </FormControl>
        </TagsColab.wrapper>
    );
};


import { Box, Stack, Chip, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Root } from "../../styles/Root/root_styles";

export const TagsColab = {
    // 🎛️ CONTAINER DO SELETOR FLUIDO
    wrapper: styled(Stack)(() => ({
        width: '100%',
        gap: '12px',
        marginTop: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '16px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    })),

    // 🏷️ ÁREA DOS CHIPS EM DESIGN DE MATRIZ VIVA
    chipsArea: styled(Box)(() => ({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%'
    })),

    // 🔮 CHIP NEON NEOMÓRFICO
    neonChip: styled(Chip)(() => ({
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(8px)',
        color: '#FFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '13px',
        fontWeight: 600,
        transition: 'all 0.25s ease-in-out',
        '& .MuiChip-deleteIcon': {
            color: 'rgba(255, 255, 255, 0.4)',
            transition: 'all 0.2s',
            '&:hover': { color: '#FF6B6B' }
        }
    })),

    //  dropdown escuro do seletor
    selectBox: styled(Select)(() => ({
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#FFF',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        '& .MuiSelect-select': { display: 'flex', alignItems: 'center' },
        '&:hover': { boxShadow: `0 0 0 2px rgba(255, 255, 255, 0.1)` },
        '& .MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.3)' }
    }))
};