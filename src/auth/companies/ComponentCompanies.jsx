import React from "react";
import * as Tag from './index'; // Puxando os styled components do seu arquivo de estilos
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export const ComponentCompanies = ({ onSelectCompany }) => {
    
    // Lista dinâmica (Simulando o que vai vir do seu hook ou do Firebase)
    const empresas = [
        { id: 1, nome: "Restaurante Sabor Real", cargo: "Administrador", tipo: "cozinha" },
        { id: 2, nome: "Stockify Filial Matriz", cargo: "Gerente Geral", tipo: "loja" },
        { id: 3, nome: "Centro de Distribuição", cargo: "Visualizador", tipo: "deposito" }
    ];

    // Função auxiliar para renderizar o ícone certo com base no tipo de empresa
    const renderIcon = (tipo) => {
        switch(tipo) {
            case 'cozinha': return <RestaurantMenuIcon sx={{ fontSize: 32 }} />;
            case 'loja': return <StorefrontIcon sx={{ fontSize: 32 }} />;
            default: return <CorporateFareIcon sx={{ fontSize: 32 }} />;
        }
    };

    return (
        <Tag.MuiContainerCompanies>
            
            {/* Título e Subtítulo Centralizados */}
            <Tag.MuiCompanyHeader>
                <Tag.MuiCompanyTitle variant="h1">
                    Selecione sua unidade
                </Tag.MuiCompanyTitle>
                <Tag.MuiCompanySubtitle>
                    Identificamos mais de um workspace vinculado ao seu perfil.<br />
                    Escolha por onde deseja começar hoje.
                </Tag.MuiCompanySubtitle>
            </Tag.MuiCompanyHeader>

            {/* Grid Elástico dos Cards */}
            <Tag.MuiCompanyGrid>
                {empresas.map((empresa) => (
                    <Tag.MuiCompanyCard 
                        key={empresa.id} 
                        onClick={() => onSelectCompany?.(empresa.id)}
                    >
                        {/* Círculo do Ícone */}
                        <Tag.MuiCompanyIconCircle className="icon-circle">
                            {renderIcon(empresa.tipo)}
                        </Tag.MuiCompanyIconCircle>

                        {/* Textos Informativos */}
                        <Tag.MuiCompanyName>{empresa.nome}</Tag.MuiCompanyName>
                        <Tag.MuiCompanyRole>{empresa.cargo}</Tag.MuiCompanyRole>

                        {/* O Seu Botão Padrão de 36px Reativo */}
                        <Tag.MuiStockButtonBase className="mui-stock-button">
                            Acessar Painel
                        </Tag.MuiStockButtonBase>
                    </Tag.MuiCompanyCard>
                ))}
            </Tag.MuiCompanyGrid>

            {/* Rodapé de Segurança Minimalista */}
            <Tag.MuiCompanyFooter>
                <i class="fa-solid fa-shield-halved" style={{ marginRight: '8px' }}></i>
                Conectado como <strong>timo@stockify.com.br</strong>
            </Tag.MuiCompanyFooter>

        </Tag.MuiContainerCompanies>
    );
};