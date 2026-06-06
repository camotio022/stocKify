import { Stack } from "@mui/material";
import { Root } from "../styles/Root/root_styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/node/styles";


export const MuiMainLayout = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#07040d', // Fundo escuro base do Stockify
    // Halo Neon Roxo (Superior Esquerdo)
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(144, 0, 255, 0.12) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        filter: 'blur(80px)',
    },

    // Halo Neon Ciano (Inferior Direito)
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23, 162, 184, 0.1) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        filter: 'blur(90px)',
    },

}))
// LATERAL ESQUERDO LAYOUT
export const MuiMainLayoutLogo = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column', // Força a divisão vertical limpa entre links superiores e configurações inferiores
    alignItems: 'stretch',   // 🔥 MUDANÇA CHAVE: Faz os filhos ocuparem 100% da largura interna sem esmagar
    justifyContent: 'space-between',
    width: '240px',          // 🔥 DESIGN SÊNIOR: Fixar em px (ex: 240px) é melhor que 14vw para travar o horizonte da tabela
    height: '100%',         // Ocupa a altura inteira da tela
    padding: '24px 16px',    // Espaçamento interno para os cards flutuarem com respiro
    boxSizing: 'border-box',

    // 🌌 O TOQUE GLASSMORPHIC DO STOCKIFY

    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.03)', // Linha divisória cirúrgica e quase invisível
}));

// 🎛&zwj; 2. O BLOCO DE LINKS SUPERIORES (Dashboard, Estoque...)
export const MuiMainLayoutLinks = styled(Stack)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',   // 🔥 Removido o 'center', agora os links se alinham perfeitamente à esquerda
    width: '100%',
    gap: '6px',              // Espaço sutil entre um link e outro
}));

// ⚡ 3. O LINK INDIVIDUAL REATIVO (MuiMainLayoutLink)
export const MuiMainLayoutLink = styled(Link)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '12px',             // Espaço perfeito entre o ícone e o texto
    flexDirection: 'row',
    width: '100%',           // 🔥 Ocupa o bloco inteiro do pai, eliminando o visual encolhido de 85%
    height: '40px',          // Altura ideal e confortável para clique de interface SaaS
    borderRadius: '10px',    // Cantos arredondados no padrão dos novos modais do Stockify
    paddingLeft: '16px',
    paddingRight: '16px',
    boxSizing: 'border-box',
    fontSize: '14px',        // 14px com peso 600 dá uma leitura muito mais "clean" e moderna que 16px
    fontFamily: Root.fontFamilySansSerif,
    fontWeight: 600,
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: Root.white,
    textDecoration: 'none',
    ":hover": {
        color: Root.containTask, // Roxo do logo
        backgroundColor: Root.color_button, // Roxo quase invisível em vez de cinza sólido
        boxShadow: 'inset 4px 0px 0px ' + Root.color_button, // Barra lateral de destaque interna
    },
}));

// ⚙️ 4. O BLOCO INFERIOR DE CONFIGURAÇÕES DO USUÁRIO
export const MuiMainLayoutSettingsUser = styled(Stack)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',           // Alinhado ao padrão de 100% dos links superiores
    gap: '4px',
    paddingTop: '20px', // Dá o respiro necessário para a linha não colar nos botões
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%', // Ocupa a largura toda da Sidebar
        height: '1px', // A espessura da sua borda suave
        // 🌌 O SEU GRADIENTE DE ELITE: Roxo para Ciano com baixa opacidade para não quebrar o Glassmorphism
        background: `linear-gradient(90deg, rgba(144, 0, 255, 0.3) 0%, rgba(23, 162, 184, 0.3) 100%)`,
    },
    transition: 'all 0.3s ease',
}));
export const AppBar = styled(Stack)(({ }) => ({
    position: 'absolute',
    top: '1vh',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100vw',
    height: '11vh',
}))

// LATERAL DIREIDO
export const MuiMainLayoutRitghStep = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100vw',

    /* 📐 MATEMÁTICA DO LAYOUT: 
       12vh (topo) + 87vh (altura útil) + 1vh (respiro baixo) = 100vh cravados! */
    height: '87vh',
    marginTop: '12vh',

    /* 🟢 O RESPIRO QUE VOCÊ PEDIU: 1vh de folga na parte inferior */
    paddingBottom: '1vh',

    paddingInline: '18px',
    overflow: 'hidden',
    boxSizing: 'border-box',
}));

export const RenderChildrensAndNavBar = styled(Stack)(({ }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: '12px',
    padding: '13px',
    width: '83.3vw',

    /* Mantém 100% para respeitar o limite novo do pai com o respiro */
    height: '100%',
    borderRadius: '8px',
    boxSizing: 'border-box',
    ...Root.borderImage,
}));