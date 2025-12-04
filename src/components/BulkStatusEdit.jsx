import { useState } from 'react'
import { CheckSquare, RotateCcw, Users } from 'lucide-react'

export default function BulkStatusEdit({ technologies, onUpdateStatus }) {
    const [selectedIds, setSelectedIds] = useState([])
    const [newStatus, setNewStatus] = useState('in-progress')

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const selectAll = () => {
        if (selectedIds.length === technologies.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(technologies.map(tech => tech.id))
        }
    }

    const applyStatus = () => {
        if (selectedIds.length === 0) {
            alert('Выберите хотя бы одну технологию')
            return
        }

        if (window.confirm(`Изменить статус у ${selectedIds.length} технологий на "${getStatusText(newStatus)}"?`)) {
            selectedIds.forEach(id => onUpdateStatus(id, newStatus))
            setSelectedIds([])
        }
    }

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Завершено'
        }
        return statusMap[status] || status
    }

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <Users className="text-purple-600 dark:text-purple-400" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Массовое редактирование статусов
                </h3>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                    Выбрано: {selectedIds.length}
                </span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    <option value="not-started">Не начато</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Завершено</option>
                </select>

                <button
                    onClick={applyStatus}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                    <CheckSquare size={18} />
                    Применить к выбранным
                </button>

                <button
                    onClick={selectAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                    {selectedIds.length === technologies.length ? 'Снять выделение' : 'Выбрать все'}
                </button>

                {selectedIds.length > 0 && (
                    <button
                        onClick={() => setSelectedIds([])}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Очистить выбор
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {technologies.map(tech => (
                    <div key={tech.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(tech.id)}
                            onChange={() => toggleSelect(tech.id)}
                            className="h-5 w-5 text-blue-600 rounded"
                            id={`tech-${tech.id}`}
                        />
                        <label htmlFor={`tech-${tech.id}`} className="flex-1 cursor-pointer">
                            <span className="font-medium text-gray-900 dark:text-white">{tech.title}</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    tech.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                        tech.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                    {getStatusText(tech.status)}
                                </span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}