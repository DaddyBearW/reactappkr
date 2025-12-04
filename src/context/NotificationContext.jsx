import React, { createContext, useState, useContext, useCallback } from 'react'
import { Snackbar, Alert, AlertTitle } from '@mui/material'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

const iconMap = {
    success: <CheckCircle className="text-green-600" size={24} />,
    error: <XCircle className="text-red-600" size={24} />,
    warning: <AlertTriangle className="text-yellow-600" size={24} />,
    info: <Info className="text-blue-600" size={24} />
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null)
    const [open, setOpen] = useState(false)

    const showNotification = useCallback((message, options = {}) => {
        const {
            type = 'info',
            title = '',
            duration = 6000,
            action = null
        } = options

        setNotification({
            message,
            type,
            title,
            duration,
            action
        })
        setOpen(true)
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={notification?.duration || 6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                    }
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notification?.type}
                    variant="filled"
                    icon={notification?.type ? iconMap[notification.type] : undefined}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        alignItems: 'center',
                        '& .MuiAlert-icon': {
                            alignItems: 'center',
                            marginRight: 2
                        }
                    }}
                >
                    {notification?.title && (
                        <AlertTitle sx={{ fontWeight: 600, marginBottom: 0.5 }}>
                            {notification.title}
                        </AlertTitle>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-white">{notification?.message}</span>
                        {notification?.action && (
                            <button
                                onClick={notification.action.onClick}
                                className="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded text-sm transition-colors"
                            >
                                {notification.action.label}
                            </button>
                        )}
                    </div>
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}