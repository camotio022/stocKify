import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Root } from '../../styles/Root/root_styles';
import { TagsNewItem } from '../../pages/NewItem/styles';
import { Close } from '@mui/icons-material';

export const LogoutConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    tenantData
}) => {
    // Puxa as cores do tema do inquilino ou mantém o padrão futurista de login
    const glowColor = tenantData?.theme?.buttons?.primary || "#D946EF";
    const accentColor = tenantData?.theme?.buttons?.secondary || "#9333EA";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(20, 15, 35, 0.9)', // Fundo escuro profundo
                    backdropFilter: 'blur(20px)', // Desfoque de vidro intenso
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    borderRadius: '8px',
                    boxShadow: `0 0 40px 5px ${glowColor}30`, // Efeito Neon Glow suave
                    padding: '16px',
                    overflow: 'visible'
                }
            }}
        >
            <TagsNewItem.close
                sx={{
                    border: 'none',
                    background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                }} onClick={onClose}>
                <Close />
            </TagsNewItem.close>

            {/* Cabeçalho com Ícone de Saída */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 2 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '8px',
                        background: `linear-gradient(90deg, ${Root.color_button}, ${Root.cyan})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 10px 25px ${glowColor}60`,
                        mb: 3,
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <ExitToAppRoundedIcon sx={{ color: '#FFF', fontSize: '2.2rem' }} />
                </Box>

                <DialogTitle
                    sx={{
                        color: '#FFF',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 800,
                        fontSize: '1.4rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        p: 0,
                        mb: 1
                    }}
                >
                    Deseja Sair?
                </DialogTitle>
            </Box>

            {/* Conteúdo */}
            <DialogContent>
                <DialogContentText
                    sx={{
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '1rem',
                        textAlign: 'center',
                        lineHeight: 1.6
                    }}
                >
                    Você está prestes a encerrar sua sessão no <strong>Stockify</strong>. Suas alterações salvas estão seguras.
                </DialogContentText>
            </DialogContent>

            {/* Ações (Botões Lado a Lado) */}
            <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3, px: 3, mt: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 600,
                        fontFamily: '"Inter", sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '1px',
                        '&:hover': { color: '#FFF', background: 'rgba(255,255,255,0.05)' }
                    }}
                >
                    Continuar aqui
                </Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${glowColor} 100%)`,
                        color: '#FFF',
                        fontWeight: 800,
                        fontFamily: '"Inter", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        borderRadius: '8px',
                        padding: '10px 28px',
                        boxShadow: `0 8px 20px ${glowColor}40`,
                        '&:hover': {
                            boxShadow: `0 0 30px ${glowColor}`,
                            filter: 'brightness(1.1)',
                        }
                    }}
                >
                    Encerrar Sessão
                </Button>
            </DialogActions>
        </Dialog>
    );
};