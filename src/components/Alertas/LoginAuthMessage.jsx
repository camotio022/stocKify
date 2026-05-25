import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
export const LoginAuthMessage = ({
    open,
    onClose,
    title = "Atenção",
    message,
    severity = "error",
    glowColor = "#D946EF",
    accentColor = "#A855F7" }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(20, 15, 35, 0.85)', // Fundo escuro futurista com transparência
                    backdropFilter: 'blur(16px)', // Efeito Glassmorphism (vidro fosco)
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    borderRadius: '20px',
                    boxShadow: `0 0 30px 2px ${glowColor}40`, // O efeito Glow minimalista nas bordas
                    padding: '12px',
                    overflow: 'visible'
                }
            }}
        >
            {/* Botão de Fechar Superior (Minimalista) */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'rgba(255, 255, 255, 0.4)',
                    '&:hover': { color: '#FFF' }
                }}
            >
                <CloseRoundedIcon fontSize="small" />
            </IconButton>

            {/* Conteúdo Principal / Cabeçalho */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 1 }}>
                {/* Ícone Futurista Iluminado */}
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${glowColor} 0%, ${accentColor} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px ${glowColor}80`,
                        mb: 2
                    }}
                >
                    <ErrorOutlineRoundedIcon sx={{ color: '#FFF', fontSize: '2rem' }} />
                </Box>

                {/* Título em Caixa Alta e Moderno */}
                <DialogTitle
                    sx={{
                        color: '#FFF',
                        fontFamily: '"Inter", "Roboto", sans-serif',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        p: 0,
                        mb: 1
                    }}
                >
                    {title}
                </DialogTitle>
            </Box>

            {/* Corpo do Texto */}
            <DialogContent sx={{ pb: 2 }}>
                <DialogContentText
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        lineHeight: 1.6
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>

            {/* Ações / Botão de Confirmar */}
            <DialogActions sx={{ justifyContent: 'center', pb: 2, px: 3 }}>
                <Button
                    onClick={onClose}
                    fullWidth
                    variant="contained"
                    sx={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${glowColor} 100%)`,
                        color: '#FFF',
                        fontWeight: 700,
                        fontFamily: '"Inter", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        borderRadius: '12px',
                        padding: '10px 0',
                        boxShadow: `0 4px 15px ${glowColor}40`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: `0 0 25px ${glowColor}`,
                            filter: 'brightness(1.1)',
                        }
                    }}
                >
                    OK, Entendido
                </Button>
            </DialogActions>
        </Dialog>
    )
}