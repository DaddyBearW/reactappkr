import { useRef, useState, useEffect } from 'react'
import { Download, Upload, Database, CheckCircle, AlertCircle, FileJson, Trash2 } from 'lucide-react'

export default function DataImportExport() {
    const fileInputRef = useRef(null)
    const [technologies, setTechnologies] = useState([])
    const [status, setStatus] = useState('')
    const [isDragging, setIsDragging] = useState(false)

    // Загружаем данные из localStorage при монтировании
    useEffect(() => {
        const saved = localStorage.getItem('technologies')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setTechnologies(parsed)
                setStatus(`✅ Загружено ${parsed.length} технологий из localStorage`)
                setTimeout(() => setStatus(''), 3000)
            } catch (error) {
                setStatus('❌ Ошибка загрузки данных')
            }
        }
    }, [])

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('technologies', JSON.stringify(technologies))
        }
    }, [technologies])

    const exportToJSON = () => {
        try {
            const dataStr = JSON.stringify(technologies, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            setStatus('✅ Данные экспортированы в JSON файл')
            setTimeout(() => setStatus(''), 3000)
        } catch (error) {
            setStatus('❌ Ошибка экспорта данных')
            setTimeout(() => setStatus(''), 3000)
        }
    }

    const importFromJSON = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result)

                // Проверяем, что это массив
                if (!Array.isArray(imported)) {
                    throw new Error('Неверный формат: ожидается массив')
                }

                // Проверяем структуру хотя бы первого элемента
                if (imported.length > 0) {
                    const firstItem = imported[0]
                    if (!firstItem.id || !firstItem.title || !firstItem.status || !firstItem.category) {
                        throw new Error('Некорректная структура данных')
                    }
                }

                setTechnologies(imported)
                setStatus(`✅ Импортировано ${imported.length} технологий`)
                setTimeout(() => setStatus(''), 3000)
            } catch (error) {
                setStatus(`❌ Ошибка импорта: ${error.message}`)
                setTimeout(() => setStatus(''), 3000)
                console.error('Импорт ошибка:', error)
            }
        }
        reader.readAsText(file)
        event.target.value = ''
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.currentTarget.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file && file.type === 'application/json') {
            const reader = new FileReader()
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result)
                    if (Array.isArray(imported)) {
                        setTechnologies(imported)
                        setStatus(`✅ Импортировано ${imported.length} технологий`)
                        setTimeout(() => setStatus(''), 3000)
                    }
                } catch (error) {
                    setStatus('❌ Ошибка импорта: неверный формат файла')
                    setTimeout(() => setStatus(''), 3000)
                }
            }
            reader.readAsText(file)
        } else {
            setStatus('❌ Поддерживаются только JSON файлы')
            setTimeout(() => setStatus(''), 3000)
        }
    }

    const clearAllData = () => {
        if (window.confirm('Удалить все технологии? Это действие нельзя отменить.')) {
            setTechnologies([])
            localStorage.removeItem('technologies')
            setStatus('✅ Все данные удалены')
            setTimeout(() => setStatus(''), 3000)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-600 dark:text-green-400'
            case 'in-progress': return 'text-yellow-600 dark:text-yellow-400'
            default: return 'text-red-600 dark:text-red-400'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Завершено'
            case 'in-progress': return 'В процессе'
            default: return 'Не начато'
        }
    }

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8 max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Database className="text-blue-600 dark:text-blue-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Импорт и экспорт данных
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Практика 25 — Работа с JSON файлами и localStorage
                        </p>
                    </div>
                </div>

                {status && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                        status.includes('✅')
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-700'
                    }`}>
                        {status.includes('✅') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{status}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Левая колонка - Управление данными */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Управление данными</h3>

                            <div className="space-y-4">
                                <button
                                    onClick={exportToJSON}
                                    disabled={technologies.length === 0}
                                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                        technologies.length === 0
                                            ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                                            : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                                    } text-white`}
                                >
                                    <Download size={20} />
                                    Экспорт в JSON ({technologies.length})
                                </button>

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Upload size={20} />
                                    Импорт из JSON файла
                                </button>

                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={importFromJSON}
                                    ref={fileInputRef}
                                    className="hidden"
                                />

                                <button
                                    onClick={clearAllData}
                                    disabled={technologies.length === 0}
                                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                                        technologies.length === 0
                                            ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                                            : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                                    } text-white`}
                                >
                                    <Trash2 size={20} />
                                    Очистить все данные
                                </button>
                            </div>
                        </div>

                        {/* Drag and Drop зона */}
                        <div
                            className={`border-3 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                                isDragging
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                    <Upload className="text-blue-600 dark:text-blue-400" size={32} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Перетащите файл сюда
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Поддерживаются только JSON файлы
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Или нажмите кнопку "Импорт из JSON файла"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Информация */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📋 Информация</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <span>Экспорт создает JSON файл со всеми технологиями</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <span>Импорт заменяет текущие данные</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                    <span>Поддерживается drag-and-drop</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                    <span>Данные сохраняются в localStorage</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Правая колонка - Предпросмотр данных */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Текущие данные ({technologies.length})
                                </h3>
                                <div className="flex items-center gap-2">
                                    <FileJson className="text-gray-400" size={20} />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">JSON формат</span>
                                </div>
                            </div>

                            {technologies.length === 0 ? (
                                <div className="text-center py-12">
                                    <Database className="text-gray-400 dark:text-gray-500 mx-auto mb-4" size={48} />
                                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Нет данных</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Импортируйте данные из JSON файла или добавьте технологии в трекере
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Всего технологий</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{technologies.length}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Завершено</p>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {technologies.filter(t => t.status === 'completed').length}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="space-y-3">
                                            {technologies.map(tech => (
                                                <div key={tech.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">{tech.title}</h4>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tech.status)}`}>
                                                            {getStatusText(tech.status)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                                                        {tech.description}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                                                            {tech.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            ID: {tech.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <p>Пример структуры JSON:</p>
                                        <pre className="mt-2 p-3 bg-gray-800 text-gray-100 rounded text-xs overflow-x-auto">
{`[
  {
    "id": 1,
    "title": "React",
    "description": "Библиотека JavaScript",
    "status": "in-progress",
    "category": "frontend"
  }
]`}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}