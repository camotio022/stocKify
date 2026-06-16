export const SEGMENT_TEMPLATES = {
    // ==========================================
    // 1. MERCADOS, CONVENIÊNCIAS E MERCEARIAS
    // ==========================================
    mercearia_mercado: {
        label: "Mercado & Loja de Conveniência",
        icon: "🛒",
        dicionario: {
            "Verduras & Legumes": [
                'Alface', 'Rúcula', 'Agrião', 'Espinafre', 'Tomate', 'Cebola', 
                'Pimentão', 'Abóbora', 'Cenoura', 'Pepino', 'Repolho', 'Batata', 
                'Batata-doce', 'Ervilha', 'Vagem', 'Berinjela', 'Quiabo', 'Chuchu'
            ],
            "Frutas Frescas": [
                'Maçã', 'Banana', 'Laranja', 'Uva', 'Morango', 'Pera', 'Melancia', 
                'Abacaxi', 'Melão', 'Manga', 'Pêssego', 'Kiwi', 'Limão', 'Goiaba', 'Coco'
            ],
            "Carnes & Proteínas": [
                'Presunto', 'Presunto de peru', 'Salame', 'Salsicha', 'Peito de frango', 
                'Carne bovina', 'Carne suína', 'Carne de frango', 'Linguiça', 'Bacon', 
                'Costela', 'Filé mignon', 'Alcatra', 'Picanha', 'Frango assado'
            ],
            "Produtos Lácteos & Derivados": [
                'Leite integral', 'Leite desnatado', 'Leite sem lactose', 'Iogurte natural', 
                'Iogurte grego', 'Queijo mussarela', 'Queijo prato', 'Queijo minas', 
                'Queijo parmesão', 'Manteiga com sal', 'Manteiga sem sal', 'Creme de leite', 
                'Leite condensado', 'Requeijão cremoso', 'Sorvete de pote', 'Sorvete de chocolate'
            ],
            "Secos & Enlatados": [
                'Arroz Branco 1kg', 'Arroz Branco 5kg', 'Arroz Integral 1kg', 'Arroz Integral 5kg', 
                'Feijão Branco 1kg', 'Feijão Preto 1kg', 'Macarrão Penne', 'Macarrão Espaguete', 
                'Macarrão Parafuso', 'Farinha de trigo', 'Farinha de milho', 'Açúcar', 'Sal', 
                'Café/Torrado/Moído', 'Óleo de cozinha', 'Vinagre', 'Molho de tomate', 'Catchup', 
                'Maionese', 'Azeitonas', 'Milho enlatado', 'Ervilha enlatada', 'Sardinha em lata', 'Atum em lata'
            ],
            "Padaria & Outros": [
                'Pão de forma branco', 'Pão de forma integral', 'Pão francês', 'Bolacha Maria', 
                'Bolacha de maisena', 'Bolacha de chocolate', 'Torradas simples', 'Cereal de milho', 
                'Granola tradicional', 'Nozes inteiras', 'Castanhas de caju', 'Uvas passas', 'Chocolate ao leite'
            ]
        },
        columns: [
            { campo: "nome", label: "NOME DO ITEM", type: "select_assistido" }, 
            { campo: "codigo_barras", label: "CÓDIGO DE BARRAS / EAN", type: "text" },
            { campo: "quantidade", label: "QUANTIDADE", type: "number", sufixo: ["item", "itens"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 2. RESTAURANTE / ALIMENTAÇÃO
    // ==========================================
    restaurante: {
        label: "Restaurante / Alimentação",
        icon: "🍔",
        dicionario: {
            "Proteínas (Cozinha)": [
                "Picanha Fatiada KG", "Filé de Frango KG", "Bacon Defumado em Cubos KG", 
                "Carne Moída Patinho KG", "Corte de Alcatra KG", "Costela Suína KG"
            ],
            "Hortifrúti (Cozinha)": [
                "Tomate Italiano KG", "Cebola Roxa KG", "Alface Americana Lavada UN", 
                "Batata Monalisa KG", "Pimentão Amarelo KG", "Alho Descascado Macete KG"
            ],
            "Insumos & Secos": [
                "Óleo de Soja Pet 900ml", "Sal Refinado Moído 1KG", "Arroz Agulhinha Tipo 1 5KG",
                "Feijão Preto Tipo 1 1KG", "Molho de Tomate Bag 2KG", "Farinha de Trigo Especial 1KG"
            ],
            "Bebidas & Copa": [
                "Refrigerante Cola Lata 350ml", "Guaraná Lata 350ml", "Água Mineral Sem Gás 500ml",
                "Cerveja Puro Malte Long Neck", "Suco de Uva Integral 1L"
            ]
        },
        columns: [
            { campo: "nome", label: "INSUMO / INGREDIENTE", type: "select_assistido" },
            { campo: "quantidade", label: "QUANTIDADE ATUAL", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE CUSTO (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 3. BOUTIQUE / LOJA DE ROUPAS
    // ==========================================
    vestuario: {
        label: "Boutique / Loja de Roupas",
        icon: "👕",
        dicionario: {
            "Partes de Cima": [
                "Camiseta Algodão Penteado", "Camisa Polo Piquet", "Blusa Canelada Feminina", 
                "Cropped Suplex", "Camisa Social Linho", "Regata Ribana Básica"
            ],
            "Partes de Baixo": [
                "Calça Jeans Skinny", "Calça Jeans Slouchy", "Bermuda Sarja Casual", 
                "Shorts Jeans Desfiado", "Calça Alfaiataria", "Saia Midi Linho"
            ],
            "Casacos & Inverno": [
                "Moletom Canguru Com Capuz", "Jaqueta Jeans Oversized", "Cardigan de Tricô", 
                "Blazer Alfaiataria Estruturado", "Jaqueta Couro Fake"
            ],
            "Moda Íntima & Praia": [
                "Meia Sapatilha Algodão", "Cueca Boxer Microfibra", "Top Biquíni Cortininha", 
                "Calcinha Sem Costura"
            ]
        },
        columns: [
            { campo: "nome", label: "PEÇA / MODELO", type: "select_assistido" }, 
            { campo: "tamanho", label: "TAMANHO", type: "select", options: ["PP", "P", "M", "G", "GG", "XG", "Único"] },
            { campo: "cor", label: "COR", type: "text" },
            { campo: "quantidade", label: "QTD. CABIDE", type: "number", sufixo: ["cabide", "cabides"] },
            { campo: "preco", label: "PREÇO DE ETIQUETA (R$)", type: "currency" } 
        ]
    },

    // ==========================================
    // 4. ÓTICA & RELOJOARIA
    // ==========================================
    oticas: {
        label: "Ótica & Relojoaria",
        icon: "👓",
        dicionario: {
            "Armações": [
                "Armação Acetato Masculina", "Armação Acetato Feminina", 
                "Armação Metal Light Fina", "Armação Infantil Flexível Nylon", "Óculos de Sol Casual Polarizado"
            ],
            "Lentes de Grau": [
                "Lente Visão Simples Antirreflexo", "Lente Multifocal Digital HD", 
                "Lente Fotocromática SmartTrans", "Lente Policarbonato Resistente"
            ],
            "Lentes de Contato": [
                "Lente Descartável Mensal Incolor", "Lente Tórica p/ Astigmatismo", 
                "Lente Colorida Estética Soft", "Solução de Limpeza p/ Lentes 360ml"
            ],
            "Relojoaria & Acessórios": [
                "Relógio Analógico Aço Inox", "Relógio Digital Esportivo", 
                "Estojo Rígido p/ Óculos", "Cordão de Retenção Silicone"
            ]
        },
        columns: [
            { campo: "nome", label: "PRODUTO / ARMAÇÃO", type: "select_assistido" },
            { campo: "marca", label: "MARCA / GRIFE", type: "text" },
            { campo: "quantidade", label: "PEÇAS EM ESTOQUE", type: "number", sufixo: ["peça", "peças"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 5. MOTOPEÇAS & OFICINA
    // ==========================================
    moto_pecas: {
        label: "Motopeças & Oficina",
        icon: "🏍️",
        dicionario: {
            "Motor & Transmissão": [
                "Kit Transmissão (Relação/Corrente/Coroa)", "Disco de Embreagem Especial", 
                "Pistão com Anéis Original", "Junta do Cabeçote Fibra", "Vela de Ignição Iridium"
            ],
            "Frenagem & Suspensão": [
                "Pastilha de Freio Dianteira", "Lona de Freio Traseira", 
                "Retentor da Bengala Suspensão", "Amortecedor Traseiro Par", "Cabo de Freio de Aço"
            ],
            "Pneus & Rodas": [
                "Pneu Dianteiro Tradicional", "Pneu Traseiro Reforçado", 
                "Câmara de Ar Vedada", "Raio de Roda Cromado Jogo"
            ],
            "Óleos & Químicos": [
                "Óleo Lubrificante Motor 4T 20W50", "Óleo Lubrificante Motor 4T 10W30 Semisintético", 
                "Fluido de Freio DOT 4", "Graxa Branca de Lítio Tubo"
            ]
        },
        columns: [
            { campo: "nome", label: "PEÇA / COMPONENTE", type: "select_assistido" },
            { campo: "marca", label: "MARCA / FABRICANTE", type: "text" },
            { campo: "compatibilidade", label: "COMPATIBILIDADE", type: "select", options: ["Até 160cc", "300cc a 500cc", "Alta Cilindrada", "Universal"] },
            { campo: "quantidade", label: "PEÇAS EM ESTOQUE", type: "number", sufixo: ["peça", "peças"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 6. AUTOPEÇAS & AUTO CENTER
    // ==========================================
    auto_pecas: {
        label: "Autopeças & Auto Center",
        icon: "🚗",
        dicionario: {
            "Mecânica de Motor": [
                "Correia Dentada Comando", "Jogo de Velas de Ignição 4Un", "Filtro de Óleo Blindado", 
                "Filtro de Ar do Motor", "Bomba de Água Vedada", "Aditivo p/ Radiador Concentrado"
            ],
            "Freios & Suspensão": [
                "Jogo de Pastilhas Freio Dianteiro", "Par de Discos de Freio Ventilados", 
                "Amortecedor Dianteiro Pressurizado", "Bucha da Barra Estabilizadora", "Terminal de Direção"
            ],
            "Elétrica & Iluminação": [
                "Bateria Automotiva 60Ah Selada", "Lâmpada Halógena H4 Farol", 
                "Fusível Lâmina Jogo Variado", "Motor de Partida Arranque"
            ],
            "Acabamento & Limpeza": [
                "Palheta do Limpador de Para-brisa Par", "Cera Automotiva Cristalizadora", 
                "Aditivo Limpa Para-brisa Líquido"
            ]
        },
        columns: [
            { campo: "nome", label: "PEÇA / COMPONENTE", type: "select_assistido" },
            { campo: "marca", label: "MARCA / FABRICANTE", type: "text" },
            { campo: "sku_codigo", label: "Nº DA PEÇA / SKU", type: "text" },
            { campo: "quantidade", label: "PEÇAS EM ESTOQUE", type: "number", sufixo: ["peça", "peças"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 7. CASA DE TEMPEROS & GRANEL
    // ==========================================
    temperos: {
        label: "Casa de Temperos & Granel",
        icon: "🌶️",
        dicionario: {
            "Temperos Puros": [
                "Páprica Defumada Doce", "Cúrcuma Pura (Açafrão da Terra)", "Cominho em Pó Puro", 
                "Pimenta do Reino Preta Moída", "Alho em Flocos Desidratado", "Cebola em Pó Confeiteiro"
            ],
            "Blends & Misturas": [
                "Tempero Edu Guedes Premium", "Tempero Ana Maria Tradicional", 
                "Chimichurri com Pimenta Flocos", "Lemon Pepper Cítrico", "Tempero Baiano Completo"
            ],
            "Chás & Ervas": [
                "Camomila Flores Secas", "Capim Cidreira Desidratado", 
                "Hibisco Flores Inteiras", "Chá Verde Folhas Selecionadas", "Hortelã Desidratada Erva"
            ],
            "Grãos & Farináceos": [
                "Castanha de Caju W1 Torrada", "Chia em Grãos Integral", 
                "Linhaça Dourada Grão", "Farinha de Amêndoas Fina"
            ]
        },
        columns: [
            { campo: "nome", label: "TEMPERO / ESPECIARIA", type: "select_assistido" },
            { campo: "tipo_armazenamento", label: "ARMAZENAMENTO", type: "select", options: ["Pote Expositor", "Saco de Estoque", "Gaveteiro"] },
            { campo: "unidade", label: "UNIDADE DE VENDA", type: "select", options: ["Grama (g)", "Quilograma (KG)", "Unidade (UN)"] },
            { campo: "quantidade", label: "QTD. EM ESTOQUE", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO POR KG/UN (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 8. SALÃO, ESTÉTICA & COSMÉTICOS
    // ==========================================
    beleza_cosmeticos: {
        label: "Salão, Estética & Cosméticos",
        icon: "💄",
        dicionario: {
            "Cabelo Profissional": [
                "Shampoo Antirresíduos Galão 5L", "Máscara de Reconstrução Nutritiva 1KG", 
                "Pó Descolorante Ultra Clareador 500g", "Água Oxigenada Cremosa 30 Vol", "Defrizante Protetor Térmico Fluid"
            ],
            "Manicure & Pedicure": [
                "Esmalte Cremoso Cores Variadas", "Base Fortalecedora de Cravinho", 
                "Removedor de Esmalte Sem Acetona", "Amolecedor de Cutículas Creme"
            ],
            "Estética & Maquiagem": [
                "Base Fluida Efeito Matte", "Corretivo Líquido Alta Cobertura", 
                "Cera Hidrossolúvel p/ Depilação 1KG", "Água Micelar Purificante 400ml"
            ]
        },
        columns: [
            { campo: "nome", label: "PRODUTO / INSUMO", type: "select_assistido" },
            { campo: "marca", label: "MARCA / FABRICANTE", type: "text" },
            { campo: "quantidade", label: "QTD. EM ESTOQUE", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE CUSTO (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 9. FARMÁCIA & DROGARIA
    // ==========================================
    farmacia_drogaria: {
        label: "Farmácia & Drogaria",
        icon: "💊",
        dicionario: {
            "Medicamentos Livres (MIP)": [
                "Paracetamol Comprimidos 500mg", "Dipirona Monoidratada Gotas 20ml", 
                "Ibuprofeno Cápsulas Gel 400mg", "Cloridrato de Ambroxol Xarope"
            ],
            "Controlados & Tarjados": [
                "Amoxicilina Tri-hidratada 500mg", "Clonazepam Comprimidos 2mg", 
                "Cloridrato de Sertralina 500mg", "Losartana Potássica Comprimidos 50mg"
            ],
            "Higiene & Perfumaria": [
                "Fralda Descartável Confort G", "Protetor Solar Facial FPS 60", 
                "Shampoo Antiqueda Nutritivo", "Sabonete Líquido Glicerinado"
            ]
        },
        columns: [
            { campo: "nome", label: "MEDICAMENTO / PRODUTO", type: "select_assistido" },
            { campo: "laboratorio", label: "LABORATÓRIO", type: "text" },
            { campo: "tipo_retencao", label: "RETENÇÃO DE RECEITA", type: "select", options: ["Não Exige", "Receita Simples (Branca)", "Controlado (Azul/Preta)"] },
            { campo: "quantidade", label: "CAIXAS EM ESTOQUE", type: "number", sufixo: ["caixa", "caixas"] },
            { campo: "preco", label: "PREÇO MAX. CONSUMIDOR (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 10. PET SHOP & AGROPECUÁRIA
    // ==========================================
    pet_shop: {
        label: "Pet Shop & Agropecuária",
        icon: "🐾",
        dicionario: {
            "Alimentação Animal": [
                "Ração Cães Adultos Premium 15KG", "Ração Gatos Castrados Salmão 10KG", 
                "Sachê Carne ao Molho Cães 100g", "Mistura de Sementes p/ Pássaros 1KG"
            ],
            "Higiene & Cuidados": [
                "Areia Sanitária Gatos Fina 4KG", "Shampoo Neutro Antipulgas Pet 500ml", 
                "Tapete Higiênico Cães C/30Un", "Educador Sanitário Sim/Não Spray"
            ],
            "Medicamentos Veterinários": [
                "Antipulgas e Carrapatos Mastigável", "Vermífugo de Amplo Espectro Cães", 
                "Suplemento Vitamínico Gotas Pet"
            ]
        },
        columns: [
            { campo: "nome", label: "PRODUTO / RAÇÃO", type: "select_assistido" },
            { campo: "animal", label: "CATEGORIA ANIMAL", type: "select", options: ["Cães", "Gatos", "Pássaros", "Roedores", "Geral"] },
            { campo: "quantidade", label: "UNIDADES EM ESTOQUE", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 11. MATERIAIS DE CONSTRUÇÃO & ELÉTRICA
    // ==========================================
    materiais_construcao: {
        label: "Materiais de Construção & Elétrica",
        icon: "🧱",
        dicionario: {
            "Alvenaria & Brutos": [
                "Cimento CP-II Saco 50KG", "Argamassa AC-I Interna 20KG", 
                "Cal Hidratada p/ Pintura 20KG", "Gesso em Pó Rápido 1KG"
            ],
            "Elétrica & Iluminação": [
                "Fio Cabo Flexível 2,5mm Rolo 100M", "Disjuntor Monopolar DIN 20A", 
                "Fita Isolante Antichama Rolo 20M", "Lâmpada LED Bulbo E27 9W"
            ],
            "Hidráulica & Conexões": [
                "Tubo PVC Marrom Soldável 25mm 6M", "Joelho 90 Graus PVC Marrom 25mm", 
                "Fita Veda Rosca Prática Rolo 10M", "Caixa de Descarga Externa Plástica"
            ],
            "Ferramentas & Fixação": [
                "Prego com Cabeça Zincado Jogo", "Parafuso Philips Multiuso Caixa", 
                "Martelo de Unha Polido Cabo Fibra", "Trena Métrica Emborrachada 5M"
            ]
        },
        columns: [
            { campo: "nome", label: "MATERIAL / ITEM", type: "select_assistido" },
            { campo: "setor", label: "DEPARTAMENTO", type: "select", options: ["Elétrica", "Hidráulica", "Ferramentas", "Pintura", "Alvenaria"] },
            { campo: "quantidade", label: "QTD. DISPONÍVEL", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 12. ASSISTÊNCIA / E-COMMERCE DE TECH
    // ==========================================
    tecnologia: {
        label: "Assistência / E-commerce de Tech",
        icon: "💻",
        dicionario: {
            "Hardwares & Peças": [
                "SSD Sata III 480GB Interno", "Memória RAM DDR4 8GB p/ Desktop", 
                "Placa de Vídeo Dedicada Conect", "Fonte de Alimentação ATX 500W Selo"
            ],
            "Periféricos & Cabos": [
                "Mouse Óptico USB Ergonômico", "Teclado Multimídia Membrana", 
                "Fone de Ouvido Headset Gamer C/ Led", "Cabo HDMI 2.0 Blindado 2M"
            ],
            "Acessórios Mobiles": [
                "Carregador de Parede Turbo USB-C", "Cabo de Dados Reforçado Lightning", 
                "Película de Vidro 3D Smartphone"
            ]
        },
        columns: [
            { campo: "nome", label: "EQUIPAMENTO / ITEM", type: "select_assistido" }, 
            { campo: "marca_modelo", label: "MARCA / MODELO", type: "text" },
            { campo: "quantidade", label: "QTD. DISPONÍVEL", type: "number", sufixo: ["item", "itens"] }, 
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" } 
        ]
    },

    // ==========================================
    // 13. PAPELARIA, LIVRARIA & BRINQUEDOS
    // ==========================================
    papelaria_brinquedos: {
        label: "Papelaria, Livraria & Brinquedos",
        icon: "📚",
        dicionario: {
            "Material Escolar": [
                "Caderno Universitário Capa Dura 10 Mat", "Caneta Esferográfica Azul Caixa C/50", 
                "Lápis de Cor Sextavado 12 Cores", "Borracha Branca Escolar C/ Capa"
            ],
            "Escritório & Organização": [
                "Resma de Papel Sulfite A4 500Fl", "Pasta Suspensa Cartonada Haste Metal", 
                "Grampeador de Mesa de Aço Médio"
            ],
            "Brinquedos & Jogos": [
                "Massa de Modelar Colorida Macia", "Jogo de Tabuleiro Clássico Estratégia", 
                "Quebra-Cabeça Educativo 100 Peças"
            ]
        },
        columns: [
            { campo: "nome", label: "PRODUTO / ITEM", type: "select_assistido" },
            { campo: "quantidade", label: "UNIDADES EM ESTOQUE", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 14. LOJAS DE CALÇADOS
    // ==========================================
    calcados: {
        label: "Loja de Calçados",
        icon: "👟",
        dicionario: {
            "Esportivo & Casual": [
                "Tênis de Corrida Amortecedor", "Tênis Casual Casual Urbano Flat", 
                "Sapatênis Slip On Couro", "Chuteira de Futsal Trava Emborrachada"
            ],
            "Feminino & Saltos": [
                "Sandália Anabela Salto Corda", "Sapatilha Bico Fino Confort", 
                "Scarpin Clássico Salto Alto Salto"
            ],
            "Chinelos & Conforto": [
                "Chinelo de Borracha Tradicional Flat", "Sandália Papete Regulável Alça", 
                "Pantufa de Inverno Forrada Pelúcia"
            ]
        },
        columns: [
            { campo: "nome", label: "MODELO / CALÇADO", type: "select_assistido" },
            { campo: "numeracao", label: "NÚMERO", type: "select", options: ["33-34", "35", "36", "37", "38", "39", "40", "41", "42", "43-44"] },
            { campo: "quantidade", label: "PARES EM ESTOQUE", type: "number", sufixo: ["par", "pares"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 15. JOIAS, SEMIJOIAS & BIJUTERIAS
    // ==========================================
    joalheria_semijoias: {
        label: "Joias, Semijoias & Bijuterias",
        icon: "💎",
        dicionario: {
            "Anéis & Alianças": [
                "Anel Solitário Cravejado Cristal", "Aliança Anatômica Abaulada Espelhada", 
                "Anel Regulável Design Geométrico"
            ],
            "Correntes & Colares": [
                "Colar Gargantilha Veneziana Fina", "Corrente Elo Grumet Grossa Cordão", 
                "Choker de Miçangas Coloridas Verão"
            ],
            "Brincos & Argolas": [
                "Brinco de Ponto de Luz Zircônia", "Par de Argolas Lisas Médias", 
                "Brinco Leve Pendente Geométrico"
            ]
        },
        columns: [
            { campo: "nome", label: "PEÇA / ACESSÓRIO", type: "select_assistido" },
            { campo: "material", label: "MATERIAL / BANHO", type: "select", options: ["Ouro 18k", "Prata 925", "Banhado a Ouro", "Bijuteria / Aço"] },
            { campo: "quantidade", label: "PEÇAS EM ESTOQUE", type: "number", sufixo: ["peça", "peças"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 16. LOJA DE SUPLEMENTOS & VIDA SAUDÁVEL
    // ==========================================
    suplementos_naturais: {
        label: "Loja de Suplementos & Vida Saudável",
        icon: "💪",
        dicionario: {
            "Proteínas & Fibras": [
                "Whey Protein Concentrado 900g Pote", "Isolado de Proteína de Soja 1KG", 
                "Hipercalórico Massa Absoluta Pote 3KG"
            ],
            "Aminoácidos & Força": [
                "Creatina Monohidratada Pura Micronizada Pote", "BCAA 2:1:1 Cápsulas Pote C/120", 
                "Glutamina Isolada Pura Pote 300g"
            ],
            "Vitaminas & Encapsulados": [
                "Multivitamínico AZ Minerais Pote", "Ômega 3 Óleo de Peixe Pote C/120", 
                "Cápsulas de Cafeína Anidra Termogênico"
            ]
        },
        columns: [
            { campo: "nome", label: "PRODUTO / SUPLEMENTO", type: "select_assistido" },
            { campo: "marca", label: "MARCA / LABORATÓRIO", type: "text" },
            { campo: "quantidade", label: "POTES EM ESTOQUE", type: "number", sufixo: ["pote", "potes"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 17. ADEGA & DISTRIBUIDORA DE BEBIDAS
    // ==========================================
    adegas_bebidas: {
        label: "Adega & Distribuidora de Bebidas",
        icon: "🍺",
        dicionario: {
            "Cervejas & Engradados": [
                "Cerveja Pilsen Lata 350ml Caixa C/12", "Cerveja Puro Malte Latão 473ml", 
                "Cerveja Long Neck Premium Unidade"
            ],
            "Destilados Finos": [
                "Whisky Escocês Tradicional Garrafa 1L", "Vodka Premium Destilada Garrafa 1L", 
                "Gin Importado Garrafa Botânicos 750ml", "Cachaça Envelhecida Ouro Garrafa 900ml"
            ],
            "Não Alcoólicos & Gelo": [
                "Refrigerante Cola Garrafa Retornável 2L", "Saco de Gelo Cubo Filtrado 5KG", 
                "Energético Tradicional Lata 473ml"
            ]
        },
        columns: [
            { campo: "nome", label: "BEBIDA / ITEM", type: "select_assistido" },
            { campo: "quantidade", label: "GARRAFAS / UNID.", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE BALCÃO (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 18. ARTIGOS ESPORTIVOS & FITNESS
    // ==========================================
    artigos_esportivos: {
        label: "Artigos Esportivos & Fitness",
        icon: "⚽",
        dicionario: {
            "Acessórios de Treino": [
                "Corda de Pular Ajustável Rolamento", "Par de Halteres Emborrachados 5KG", 
                "Tapete Mat p/ Yoga Pilates EVA", "Kit Elastic Bands Mini Loops Extensores"
            ],
            "Bolas & Quadra": [
                "Bola de Futebol Campo Oficial Couro", "Bola de Basquete Texturizada Ofic", 
                "Rede de Tênis de Mesa Jogo C/ Suporte"
            ],
            "Equipamentos de Proteção": [
                "Luva de Boxe Cano Curto Poliuretano", "Par de Caneleiras com Protetor de Pé", 
                "Faixa Elástica p/ Joelho Par Bandagem"
            ]
        },
        columns: [
            { campo: "nome", label: "ARTIGO / EQUIPAMENTO", type: "select_assistido" },
            { campo: "quantidade", label: "UNIDADES EM ESTOQUE", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE VENDA (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 19. GRÁFICA RÁPIDA & ESTAMPARIA
    // ==========================================
    grafica_estamparia: {
        label: "Gráfica Rápida & Estamparia",
        icon: "🖨️",
        dicionario: {
            "Insumos de Sublimação": [
                "Caneca de Cerâmica Branca Resinada Un", "Camiseta 100% Poliéster Branca Lisa", 
                "Mouse Pad Base Emborrachada Sublimação"
            ],
            "Papéis & Mídias": [
                "Papel Fotográfico Brilhante A4 180g", "Papel Sublimático Fundo Azul 100Fl", 
                "Rolo de Vinil Adesivo Transparente 10M"
            ],
            "Tintas & Encadernação": [
                "Tinta Sublimática Preta Tubo 100ml", "Espiral de Plástico Preto Encadernação", 
                "Capa de Polipropileno Texturizada A4"
            ]
        },
        columns: [
            { campo: "nome", label: "INSUMO / PRODUTO BASE", type: "select_assistido" },
            { campo: "quantidade", label: "MILHEIROS / UNID.", type: "number", sufixo: ["unidade", "unidades"] },
            { campo: "preco", label: "PREÇO DE CUSTO (R$)", type: "currency" }
        ]
    },

    // ==========================================
    // 20. VARIANT PREMIUM: OUTRO / PERSONALIZADO
    // ==========================================
    customizado: {
        label: "Outro / Configuração Manual",
        icon: "🛠️",
        dicionario: {
            "Geral": [
                "Produto Padrão A",
                "Produto Padrão B",
                "Produto Padrão C"
            ]
        },
        columns: [
            { campo: "nome", label: "NOME DO ITEM", type: "text" }, // Mantém texto livre se for totalmente personalizado
            { campo: "quantidade", label: "QUANTIDADE INICIAL", type: "number", sufixo: ["item", "itens"] },
            { campo: "preco", label: "VALOR UNITÁRIO (R$)", type: "currency" }
        ]
    }
};