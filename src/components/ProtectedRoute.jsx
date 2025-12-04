import { Navigate } from 'react-router-dom'
import { useThemeContext } from './context/ThemeContext'

export default function ProtectedRoute({ children }) {
    const { mode } = useThemeContext()

    // Простая проверка авторизации через localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children
}