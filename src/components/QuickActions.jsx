import { useState } from 'react'
import { CheckSquare, RotateCcw, Shuffle, X } from 'lucide-react'

export default function QuickActions({ technologies, onMarkAllCompleted, onResetAllStatuses, onUpdateStatus }) {
    const [showRandomModal, setShowRandomModal] = useState(false)
    const [randomTech, setRandomTech] = useState(null)
    const [usedTechIds, setUsedTechIds] = useState([])

    const getRandomTechnology = () => {
        const notStarted = technologies.filter(tech =>
            tech.status === 'not-started' && !usedTechIds.includes(tech.id)
        )

        if (notStarted.length === 0) {
            setRandomTech(null)
            setUsedTechIds([])
            const allNotStarted = technologies.filter(tech => tech.status === 'not-started')
            if (allNotStarted.length > 0) {
                const randomIndex = Math.floor(Math.random() * allNotStarted.length)
                const tech = allNotStarted[randomIndex]
                setRandomTech(tech)
                setUsedTechIds([tech.id])
            }
            return
        }

        const randomIndex = Math.floor(Math.random() * notStarted.length)
        const tech = notStarted[randomIndex]
        setRandomTech(tech)
        setUsedTechIds(prev => [...prev, tech.id])
    }

    const handleRandomSelect = () => {
        if (randomTech) {
            onUpdateStatus(randomTech.id, 'in-progress')
            setShowRandomModal(false)
            setRandomTech(null)
            alert(`Технология "${randomTech.title}" выбрана для изучения!`)
        }
    }

    const handleAnotherRandom = () => {
        getRandomTechnology()
    }

    return (
        <>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Быстрые действия</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={onMarkAllCompleted}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <CheckSquare size={18} />
                        Отметить все как выполненные
                    </button>
                    <button
                        onClick={onResetAllStatuses}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Сбросить все статусы
                    </button>
                    <button
                        onClick={() => {
                            getRandomTechnology()
                            setShowRandomModal(true)
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                        <Shuffle size={18} />
                        Случайный выбор технологии
                    </button>
                </div>
            </div>

            {showRandomModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                🎯 Случайный выбор технологии
                            </h3>
                            <button
                                onClick={() => setShowRandomModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {randomTech ? (
                            <div className="space-y-6">
                                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                                        {randomTech.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {randomTech.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm">
                                            Начать изучение?
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleRandomSelect}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <CheckSquare size={20} />
                                        Выбрать и начать изучение
                                    </button>
                                    <button
                                        onClick={handleAnotherRandom}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Shuffle size={20} />
                                        Выбрать другую случайную
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Эта технология будет помечена как "В процессе"
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 dark:text-gray-500 mb-4">
                                    <Shuffle size={48} className="mx-auto" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Все технологии изучены!
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Не осталось технологий со статусом "Не начато"
                                </p>
                                <button
                                    onClick={() => setShowRandomModal(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                                >
                                    Закрыть
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}