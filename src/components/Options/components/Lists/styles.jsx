import { MenuItem, Stack } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";
import { styled } from "@mui/material/styles";

export const StylesLists = {
    // 🌌 CONTAINER DO CARROSSEL DE LISTAS
    contain: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',

        // 🎯 O SEGREDO: Troque height por maxHeight e defina um limite menor se quiser o modal mais compacto
        maxHeight: '180px',

        height: 'auto', // 🔥 Faz o container herdar a altura real do conteúdo interno
        marginBottom: '8px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: '4px',
        ...Root.scrollBar
    })),

    // 📋 CABEÇALHO DA TABELA INTERNA (NOME / TIPO DE LISTA)
    headerInfos: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingBlock: '8px',
        paddingInline: '16px',
        borderRadius: '6px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Vidro fumê escuro
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontWeight: '700',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.5)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxSizing: 'border-box'
    })),

    headerInfosItem: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center'
    })),

    // 🗂️ LINHAS DAS LISTAS (MUI MENUITEM REFATORADO)
    menuItem: styled(MenuItem)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: '10px 16px',
        borderRadius: '6px',
        marginBlock: '4px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.85)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.02)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            color: '#FFF',
            transform: 'translateX(2px)'
        }
    })),

    // ➕ BOTÃO PREMIUM DE CRIAR NOVA LISTA
    button: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '8px',
        width: '100%',
        height: '38px',
        borderRadius: '8px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '0.85rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',

        marginTop: '8px',
    })),

    listContain: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    })),

    // 🏷️ COMPONENTES DE CRIAÇÃO/DESCRIÇÃO DE NOVAS LISTAS
    tagDescription: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: '12px',
        boxSizing: 'border-box',
        borderRadius: '8px',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.6)'
    })),

    tagDescriptionInput: styled('input')(({ }) => ({
        outline: 'none',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '6px',
        marginTop: '8px',
        width: '100%',
        height: '36px',
        paddingInline: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: '#FFF',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '14px',
        boxSizing: 'border-box',
        transition: 'all 0.2s',
        '&:focus': {
            borderColor: Root.cyan
        }
    })),

    tagDescriptionButton: styled(MenuItem)(({ }) => ({
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '36px',
        borderRadius: '6px',
        fontFamily: Root.fontFamilySansSerif,
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#FFF',
        transition: 'all 0.2s'
    }))
};