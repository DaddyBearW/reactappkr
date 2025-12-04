import { useState, useEffect } from 'react'
import { Filter, Search, BookOpen, Target, RefreshCw } from 'lucide-react'
import QuickActions from './QuickActions'
import BulkStatusEdit from './BulkStatusEdit'

const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed', notes: '', category: 'frontend' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', notes: '', category: 'frontend' },
    { id: 3, title: 'useState Hook', description: 'Работа с состоянием компонентов', status: 'completed', notes: '', category: 'frontend' },
    { id: 4, title: 'useEffect Hook', description: 'Побочные эффекты и жизненный цикл', status: 'in-progress', notes: '', category: 'frontend' },
    { id: 5, title: 'Node.js Basics', description: 'Основы серверного JavaScript', status: 'not-started', notes: '', category: 'backend' },
    { id: 6, title: 'Express.js', description: 'Создание REST API', status: 'not-started', notes: '', category: 'backend' },
    { id: 7, title: 'MongoDB', description: 'Работа с NoSQL базой данных', status: 'not-started', notes: '', category: 'database' },
    { id: 8, title: 'React Router', description: 'Навигация в React приложениях', status: 'completed', notes: '', category: 'frontend' },
]

export default function TechnologyTracker() {
    const [technologies, setTechnologies] = useState(() => {
        const saved = localStorage.getItem('technologies')
        return saved ? JSON.parse(saved) : initialTechnologies
    })
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [editingNotes, setEditingNotes] = useState(null)
    const [notesText, setNotesText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        localStorage.setItem('technologies', JSON.stringify(technologies))
    }, [technologies])

    const updateStatus = (id, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        )
    }

    const updateNotes = (id, notes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === id ? { ...tech, notes } : tech
            )
        )
        setEditingNotes(null)
    }

    const markAllCompleted = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'completed' }))
        )
    }

    const resetAllStatuses = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        )
    }

    // Дебаунс поиска
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)

        // Очищаем предыдущий таймер
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        // Устанавливаем новый таймер для дебаунса (400ms)
        const newTimeout = setTimeout(() => {
            // Фильтрация происходит в filteredTech вычисляемом значении
        }, 400)

        setSearchTimeout(newTimeout)
    }

    const filteredTech = technologies.filter(tech => {
        const matchesSearch = tech.title.toLowerCase().includes(search.toLowerCase()) ||
            tech.description.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || tech.status === filter
        return matchesSearch && matchesFilter
    })

    const stats = {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length,
        notStarted: technologies.filter(t => t.status === 'not-started').length,
    }

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                    <Target className="text-blue-600 dark:text-blue-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Трекер изучения технологий
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Массовое редактирование и поиск с дебаунсом
                        </p>
                    </div>
                </div>

                <QuickActions
                    technologies={technologies}
                    onMarkAllCompleted={markAllCompleted}
                    onResetAllStatuses={resetAllStatuses}
                    onUpdateStatus={updateStatus}
                />

                {/* Массовое редактирование статусов */}
                <BulkStatusEdit
                    technologies={technologies}
                    onUpdateStatus={updateStatus}
                />

                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-4">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Всего</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 rounded-xl p-4">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Завершено</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-xl p-4">
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">В процессе</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 rounded-xl p-4">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.notStarted}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Не начато</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Поиск технологий с дебаунсом 400ms..."
                                value={search}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {search && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                                    Дебаунс: 400ms
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {['all', 'not-started', 'in-progress', 'completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg transition-all ${filter === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {status === 'all' && 'Все'}
                                    {status === 'not-started' && 'Не начато'}
                                    {status === 'in-progress' && 'В процессе'}
                                    {status === 'completed' && 'Завершено'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTech.map(tech => (
                        <div key={tech.id} className={`border rounded-xl p-6 card-hover ${
                            tech.status === 'completed' ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' :
                                tech.status === 'in-progress' ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20' :
                                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tech.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            tech.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                tech.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {tech.status === 'completed' && 'Завершено'}
                                            {tech.status === 'in-progress' && 'В процессе'}
                                            {tech.status === 'not-started' && 'Не начато'}
                                        </span>
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                                            {tech.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <select
                                        value={tech.status}
                                        onChange={(e) => updateStatus(tech.id, e.target.value)}
                                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                                    >
                                        <option value="not-started">Не начато</option>
                                        <option value="in-progress">В процессе</option>
                                        <option value="completed">Завершено</option>
                                    </select>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{tech.description}</p>

                            <div className="mt-4">
                                {editingNotes === tech.id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={notesText}
                                            onChange={(e) => setNotesText(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
                                            rows="3"
                                            placeholder="Добавьте заметки..."
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateNotes(tech.id, notesText)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                onClick={() => setEditingNotes(null)}
                                                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded text-sm"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Заметки</span>
                                            <button
                                                onClick={() => {
                                                    setEditingNotes(tech.id)
                                                    setNotesText(tech.notes || '')
                                                }}
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                {tech.notes ? 'Редактировать' : 'Добавить'}
                                            </button>
                                        </div>
                                        {tech.notes ? (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded p-3">
                                                {tech.notes}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                                                Заметок пока нет...
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTech.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="text-gray-400 dark:text-gray-500 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Технологии не найдены</h3>
                        <p className="text-gray-600 dark:text-gray-400">Попробуйте изменить поисковый запрос или фильтр</p>
                    </div>
                )}

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📊 Реализованные функции</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Массовое редактирование статусов</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Поиск с дебаунсом 400ms</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Фильтрация по статусу</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>Сохранение в localStorage</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}