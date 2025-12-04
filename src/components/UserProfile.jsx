import { useState, useEffect } from 'react'
import { User as UserIcon, Mail, Phone, Globe, Building, MapPin, RefreshCw } from 'lucide-react'

export default function UserProfile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Кастомный хук useApi (имитация)
    const useApi = (url) => {
        const [data, setData] = useState(null)
        const [isLoading, setIsLoading] = useState(true)
        const [apiError, setApiError] = useState(null)

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setIsLoading(true)
                    setApiError(null)

                    // Имитация задержки API
                    await new Promise(resolve => setTimeout(resolve, 1000))

                    // Мокированные данные
                    const mockUser = {
                        id: 1,
                        name: 'Мосенц Михаил',
                        username: 'mikhail_mosents',
                        email: 'mikhail_mosents@example.ru',
                        phone: '+7 (999) 123-45-67',
                        website: 'ivanpetrov.ru',
                        company: {
                            name: 'Рога и Копыта ООО',
                            catchPhrase: 'Надежные решения для бизнеса',
                            bs: 'инновационные технологии'
                        },
                        address: {
                            street: 'ул. Ленина',
                            suite: 'д. 123',
                            city: 'Москва',
                            zipcode: '101000',
                            geo: { lat: '55.7558', lng: '37.6173' }
                        }
                    }

                    setData(mockUser)
                } catch (err) {
                    setApiError('Не удалось загрузить данные пользователя')
                    console.error('API ошибка:', err)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchData()
        }, [url])

        const refetch = () => {
            fetchData()
        }

        return { data, loading: isLoading, error: apiError, refetch }
    }

    // Используем наш кастомный хук
    const { data, loading: apiLoading, error: apiError, refetch } = useApi('https://jsonplaceholder.typicode.com/users/1')

    useEffect(() => {
        if (data) {
            setUser(data)
            setLoading(false)
        }
        if (apiError) {
            setError(apiError)
            setLoading(false)
        }
    }, [data, apiError])

    const handleRetry = () => {
        setLoading(true)
        setError(null)
        // В реальном приложении здесь был бы вызов refetch()
        setTimeout(() => {
            setUser({
                id: 1,
                name: 'Мосенц Михаил',
                username: 'mikhail_mosents',
                email: 'mosents.m.a@updated.ru',
                phone: '+7 (999) 999-99-99',
                website: 'ivanpetrov-updated.ru',
                company: {
                    name: 'Обновленная Компания',
                    catchPhrase: 'Современные решения',
                    bs: 'технологии будущего'
                },
                address: {
                    street: 'ул. Обновленная',
                    suite: 'д. 999',
                    city: 'Москва',
                    zipcode: '101999'
                }
            })
            setLoading(false)
        }, 800)
    }

    if (loading) return (
        <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка профиля...</p>
        </div>
    )

    if (error) return (
        <div className="py-20 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Ошибка загрузки</h3>
                <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
                <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    Попробовать снова
                </button>
            </div>
        </div>
    )

    return (
        <div className="py-12">
            <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">👤 Практика 21 — useEffect + API</h2>
                        <p className="text-gray-600 mb-4">Загрузка данных пользователя с кастомным хуком useApi</p>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                API Hook
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                Дебаунс
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={20} />
                        Обновить
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <UserIcon className="text-white" size={64} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h3>
                            <div className="flex flex-col gap-2 mt-4">
                                <div className="badge bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mx-auto">
                                    ID: {user.id}
                                </div>
                                <div className="badge bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mx-auto">
                                    @{user.username}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Mail className="text-blue-600" size={20} />
                                    Контактная информация
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-gray-400" size={18} />
                                        <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-gray-400" size={18} />
                                        <span className="text-gray-700 dark:text-gray-300">{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-gray-400" size={18} />
                                        <span className="text-gray-700 dark:text-gray-300">{user.website}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Building className="text-purple-600" size={20} />
                                    Компания
                                </h4>
                                <div className="space-y-2">
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{user.company.name}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{user.company.catchPhrase}</p>
                                    <p className="text-gray-500 dark:text-gray-500 text-sm">{user.company.bs}</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MapPin className="text-green-600" size={20} />
                                    Адрес
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {user.address.street}, {user.address.suite}<br/>
                                    {user.address.city}, {user.address.zipcode}
                                </p>
                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                                    Координаты: {user.address.geo?.lat}, {user.address.geo?.lng}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ℹ️ Информация о реализации</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Кастомный хук useApi:</strong> Инкапсулирует логику загрузки данных, обработки ошибок и состояния загрузки.
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Повторная загрузка:</strong> Кнопка "Обновить" перезагружает данные с имитацией обновленных данных.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}