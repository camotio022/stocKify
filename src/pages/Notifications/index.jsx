import React, { useContext } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { Root } from "../../styles/Root/root_styles";
import { AuthContext } from '../../auth_context/index';

// Ícones dinâmicos alinhados ao fluxo real do estoque do Stockify
import { 
    CheckCircle, 
    Inventory, 
    Warning, 
    People, 
    MoreHoriz 
} from '@mui/icons-material';

import * as Tag from './styles/index';

// 📝 SIMULAÇÃO DA SUGESTÃO DE NOTIFICAÇÕES TIPO VIVAS DO MULTI-TENANT (Troque pela sua importação real da API)
const notificationsMasksMock = [
    { type: 'entrada', title: 'Entrada de Estoque', content: 'Judson registrou 15 unidades de Vestido Midi Canelado.', time: 'Há 5 min', isRead: false },
    { type: 'alerta', title: 'Alerta de Validade', content: 'O item Lombo Defumado está a menos de 3 dias do vencimento.', time: 'Há 1 hora', isRead: false },
    { type: 'colaboracao', title: 'Nova Lista Compartilhada', content: 'Timo adicionou você como colaborador na lista "Reposição Fim de Ano".', time: 'Há 2 horas', isRead: true },
    { type: 'baixa', title: 'Baixa Concluída', content: 'Rhodolfo removeu 2 unidades de Caixa de Leite por avaria.', time: 'Ontem', isRead: true }
];

export const NotificationsApp = () => {
    const { tenant } = useContext(AuthContext);

    // Paleta reativa baseada nas cores camaleão da empresa logada
    const glowColor = tenant?.theme?.buttons?.primary || Root.color_button;
    const accentColor = tenant?.theme?.buttons?.secondary || Root.cyan;

    // Mapeamento de ícones focados no gerenciamento corporativo real do Stockify
    const notificationIcons = {
        entrada: <CheckCircle sx={{ fontSize: '18px', color: '#00F5D4' }} />,
        baixa: <Inventory sx={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }} />,
        alerta: <Warning sx={{ fontSize: '18px', color: '#FF6B6B' }} />,
        colaboracao: <People sx={{ fontSize: '18px', color: glowColor }} />
    };

    return (
        <Tag.ContainAbsolute>
            {/* TOPO FIXO */}
            <Tag.ContainerNotifications>
                <Tag.AppBarNotifications>
                    <Tag.TitleTypho canUpper={true}>
                        Notificações
                    </Tag.TitleTypho>
                    <Tag.SettingsIcon />
                </Tag.AppBarNotifications>
            </Tag.ContainerNotifications>

            {/* CORPO DE NOTIFICAÇÕES MAP DIAGNÓSTICO */}
            {notificationsMasksMock.map((notification, index) => {
                return (
                    <Tag.NotificationComponent
                        key={index}
                        isread={notification.isRead ? "true" : "false"}
                    >
                        <Tag.WrapperNotification>
                            
                            {/* ÍCONE DE AVATAR CYBER COM BORDA REATIVA */}
                            <Tag.AvatarCommentNotification 
                                sx={{ 
                                    borderColor: !notification.isRead ? accentColor : 'rgba(255,255,255,0.08)',
                                    boxShadow: !notification.isRead ? `0 0 10px ${accentColor}30` : 'none'
                                }}
                            >
                                {notificationIcons[notification.type] || <CheckCircle />}
                                
                                {/* Ponto flutuante indicador de não lido */}
                                {!notification.isRead && (
                                    <Box 
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: accentColor,
                                            boxShadow: `0 0 8px ${accentColor}`
                                        }}
                                    />
                                )}
                            </Tag.AvatarCommentNotification>

                            {/* TEXTOS DA MOVIMENTAÇÃO DE TIME */}
                            <Stack sx={{ flexDirection: 'column', width: 'calc(100% - 70px)', alignItems: 'flex-start' }}>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        fontFamily: Root.fontFamilySansSerif,
                                        fontWeight: 700, 
                                        color: !notification.isRead ? '#FFF' : 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '13px'
                                    }}
                                >
                                    {notification.title}
                                </Typography>
                                
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontFamily: Root.fontFamilySansSerif,
                                        color: 'rgba(255, 255, 255, 0.45)', 
                                        marginTop: '4px',
                                        fontSize: '12px',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {notification.content}
                                </Typography>

                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontFamily: Root.fontFamilySansSerif,
                                        color: !notification.isRead ? accentColor : 'rgba(255, 255, 255, 0.25)', 
                                        fontWeight: !notification.isRead ? 600 : 400,
                                        marginTop: '6px',
                                        fontSize: '11px'
                                    }}
                                >
                                    {notification.time}
                                </Typography>
                            </Stack>

                            {/* BOTÃO MAIS OPÇÕES DISCRETO */}
                            <Box sx={{ color: 'rgba(255, 255, 255, 0.2)', cursor: 'pointer', '&:hover': { color: '#FFF' }, marginLeft: 'auto' }}>
                                <MoreHoriz sx={{ fontSize: '18px' }} />
                            </Box>

                        </Tag.WrapperNotification>
                    </Tag.NotificationComponent>
                );
            })}
        </Tag.ContainAbsolute>
    );
};