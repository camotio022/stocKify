import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LayoutMobile = {
    _app_bar: styled(Box)(() => ({
        position: 'fixed', display: "flex", alignItems: "center", justifyContent: 'space-around',
        flexDirection: 'row', width: '100%', height: '68px', bottom: 0, left: 0, zIndex: 100,
        background: 'rgba(10, 8, 24, 0.96)', backdropFilter: 'blur(30px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px', boxSizing: 'border-box'
    })),

 _app_bar_top: styled(Box)(() => ({
    position: 'fixed', 
    display: "flex", 
    alignItems: "center", 
    justifyContent: 'space-between',
    flexDirection: 'row', 
    width: '100%', 
    height: '80px', 
    top: 0, 
    left: 0, 
    zIndex: 90,
    background: 'rgba(4, 2, 13, 0.9)', 
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)', 
    paddingInline: '16px', 
    boxSizing: 'border-box',

    // 🔥 ANIMAÇÃO DA BOLINHA EM TEMPO REAL (GLOW & PULSE)
    '& .pulse-dot': {
        position: 'relative',
        boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
        animation: 'realtimePulse 1.6s infinite cubic-bezier(0.66, 0, 0, 1)',
    },

    '@keyframes realtimePulse': {
        '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
        },
        '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 6px rgba(16, 185, 129, 0)',
        },
        '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
        },
    }
})),

    // CARDS DE MINI RESUMO (GRID DE 4 COLUNAS)
    _summaryCardCard: styled(Stack)(() => ({
        backgroundColor: 'rgba(209, 190, 190, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: '12px', padding: '10px 6px', alignItems: 'flex-start', boxSizing: 'border-box',
        '&.warning': { backgroundColor: 'rgba(249, 116, 22, 0.12)', borderColor: 'rgba(249, 115, 22, 0.15)' },
        '& .badge': {
            width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px'
        },
        '& .badge.blue': { backgroundColor: 'rgba(37, 99, 235, 0.15)' },
        '& .badge.purple': { backgroundColor: 'rgba(124, 58, 237, 0.15)' },
        '& .badge.green': { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
        '& .badge.orange': { backgroundColor: 'rgba(249, 115, 22, 0.15)' },
        '& .title': { fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden' },
        '& .text-orange': { color: '#F97316' },
        '& .value': { fontSize: '14px', fontWeight: '800', color: '#fff', margin: '2px 0' },
        '& .value.text-green': { color: '#10B981' },
        '& .value.text-orange': { color: '#F97316' },
        '& .sub': { fontSize: '8px', color: 'rgba(255, 255, 255, 0.25)', whiteSpace: 'nowrap' }
    })),

    // CARDS DE AÇÕES RÁPIDAS SLIDER
    _actionCard: styled(Stack)(() => ({
        minWidth: '78px', height: '84px',backgroundColor: 'rgba(209, 190, 190, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px',
        alignItems: 'center', justifyContent: 'center', padding: '8px', boxSizing: 'border-box', gap: '8px',
        '& .icon-box': { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        '& .text': { fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '500', textAlign: 'center', lineHeight: '1.2' }
    })),

    // MENU FLUTUANTE SUSPENSO DO FAB (EXIBIDO NA IMAGEM)
    _fabMenuWrapper: styled(Stack)(() => ({
        position: 'fixed', bottom: '146px', right: '16px', zIndex: 98, gap: '10px', alignItems: 'flex-end',
        '& .menu-item-row': { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' },
        '& .menu-text': { backgroundColor: 'rgba(15, 12, 30, 0.8)', color: 'rgba(255,255,255,0.8)', fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' },
        '& .menu-icon-circle': { width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }
    })),

    _fabButton: styled(Box)(() => ({
        position: 'fixed', bottom: '84px', right: '16px', width: '48px', height: '48px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #701A8A 0%, #17A2B8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(23, 162, 184, 0.3)', cursor: 'pointer', zIndex: 99
    }))
};