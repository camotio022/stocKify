import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Importado para navegar direto daqui
import * as Tag from './index';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../auth_context";
import { getTenancies } from "../../api/tenancys/get";

// 💡 Removemos a prop 'onSelectCompany', ele agora resolve tudo sozinho
export const ComponentCompanies = () => {
    // 1. Puxamos o setTenant direto do contexto global do Stockify
    const { mult_tanants, user, setTenant } = useContext(AuthContext);
    const navigate = useNavigate();

    const [empresasReais, setEmpresasReais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarWorkspaces = async () => {
            try {
                setLoading(true);
                const idsParaBuscar = mult_tanants?.length > 0
                    ? mult_tanants
                    : JSON.parse(sessionStorage.getItem('empresasDisponiveis') || '[]');

                if (idsParaBuscar.length === 0) {
                    setLoading(false);
                    return;
                }

                const promises = idsParaBuscar.map(async (id) => {
                    const dadosDoBanco = await getTenancies.tenancy(id);
                    return {
                        id: id,
                        nome: dadosDoBanco?.nomeFantasia || dadosDoBanco?.name || "Unidade Sem Nome",
                        cargo: dadosDoBanco?.cargo || "Colaborador",
                        tipo: dadosDoBanco?.segmento || dadosDoBanco?.tipo || "default"
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

    // 🎯 A FUNÇÃO CENTRALIZADA DIRETO NO COMPONENTE
    const handleWorkspaceClick = (empresaSelecionada) => {
        // 🟢 Padroniza o objeto garantindo que ele tenha tanto 'nome' quanto 'name' 
        // para nenhuma outra tela do Stockify ler 'undefined'
        const tenantData = {
            id: empresaSelecionada.id,
            name: empresaSelecionada.nome || empresaSelecionada.name || "Unidade Sem Nome",
            nome: empresaSelecionada.nome || empresaSelecionada.name || "Unidade Sem Nome",
            tipo: empresaSelecionada.tipo || empresaSelecionada.segmento || "default"
        };

        // 1. Alimenta o contexto global com o objeto perfeito
        setTenant(tenantData);

        // 2. Grava as salvaguardas síncronas usando rigorosamente o MESMO objeto estruturado
        sessionStorage.setItem("activeTenantId", tenantData.id); // String pura do ID
        sessionStorage.setItem('tenant', JSON.stringify(tenantData)); // Objeto JSON limpo e padronizado

        // Limpa a lista temporária
        sessionStorage.removeItem('empresasDisponiveis');

        // 3. Navega de cabeça erguida para a Home
        window.location.replace('/')
    };

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

    if (loading) {
        return (
            <Tag.MuiContainerCompanies style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" />
            </Tag.MuiContainerCompanies>
        );
    }

    return (
        <Tag.MuiContainerCompanies>
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

            <Tag.MuiCompanyGrid>
                {empresasReais.map((empresa) => (
                    <Tag.MuiCompanyCard
                        key={empresa.id}
                        /* 🟢 Dispara a função interna direto no clique do Card */
                        onClick={() => handleWorkspaceClick(empresa)}
                    >
                        <Tag.MuiCompanyIconCircle className="icon-circle">
                            {renderIcon(empresa.tipo)}
                        </Tag.MuiCompanyIconCircle>

                        <Tag.MuiCompanyName>{empresa.nome}</Tag.MuiCompanyName>
                        <Tag.MuiCompanyRole>{empresa.cargo}</Tag.MuiCompanyRole>

                        <Tag.MuiStockButtonBase className="mui-stock-button">
                            Acessar Painel
                        </Tag.MuiStockButtonBase>
                    </Tag.MuiCompanyCard>
                ))}
            </Tag.MuiCompanyGrid>

            <Tag.MuiCompanyFooter>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '8px' }}></i>
                Conectado como <strong>{user?.email || "usuario@stockify.com.br"}</strong>
            </Tag.MuiCompanyFooter>
        </Tag.MuiContainerCompanies>
    );
};