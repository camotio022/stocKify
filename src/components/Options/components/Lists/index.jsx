import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { StylesLists } from "./styles"
import { AuthContext } from "../../../../auth_context/index.jsx";
import { Root } from "../../../../styles/Root/root_styles";

export const MyLists = ({ item }) => {
    const { tenant } = useContext(AuthContext);
    const [creating, setCreating] = useState(false);

    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    // Array fictício simulando o seu retorno do banco de listas vinculadas
    const mockListas = [
        { nome: "Inventário Mensal Moda", tipo: "Geral" },
        { nome: "Reposição Cozinha Lateral", tipo: "Urgente" }
    ];

    return (
        <StylesLists.listContain>
            {/* Tabela de Listas Ativas */}
            {!creating && (
                <>
                    <StylesLists.headerInfos>
                        <Box sx={{ width: '60%', textAlign: 'left' }}>Nome da Lista</Box>
                        <Box sx={{ width: '40%', textAlign: 'right' }}>Tipo</Box>
                    </StylesLists.headerInfos>

                    <StylesLists.contain>
                        {mockListas.map((lista, index) => (
                            <StylesLists.menuItem key={index}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 500, width: '60%', textAlign: 'left' }}>
                                    {lista.nome}
                                </Typography>
                                <Typography sx={{ fontSize: '13px', color: accentColor, fontWeight: 600, width: '40%', textAlign: 'right' }}>
                                    {lista.tipo}
                                </Typography>
                            </StylesLists.menuItem>
                        ))}
                    </StylesLists.contain>

                    <StylesLists.button
                        onClick={() => setCreating(true)}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${glowColor}50`,
                            color: '#FFF',
                            '&:hover': {
                                backgroundColor: `${glowColor}20`,
                                boxShadow: `0 0 15px ${glowColor}30`
                            }
                        }}
                    >
                        <Add sx={{ fontSize: '18px', color: accentColor }} />
                        Nova Lista
                    </StylesLists.button>
                </>
            )}

            {/* Painel de Criação de Nova Lista */}
            {creating && (
                <StylesLists.tagDescription>
                    <Typography sx={{ fontWeight: 600, color: '#FFF', width: '100%', textAlign: 'left' }}>
                        Criar nova lista de destino
                    </Typography>
                    
                    <StylesLists.tagDescriptionInput 
                        placeholder="Digite o nome da lista..." 
                    />

                    <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                        <StylesLists.tagDescriptionButton
                            onClick={() => setCreating(false)}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }}
                        >
                            Cancelar
                        </StylesLists.tagDescriptionButton>

                        <StylesLists.tagDescriptionButton
                            sx={{
                                background: `linear-gradient(90deg, ${glowColor} 0%, ${accentColor} 100%)`,
                                '&:hover': { filter: 'brightness(1.1)' }
                            }}
                        >
                            Salvar Lista
                        </StylesLists.tagDescriptionButton>
                    </Box>
                </StylesLists.tagDescription>
            )}
        </StylesLists.listContain>
    );
};