import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
import { BorderRight } from "@mui/icons-material";
import { styled } from "@mui/material/node/styles";

export const MuiHeaderTable = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '42px',
    gap: '12px',
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Fundo escuro semitransparente
    backdropFilter: 'blur(12px)', // Faz o degradê de trás aparecer fosco
}))
export const MuiRowTable = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    scrollbarGutter: 'stable',
}))
export const MuiTableClhild = styled(Typography)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '11px', // 💡 Diminuir 1px deixa o cabeçalho mais delicado e corporativo
    fontWeight: 800,  // Peso ideal para fontes pequenas não borrarem com o brilho
    letterSpacing: '0.06em', // 🔥 Aumentar o espaçamento melhora a leitura de textos em caixa alta
    textTransform: 'uppercase',

    // 🎨 CORES E BRILHO DE ALTO CONTRASTE
    color: Root.white, // ✨ Mudar o texto base para Branco Puro garante leitura 100% nítida no escuro
    textShadow: `
        0 0 4px rgba(23, 162, 184, 0.6), 
        0 0 12px rgba(23, 162, 184, 0.3)
    `,

    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#17a2b8', // O texto assume o ciano puro no foco
        textShadow: '0 0 8px rgba(23, 162, 184, 0.8)',
    }
}))
export const MuiTableRow = styled(Box)(({ index }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40px',
    gap: '2px',
    backgroundColor: index % 2 === 1 && Root.tableBg,
    '&:hover': {
        backgroundColor: Root.color_button_secondary,
        transition: 'all .3s',
        boxShadow: Root.boxS,
        color: Root.color_default,
    },
    boxSizing: 'border-box'
}))
export const MuiTableRowCell = styled(Typography)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',
    width: '100%',
    height: '34px',
    boxSizing: 'border-box',
    padding: '10px 16px',
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Fundo escuro semitransparente
    backdropFilter: 'blur(12px)', // Faz o degradê de trás aparecer fosco
    color: Root.text, // 🔥 O Branco Gelo que dá o contraste perfeito sobre o vidro escuro
    whiteSpace: 'nowrap',     // Impede o texto de quebrar para a linha de baixo
    overflow: 'hidden',       // Corta o que passar do limite da largura
    textOverflow: 'ellipsis',
    '&:hover': {
        color: '#ffffff', // Clarea para branco puro
        textShadow: '0 0 8px rgba(255, 255, 255, 0.5)', // Brilho sutil de tela de luxo
        transform: 'translateX(2px)', // Micro movimento para a direita dando feedback de foco
    }
}))