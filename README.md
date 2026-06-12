# 📦 Stockify

> Sistema inteligente de gestão de inventário e controle de validade.

O **Stockify** foi desenvolvido para resolver o problema de monitoramento de itens perecíveis e doações, oferecendo uma interface intuitiva e futurista para controle de estoque em tempo real.

## 🚀 Demonstração
Acesse o projeto online: [stoc-kify.vercel.app](https://stoc-kify.vercel.app)

## ✨ Funcionalidades
* **Dashboard Consolidado**: Visão geral de produtos, doadores e categorias.
* **Inteligência de Validade**: Alertas automáticos baseados na data de vencimento.
* **Rastreabilidade**: Cálculo de "tempo de prateleira" (ex: 616 dias em estoque).
* **Interface Dinâmica**: Modais para retirada de itens, geração de listas e escaneamento de QR Code.

## 🛠️ Tecnologias
* **Frontend**: React.js com Vite
* **Estilização**: Tailwind CSS / Custom CSS (Glassmorphism)
* **Deploy**: Vercel (CI/CD automático)

## 🔧 Como Rodar Localmente
1. Clone o repositório: `git clone https://github.com/seu-usuario/stoc-kify`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev`

---
Desenvolvido por **Temotio Luis** 🚀
[
  { "campo": "nome", "label": "Nome do Alimento", "type": "text", "required": true },
  { "campo": "quantidade", "label": "Quantidade", "type": "number", "required": true },
  { "campo": "preco", "label": "Preço de Custo", "type": "number", "required": false },
  { "campo": "dataValidade", "label": "Data de Validade", "type": "date", "required": true },
  { "campo": "unidade", "label": "Unidade de Medida", "type": "select", "options": ["KG", "Litro", "Unidade", "Pacote"], "required": true }
]