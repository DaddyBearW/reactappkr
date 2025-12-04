import { useState, useEffect, useRef } from 'react'
import { Users, UserCheck, UserX, Search, Mail, Phone, Building, MapPin, Filter } from 'lucide-react'

export default function UserList() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const searchTimeoutRef = useRef(null)

    // Функция загрузки пользователей
    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError(null)

            // Имитация API задержки
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Мокированные данные на русском
            const russianUsers = [
                {
                    id: 1,
                    name: 'Иван Петров',
                    username: 'ivan_petrov',
                    email: 'ivan.petrov@example.ru',
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
                    },
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Мария Сидорова',
                    username: 'maria_sidorova',
                    email: 'maria.sidorova@mail.ru',
                    phone: '+7 (999) 234-56-78',
                    website: 'sidorova-m.ru',
                    company: {
                        name: 'ТехноПром Групп',
                        catchPhrase: 'Современные IT-решения',
                        bs: 'разработка ПО'
                    },
                    address: {
                        street: 'пр. Победы',
                        suite: 'д. 45',
                        city: 'Санкт-Петербург',
                        zipcode: '190000',
                        geo: { lat: '59.9343', lng: '30.3351' }
                    },
                    status: 'active'
                },
                {
                    id: 3,
                    name: 'Алексей Козлов',
                    username: 'aleksey_kozlov',
                    email: 'aleksey.kozlov@gmail.com',
                    phone: '+7 (999) 345-67-89',
                    website: 'kozlov-dev.ru',
                    company: {
                        name: 'Вектор Технологии',
                        catchPhrase: 'Разработка будущего',
                        bs: 'веб-разработка'
                    },
                    address: {
                        street: 'ул. Советская',
                        suite: 'д. 78',
                        city: 'Новосибирск',
                        zipcode: '630000',
                        geo: { lat: '55.0084', lng: '82.9357' }
                    },
                    status: 'inactive'
                },
                {
                    id: 4,
                    name: 'Екатерина Волкова',
                    username: 'ekaterina_volkova',
                    email: 'volkova.e@yandex.ru',
                    phone: '+7 (999) 456-78-90',
                    website: 'volkova-design.ru',
                    company: {
                        name: 'Дизайн Студия',
                        catchPhrase: 'Красота в деталях',
                        bs: 'UI/UX дизайн'
                    },
                    address: {
                        street: 'ул. Мира',
                        suite: 'д. 12',
                        city: 'Екатеринбург',
                        zipcode: '620000',
                        geo: { lat: '56.8389', lng: '60.6057' }
                    },
                    status: 'active'
                },
                {
                    id: 5,
                    name: 'Дмитрий Смирнов',
                    username: 'dmitry_smirnov',
                    email: 'd.smirnov@company.ru',
                    phone: '+7 (999) 567-89-01',
                    website: 'smirnov-it.ru',
                    company: {
                        name: 'ИТ Консалтинг',
                        catchPhrase: 'Эффективные IT-решения',
                        bs: 'консалтинг'
                    },
                    address: {
                        street: 'ул. Центральная',
                        suite: 'офис 56',
                        city: 'Казань',
                        zipcode: '420000',
                        geo: { lat: '55.8304', lng: '49.0661' }
                    },
                    status: 'active'
                },
                {
                    id: 6,
                    name: 'Анна Николаева',
                    username: 'anna_nikolaeva',
                    email: 'anna.n@bk.ru',
                    phone: '+7 (999) 678-90-12',
                    website: 'nikolaeva.pro',
                    company: {
                        name: 'Маркетинг Агентство',
                        catchPhrase: 'Продвижение в цифре',
                        bs: 'цифровой маркетинг'
                    },
                    address: {
                        street: 'ул. Парковая',
                        suite: 'д. 34',
                        city: 'Нижний Новгород',
                        zipcode: '603000',
                        geo: { lat: '56.2965', lng: '43.9361' }
                    },
                    status: 'inactive'
                }
            ]

            setUsers(russianUsers)
            setFilteredUsers(russianUsers)
        } catch (err) {
            setError('Не удалось загрузить пользователей')
            console.error('Ошибка загрузки:', err)
        } finally {
            setLoading(false)
        }
    }

    // Дебаунс поиска
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        // Очищаем предыдущий таймер
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }

        // Устанавливаем новый таймер для дебаунса (500ms)
        searchTimeoutRef.current = setTimeout(() => {
            filterUsers(value, filter)
        }, 500)
    }

    // Фильтрация пользователей
    const filterUsers = (search = searchTerm, statusFilter = filter) => {
        const filtered = users.filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.company.name.toLowerCase().includes(search.toLowerCase())

            const matchesFilter =
                statusFilter === 'all' ||
                (statusFilter === 'active' && user.status === 'active') ||
                (statusFilter === 'inactive' && user.status === 'inactive')

            return matchesSearch && matchesFilter
        })

        setFilteredUsers(filtered)
    }

    // Загрузка при монтировании
    useEffect(() => {
        fetchUsers()

        // Очистка таймера при размонтировании
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }
        }
    }, [])

    // Обработчик изменения фильтра
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
        filterUsers(searchTerm, newFilter)
    }

    // Повторная загрузка
    const handleRetry = () => {
        fetchUsers()
    }

    if (loading) return (
        <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Загрузка пользователей...</p>
        </div>
    )

    if (error) return (
        <div className="py-20 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-8 max-w-md mx-auto">
                <UserX className="text-red-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Ошибка загрузки</h3>
                <p className="text-red-600 dark:text-red-300">{error}</p>
                <button
                    onClick={handleRetry}
                    className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    Попробовать снова
                </button>
            </div>
        </div>
    )

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Users className="text-purple-600 dark:text-purple-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Практика 24 — API с Debounce</h2>
                        <p className="text-gray-600 dark:text-gray-300">Поиск с задержкой 500ms и фильтрация</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Всего пользователей: <span className="font-bold text-gray-900 dark:text-white">{users.length}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Найдено: <span className="font-bold text-gray-900 dark:text-white">{filteredUsers.length}</span>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Поиск по имени, email или компании..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {searchTerm && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                                    Debounce: 500ms
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-500" size={20} />
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                {['all', 'active', 'inactive'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleFilterChange(status)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                            filter === status
                                                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {status === 'all' && 'Все'}
                                        {status === 'active' && 'Активные'}
                                        {status === 'inactive' && 'Неактивные'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="card-hover bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    user.status === 'active'
                                        ? 'bg-green-100 dark:bg-green-900/30'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <UserCheck className={
                                        user.status === 'active'
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-gray-400 dark:text-gray-500'
                                    } size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            user.status === 'active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {user.status === 'active' ? 'Активен' : 'Неактивен'}
                                        </span>
                                        <span className="badge bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                                            @{user.username}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Телефон</p>
                                        <p className="text-gray-700 dark:text-gray-300">{user.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Building className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Компания</p>
                                        <p className="text-gray-700 dark:text-gray-300">{user.company.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="text-gray-400" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Город</p>
                                        <p className="text-gray-700 dark:text-gray-300">{user.address.city}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-2"
                                >
                                    {user.website} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="text-gray-400 dark:text-gray-500 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Пользователи не найдены</h3>
                        <p className="text-gray-600 dark:text-gray-400">Попробуйте изменить поисковый запрос или фильтр</p>
                    </div>
                )}
            </div>
        </div>
    )
}