import React, { createContext, useState, useContext, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

// Функция для создания темы с учетом режима
const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Светлая тема
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#dc004e',
                },
                background: {
                    default: '#f8fafc',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#1e293b',
                    secondary: '#64748b',
                },
            }
            : {
                // Темная тема
                primary: {
                    main: '#90caf9',
                },
                secondary: {
                    main: '#f48fb1',
                },
                background: {
                    default: '#0f172a',
                    paper: '#1e293b',
                },
                text: {
                    primary: '#f8fafc',
                    secondary: '#cbd5e1',
                },
            }),
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
})

export function ThemeProviderWrapper({ children }) {
    const [mode, setMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light'
        }
        return 'light'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', mode)
            // Добавляем/удаляем класс для Tailwind
            if (mode === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }, [mode])

    const toggleTheme = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
    }

    // Создаем тему с использованием дизайн-токенов
    const theme = React.useMemo(() =>
            createTheme(getDesignTokens(mode)),
        [mode]
    )

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}