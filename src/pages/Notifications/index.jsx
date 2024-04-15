import React from "react"
import { Stack, Typography, Avatar } from "@mui/material"
import { Root } from "../../styles/Root/root_styles"
import { notificationsMasks } from './mask/index'
import { AdUnits, AppShortcut, ChatBubble, Comment, EventNote, Message, MoreHoriz, Notifications, Settings, SystemUpdate } from '@mui/icons-material';

import * as Tag from './styles/index'
export const NotificationsApp = ({ }) => {

    const notificationIcons = {
        message: <Message fontSize='small' />,
        order: <AdUnits />,
        system_update: <SystemUpdate />,
        event_reminder: <EventNote />,
        special_offer: <AppShortcut />,
    };
    const texte = 'Notifications'
    return (
        <Stack sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            minWidth: '30%',
            height: '100%',
            right: '12px',
            overflow: 'auto',
            backgroundColor: Root.color_app_bar,
            boxShadow: Root.boxS,
            borderRadius: '12px',
            ...Root.scrollBar,
            boxSizing: 'border-box'
        }}>
            <Tag.ContainerNotifications
            >
                <Tag.AppBarNotifications >
                    <Tag.TitleTypho ml={2} canUpper={true}>
                        {texte}
                    </Tag.TitleTypho>
                    <Tag.SettingsIcon sx={{ mr: 2 }} />
                </Tag.AppBarNotifications>
            </Tag.ContainerNotifications>
            {notificationsMasks.map((notification, index) => {
                return (
                    <Tag.NotificationComponent
                        key={index}
                        sx={{ bgcolor: notification.isRead && Root.color_app_bar }}
                        first={
                            index === 0} last={
                                index
                                ===
                                notificationsMasks.length - 1
                            }
                    >
                        <Tag.WrapperNotification>
                            {notification.type !== 'message' && <Avatar sx={{
                                color: Root.color_button,
                                border: `1px solid ${Root.color_app_bar}`,
                                bgcolor: Root.color_app_bar,
                                boxShadow: Root.boxS
                            }}>
                                {notificationIcons[notification.type]}
                            </Avatar>}
                            {notification.type === 'message' && <Tag.AvatarCommentNotification >
                                <Tag.AvatarCommentActionFlutuente>
                                    <ChatBubble fontSize='small' sx={{ color: Root.color_button }} />
                                </Tag.AvatarCommentActionFlutuente>
                                <Stack sx={{ color: Root.cyan }}>
                                    {notificationIcons[notification.type]}
                                </Stack>
                            </Tag.AvatarCommentNotification>}
                            <Stack sx={{
                                position: 'relative',
                                flexDirection: 'column',
                                width: '75%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                height: 'auto',
                                overflow: 'hidden'
                            }}>
                                <Stack ml={2} sx={{
                                    minHeight: '1rem',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Tag.TitleTypho sx={{
                                        color: notification.isRead ? Root.color_button : Root.gray_desfius
                                    }}>
                                        {notification.title}
                                    </Tag.TitleTypho>
                                    <Stack sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        color: notification.isRead ? Root.color_button : Root.gray_desfius,
                                        width: '100%',
                                    }}>
                                        {notification.content}
                                    </Stack>
                                </Stack>
                                <Typography variant='subtitle2' ml={2} sx={{
                                    color: notification.isRead ? Root.color_button : Root.gray_desfius
                                }}>
                                    {'Janeiro de 2023'}
                                </Typography>
                            </Stack>
                            <Stack sx={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                color: Root.color_button,
                                right: 0,
                                border: `1px solid ${Root.color_button_opacity}`
                            }}>
                                <MoreHoriz />
                            </Stack>
                        </Tag.WrapperNotification>
                    </Tag.NotificationComponent>
                )
            })}
        </Stack>
    )
}