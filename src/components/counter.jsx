import { useState } from 'react'
import { Plus, Minus, RotateCcw, TrendingUp } from 'lucide-react'

export default function Counter() {
    const [count, setCount] = useState(0)
    const [history, setHistory] = useState([0])

    const increment = () => {
        const newCount = count + 1
        setCount(newCount)
        setHistory([...history, newCount])
    }

    const decrement = () => {
        const newCount = count - 1
        setCount(newCount)
        setHistory([...history, newCount])
    }

    const reset = () => {
        setCount(0)
        setHistory([...history, 0])
    }

    return (
        <div className="py-12">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-blue-600" size={32} />
                    <h2 className="text-3xl font-bold text-gray-900">Практика 20 — useState</h2>
                </div>

                <div className="text-center mb-10">
                    <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        {count}
                    </div>
                    <p className="text-gray-600 mb-8">Текущее значение счетчика</p>

                    <div className="flex gap-4 justify-center mb-10">
                        <button
                            onClick={increment}
                            className="btn-primary flex items-center gap-2 px-8 py-4"
                        >
                            <Plus size={20} />
                            Увеличить
                        </button>
                        <button
                            onClick={decrement}
                            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700
                                     transition-all duration-300 transform hover:-translate-y-0.5
                                     active:scale-95 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <Minus size={20} />
                            Уменьшить
                        </button>
                        <button
                            onClick={reset}
                            className="btn-secondary flex items-center gap-2 px-8 py-4"
                        >
                            <RotateCcw size={20} />
                            Сброс
                        </button>
                    </div>
                </div>

                {history.length > 1 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">История изменений:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {history.map((value, index) => (
                                <div
                                    key={index}
                                    className={`px-3 py-2 rounded-lg ${
                                        index === history.length - 1
                                            ? 'bg-blue-100 text-blue-700 font-bold'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}