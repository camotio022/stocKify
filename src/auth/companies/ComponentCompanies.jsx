import React, { useContext, useEffect, useState } from "react";
import * as Tag from './index';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CircularProgress from '@mui/material/CircularProgress'; // Para um loading elegante se quiser
import { AuthContext } from "../../auth_context";
import { getTenancies } from "../../api/tenancys/get";

export const ComponentCompanies = ({ onSelectCompany }) => {
    // 1. Pegamos a lista de IDs crus e as funções globais do Contexto
    const { mult_tanants, user } = useContext(AuthContext);

    // 2. Estados locais para controlar os dados reais carregados do banco e o loading
    const [empresasReais, setEmpresasReais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarWorkspaces = async () => {
            try {
                setLoading(true);

                // Prioriza os IDs do contexto, se der F5 busca a salvaguarda no sessionStorage
                const idsParaBuscar = mult_tanants?.length > 0
                    ? mult_tanants
                    : JSON.parse(sessionStorage.getItem('empresasDisponiveis') || '[]');

                if (idsParaBuscar.length === 0) {
                    setLoading(false);
                    return;
                }

                // Faz a varredura assíncrona no Firestore para buscar os dados de cada ID
                const promises = idsParaBuscar.map(async (id) => {
                    const dadosDoBanco = await getTenancies.tenancy(id);
                    return {
                        id: id,
                        // Mapeia os dados do seu banco para bater com o layout:
                        nome: dadosDoBanco?.nomeFantasia || dadosDoBanco?.name || "Unidade Sem Nome",
                        cargo: dadosDoBanco?.cargo || "Colaborador", // Adapte se tiver o cargo no doc
                        tipo: dadosDoBanco?.segmento || dadosDoBanco?.tipo || "default" // ex: 'cozinha', 'loja'
                    };
                });

                const listaFinal = await Promise.all(promises);
                setEmpresasReais(listaFinal);

            } catch (error) {
                console.error("Erro ao detalhar empresas na tela de seleção:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarWorkspaces();
    }, [mult_tanants, getTenancies]);

    // Função auxiliar para renderizar o ícone certo com base no tipo de empresa
    const renderIcon = (tipo) => {
        switch (tipo?.toLowerCase()) {
            case 'cozinha':
            case 'restaurante':
                return <RestaurantMenuIcon sx={{ fontSize: 32 }} />;
            case 'loja':
            case 'comercio':
                return <StorefrontIcon sx={{ fontSize: 32 }} />;
            default:
                return <CorporateFareIcon sx={{ fontSize: 32 }} />;
        }
    };

    // Render de carregamento mantendo a estrutura visual limpa
    if (loading) {
        return (
            <Tag.MuiContainerCompanies style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" />
            </Tag.MuiContainerCompanies>
        );
    }

    return (
        <Tag.MuiContainerCompanies>

            {/* Título e Subtítulo Centralizados */}
            <Tag.MuiCompanyHeader>
                <Tag.MuiCompanyTitle variant="h1">
                    {user?.name && user.name !== 'none' ? `Olá, ${user.name}! ` : 'Olá! '}
                    Selecione sua unidade
                </Tag.MuiCompanyTitle>
                <Tag.MuiCompanySubtitle>
                    Identificamos que seu perfil está vinculado a mais de um workspace.<br />
                    Por qual deles você deseja começar a gerenciar o estoque hoje?
                </Tag.MuiCompanySubtitle>
            </Tag.MuiCompanyHeader>

            {/* Grid Elástico dos Cards Dinâmicos */}
            <Tag.MuiCompanyGrid>
                {empresasReais.map((empresa) => (
                    <Tag.MuiCompanyCard
                        key={empresa.id}
                        onClick={() => onSelectCompany?.(empresa.id)} // Dispara a função do pai passando o ID correto string
                    >
                        {/* Círculo do Ícone */}
                        <Tag.MuiCompanyIconCircle className="icon-circle">
                            {renderIcon(empresa.tipo)}
                        </Tag.MuiCompanyIconCircle>

                        {/* Textos Informativos Reais do Firestore */}
                        <Tag.MuiCompanyName>{empresa.nome}</Tag.MuiCompanyName>
                        <Tag.MuiCompanyRole>{empresa.cargo}</Tag.MuiCompanyRole>

                        {/* O Seu Botão Padrão de 36px Reativo */}
                        <Tag.MuiStockButtonBase className="mui-stock-button">
                            Acessar Painel
                        </Tag.MuiStockButtonBase>
                    </Tag.MuiCompanyCard>
                ))}
            </Tag.MuiCompanyGrid>

            {/* Rodapé de Segurança Dinâmico */}
            <Tag.MuiCompanyFooter>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '8px' }}></i>
                Conectado como <strong>{user?.email || "usuario@stockify.com.br"}</strong>
            </Tag.MuiCompanyFooter>

        </Tag.MuiContainerCompanies>
    );
};