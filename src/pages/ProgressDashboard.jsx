import { useEffect, useState } from 'react'
import { TrendingUp, Award, Clock, Target } from 'lucide-react'

export default function ProgressDashboard() {
    const [technologies, setTechnologies] = useState([])
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        completionRate: 0
    })

    useEffect(() => {
        const saved = localStorage.getItem('technologies')
        if (saved) {
            const techs = JSON.parse(saved)
            setTechnologies(techs)

            const total = techs.length
            const completed = techs.filter(t => t.status === 'completed').length
            const inProgress = techs.filter(t => t.status === 'in-progress').length
            const notStarted = techs.filter(t => t.status === 'not-started').length
            const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

            setStats({ total, completed, inProgress, notStarted, completionRate })
        }
    }, [])

    const categoryStats = technologies.reduce((acc, tech) => {
        acc[tech.category] = acc[tech.category] || { total: 0, completed: 0 }
        acc[tech.category].total++
        if (tech.status === 'completed') acc[tech.category].completed++
        return acc
    }, {})

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="text-blue-600 dark:text-blue-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Панель прогресса</h2>
                        <p className="text-gray-600 dark:text-gray-300">Статистика изучения технологий</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500 rounded-lg">
                                <Target className="text-white" size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Всего технологий</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500 rounded-lg">
                                <Award className="text-white" size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Завершено</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500 rounded-lg">
                                <Clock className="text-white" size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">В процессе</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500 rounded-lg">
                                <TrendingUp className="text-white" size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.completionRate}%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Процент выполнения</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Прогресс по категориям</h3>
                        <div className="space-y-4">
                            {Object.entries(categoryStats).map(([category, data]) => {
                                const percentage = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
                                return (
                                    <div key={category} className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {data.completed}/{data.total} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Статус изучения</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Завершено</span>
                                </div>
                                <span className="text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">В процессе</span>
                                </div>
                                <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Не начато</span>
                                </div>
                                <span className="text-lg font-bold text-red-600 dark:text-red-400">{stats.notStarted}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Рекомендации</h3>
                    <div className="space-y-3">
                        {stats.notStarted > 0 && (
                            <p className="text-gray-700 dark:text-gray-300">
                                🎯 У вас есть <strong>{stats.notStarted}</strong> технологий, которые еще не начаты.
                                Рекомендуем начать с одной из них!
                            </p>
                        )}
                        {stats.inProgress > 0 && (
                            <p className="text-gray-700 dark:text-gray-300">
                                ⚡ В процессе изучения <strong>{stats.inProgress}</strong> технологий.
                                Продолжайте в том же духе!
                            </p>
                        )}
                        {stats.completionRate >= 75 && (
                            <p className="text-gray-700 dark:text-gray-300">
                                🏆 Отличный прогресс! Вы завершили {stats.completionRate}% технологий.
                            </p>
                        )}
                        {stats.completionRate < 50 && stats.total > 0 && (
                            <p className="text-gray-700 dark:text-gray-300">
                                📈 У вас завершено {stats.completionRate}% технологий.
                                Советуем сосредоточиться на завершении текущих задач.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}