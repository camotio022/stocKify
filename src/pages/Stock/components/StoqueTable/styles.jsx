import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
import { BorderRight } from "@mui/icons-material";
import { styled } from "@mui/material/node/styles";

export const MuiHeaderTable = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '42px',
    backgroundColor: Root.columnTable, // Fundo escuro semitransparente
    backdropFilter: 'blur(12px)', // Faz o degradê de trás aparecer fosco
}))
export const MuiRowTable = styled(Stack)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
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
    color: Root.white, // ✨ Mudar o texto base para Branco Puro garante leitura 100% nítida no escuro
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#17a2b8', // O texto assume o ciano puro no foco
        textShadow: '0 0 8px rgba(23, 162, 184, 0.8)',
    },
}))
export const MuiTableRow = styled(Box)(({ index }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40px',
    gap: '1px',
    '&:hover': {

        transition: 'all .3s',
        color: Root.color_default,
    },
    boxSizing: 'border-box'
}))
export const MuiTableRowCell = styled(Typography)(({ }) => ({
    display: 'block',              // 🔥 CORREÇÃO: 'flex' quebra o ellipsis, 'block' força o funcionamento
    whiteSpace: 'nowrap',          // Impede o texto de quebrar para a linha de baixo
    overflow: 'hidden',            // Corta o que passar do limite da largura
    textOverflow: 'ellipsis',      // 🎯 Garante os "..." no final do texto cortado
    
    width: '100%',
    height: '34px',
    lineHeight: '34px',            // 🔥 Alinha o texto perfeitamente no centro vertical (substitui o center do flex)
    boxSizing: 'border-box',
    padding: '0px 16px',           // Ajustado para o padding não somar na altura do bloco com lineHeight
    
    fontFamily: Root.fontFamilySansSerif,
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(12px)',
    color: Root.text,
    
    '&:hover': {
        color: '#ffffff',
        textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
        transform: 'translateX(2px)',
    }
}));