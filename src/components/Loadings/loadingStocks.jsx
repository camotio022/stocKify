import { Backdrop, CircularProgress, Typography, Stack } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";

export const LoadingModal = ({ open, message }) => {
    return (
        <Backdrop
            sx={{
              position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                backgroundColor: 'transparent'
            }}
            open={!open}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    padding: '30px 50px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(144, 0, 255, 0.08)',
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={4.5}
                    sx={{
                        color: '#9000ff',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        }
                    }}
                />

                {/* Mensagem de Feedback para o Usuário */}
                <Typography
                    variant="body1"
                    sx={{
                        color: '#9000ff',
                        marginTop: '20px',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        fontFamily: 'sans-serif',
                        textAlign: 'center',
                        textShadow: '0 0 10px rgba(144, 0, 255, 0.5)' // Texto levemente brilhante
                    }}
                >
                    {message}
                </Typography>
            </Stack>
        </Backdrop>
    );
};