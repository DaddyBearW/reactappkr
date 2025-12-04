import { useState, useEffect } from 'react'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

export default function WindowSizeTracker() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getDeviceType = () => {
        if (size.width < 640) return { type: 'мобильный', icon: <Smartphone className="text-blue-600" size={24} />, color: 'from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10' }
        if (size.width < 1024) return { type: 'планшет', icon: <Tablet className="text-purple-600" size={24} />, color: 'from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10' }
        return { type: 'десктоп', icon: <Monitor className="text-green-600" size={24} />, color: 'from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10' }
    }

    const device = getDeviceType()

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Monitor className="text-blue-600 dark:text-blue-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Практика 21 — useEffect (размер окна)</h2>
                        <p className="text-gray-600 dark:text-gray-300">Отслеживание размера окна браузера в реальном времени</p>
                    </div>
                </div>

                <div className={`bg-gradient-to-br ${device.color} rounded-xl p-8 mb-8`}>
                    <div className="flex items-center gap-4 mb-6">
                        {device.icon}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Текущий тип устройства</h3>
                            <p className="text-gray-600 dark:text-gray-300">Определено на основе ширины окна</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Размеры окна</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <span className="text-gray-700 dark:text-gray-300">Ширина:</span>
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{size.width}px</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <span className="text-gray-700 dark:text-gray-300">Высота:</span>
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{size.height}px</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <span className="text-gray-700 dark:text-gray-300">Тип экрана:</span>
                                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{device.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Диапазоны размеров</h4>
                            <div className="space-y-3">
                                <div className={`flex items-center gap-3 p-3 rounded ${size.width < 640 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
                                    <Smartphone className={size.width < 640 ? 'text-blue-600' : 'text-gray-400'} size={20} />
                                    <div>
                                        <p className={`font-medium ${size.width < 640 ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>Мобильный</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">до 640px</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-3 p-3 rounded ${size.width >= 640 && size.width < 1024 ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
                                    <Tablet className={size.width >= 640 && size.width < 1024 ? 'text-purple-600' : 'text-gray-400'} size={20} />
                                    <div>
                                        <p className={`font-medium ${size.width >= 640 && size.width < 1024 ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Планшет</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">640px - 1024px</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-3 p-3 rounded ${size.width >= 1024 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
                                    <Monitor className={size.width >= 1024 ? 'text-green-600' : 'text-gray-400'} size={20} />
                                    <div>
                                        <p className={`font-medium ${size.width >= 1024 ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>Десктоп</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">от 1024px</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">ℹ️ Как это работает</h4>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p>• Компонент отслеживает изменение размера окна с помощью <code className="bg-gray-800 text-gray-100 px-1 rounded">useEffect</code></p>
                        <p>• При изменении размера окна автоматически обновляется состояние компонента</p>
                        <p>• Тип устройства определяется на основе текущей ширины окна</p>
                        <p>• Все стили адаптированы для светлой и темной темы</p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Попробуйте изменить размер окна браузера, чтобы увидеть изменения в реальном времени
                    </div>
                </div>
            </div>
        </div>
    )
}