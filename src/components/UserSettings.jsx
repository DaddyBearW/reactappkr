import { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'  // Импортируем правильно
import { Settings as SettingsIcon, User, Moon, Sun, Bell, Globe } from 'lucide-react'

export default function UserSettings() {
    const [name, setName] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('username') || 'Гость'
        }
        return 'Гость'
    })
    const { mode, toggleTheme } = useThemeContext()  // Используем хук
    const [notifications, setNotifications] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('notifications')
            return saved !== null ? JSON.parse(saved) : true
        }
        return true
    })
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('language') || 'ru'
        }
        return 'ru'
    })

    const handleNameChange = (e) => {
        const newName = e.target.value
        setName(newName)
        if (typeof window !== 'undefined') {
            localStorage.setItem('username', newName)
        }
    }

    const handleNotificationsChange = (checked) => {
        setNotifications(checked)
        if (typeof window !== 'undefined') {
            localStorage.setItem('notifications', JSON.stringify(checked))
        }
    }

    const handleLanguageChange = (lang) => {
        setLanguage(lang)
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang)
        }
    }

    return (
        <div className="py-12">
            <div className={`${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl p-8 max-w-2xl mx-auto shadow-lg`}>
                <div className="flex items-center gap-3 mb-8">
                    <SettingsIcon className="text-green-600" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold">Практика 22 — localStorage</h2>
                        <p className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Настройки сохраняются между сессиями
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            <User className="text-blue-600" size={20} />
                            <h3 className="text-lg font-semibold">Профиль</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                    Имя пользователя
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    className={`w-full px-4 py-3 border rounded-lg 
                                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                             outline-none transition-all duration-200
                                             ${mode === 'dark'
                                        ? 'bg-gray-600 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'}`}
                                    placeholder="Введите ваше имя"
                                />
                                <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                                    Имя сохраняется в localStorage
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            {mode === 'light' ? (
                                <Sun className="text-yellow-500" size={20} />
                            ) : (
                                <Moon className="text-purple-500" size={20} />
                            )}
                            <h3 className="text-lg font-semibold">Внешний вид</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                    Тема оформления
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => mode !== 'light' && toggleTheme()}
                                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                            mode === 'light'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                        } ${mode === 'dark' ? 'border-gray-600 hover:border-gray-500' : ''}`}
                                    >
                                        <Sun className={mode === 'light' ? 'text-blue-600' : 'text-gray-400'} />
                                        <div className="text-left">
                                            <p className="font-medium">Светлая</p>
                                            <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Рекомендуется днём
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => mode !== 'dark' && toggleTheme()}
                                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                            mode === 'dark'
                                                ? 'border-purple-500 bg-purple-900/20'
                                                : 'border-gray-300 hover:border-gray-400'
                                        } ${mode === 'dark' ? 'border-gray-600 hover:border-gray-500' : ''}`}
                                    >
                                        <Moon className={mode === 'dark' ? 'text-purple-400' : 'text-gray-400'} />
                                        <div className="text-left">
                                            <p className="font-medium">Тёмная</p>
                                            <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Рекомендуется ночью
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
                        <h3 className="text-lg font-semibold mb-4">Настройки приложения</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bell className="text-gray-500" size={20} />
                                    <div>
                                        <p className="font-medium">Уведомления</p>
                                        <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Получать push-уведомления
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={(e) => handleNotificationsChange(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-11 h-6 ${mode === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer 
                                                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                                    after:bg-white after:border after:rounded-full 
                                                    after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Globe className="text-gray-500" size={20} />
                                    <label className={`block text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Язык интерфейса
                                    </label>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg 
                                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                             outline-none transition-all duration-200
                                             ${mode === 'dark'
                                        ? 'bg-gray-600 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'}`}
                                >
                                    <option value="ru">Русский</option>
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20
                                  rounded-xl p-6 border border-green-200 dark:border-green-700">
                        <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                            ✅ Данные сохранены
                        </h4>
                        <p className="text-green-700 dark:text-green-300">
                            Все настройки автоматически сохраняются в localStorage браузера.
                            Они останутся даже после закрытия вкладки или перезагрузки страницы.
                        </p>
                        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                            Текущие значения: Имя - "{name}", Тема - {mode === 'light' ? 'Светлая' : 'Тёмная'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}