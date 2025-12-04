import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProviderWrapper, useThemeContext } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext'
import {
    Home as HomeIcon,
    Users,
    Settings,
    FileText,
    Layout,
    Code,
    Smartphone,
    Database,
    User,
    BookOpen,
    Moon,
    Sun,
    Target,
    TrendingUp,
    FormInput,
    Download,
    Upload,
    Search
} from 'lucide-react'

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Counter from './components/Counter'
import WindowSizeTracker from './components/WindowSizeTracker'
import UserProfile from './components/UserProfile'
import UserSettings from './components/UserSettings'
import UserList from './components/UserList'
import TechnologyForm from './components/TechnologyForm'
import TechnologyFormAdvanced from './components/TechnologyFormAdvanced'
import TechCard from './components/TechCard'
import TechnologyTracker from './components/TechnologyTracker'
import ProgressDashboard from './pages/ProgressDashboard'
import DataImportExport from './components/DataImportExport'

function AppContent() {
    const { mode, toggleTheme } = useThemeContext()

    const navItems = [
        { to: "/", icon: <HomeIcon size={20} />, label: "Главная", practice: null },
        { to: "/tracker", icon: <Target size={20} />, label: "Трекер", practice: 20 },
        { to: "/counter", icon: <Code size={20} />, label: "Счётчик", practice: 20 },
        { to: "/window", icon: <Smartphone size={20} />, label: "Размер окна", practice: 21 },
        { to: "/profile", icon: <User size={20} />, label: "Профиль", practice: 21 },
        { to: "/settings", icon: <Settings size={20} />, label: "Настройки", practice: 22 },
        { to: "/users", icon: <Users size={20} />, label: "Пользователи", practice: 24 },
        { to: "/form", icon: <FormInput size={20} />, label: "Форма (баз.)", practice: 25 },
        { to: "/form-advanced", icon: <FileText size={20} />, label: "Форма (расш.)", practice: 25 },
        { to: "/import-export", icon: <Upload size={20} />, label: "Импорт/Экспорт", practice: 25 },
        { to: "/card", icon: <Layout size={20} />, label: "Карточка", practice: 26 },
        { to: "/progress", icon: <TrendingUp size={20} />, label: "Статистика", practice: 23 },
        { to: "/about", icon: <BookOpen size={20} />, label: "О проекте", practice: null },
    ]

    return (
        <Router>
            <div className={`min-h-screen ${mode === 'dark' ? 'dark:bg-gray-900 bg-gray-50' : 'bg-gray-50'}`}>
                {/* Навигация */}
                <nav className={`sticky top-0 z-50 ${mode === 'dark' ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 shadow-lg`}>
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                            <Database size={24} />
                            <span className="text-xl font-bold">React Практика</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="px-3 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                                    >
                                        {item.icon}
                                        <span className="hidden md:inline">{item.label}</span>
                                        {item.practice && (
                                            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                                                {item.practice}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="ml-4 p-2 rounded-lg bg-white/20 hover:bg-white/30"
                                title={`Переключить на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
                            >
                                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tracker" element={<TechnologyTracker />} />
                        <Route path="/progress" element={<ProgressDashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/counter" element={<Counter />} />
                        <Route path="/window" element={<WindowSizeTracker />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/settings" element={<UserSettings />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/form" element={<TechnologyForm />} />
                        <Route path="/form-advanced" element={<TechnologyFormAdvanced />} />
                        <Route path="/import-export" element={<DataImportExport />} />
                        <Route path="/card" element={<TechCard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

function App() {
    return (
        <ThemeProviderWrapper>
            <NotificationProvider>
                <AppContent />
            </NotificationProvider>
        </ThemeProviderWrapper>
    )
}

export default App