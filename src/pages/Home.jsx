import { Link } from 'react-router-dom'
import { Rocket, Code, Zap, Shield, Globe, Terminal } from 'lucide-react'

export default function Home() {
    const features = [
        {
            icon: <Code className="text-blue-600" size={24} />,
            title: "useState",
            description: "Управление состоянием компонентов",
            color: "from-blue-100 to-blue-50",
            practice: 20
        },
        {
            icon: <Zap className="text-purple-600" size={24} />,
            title: "useEffect",
            description: "Побочные эффекты и жизненный цикл",
            color: "from-purple-100 to-purple-50",
            practice: 21
        },
        {
            icon: <Shield className="text-green-600" size={24} />,
            title: "LocalStorage",
            description: "Работа с локальным хранилищем",
            color: "from-green-100 to-green-50",
            practice: 22
        },
        {
            icon: <Globe className="text-orange-600" size={24} />,
            title: "API запросы",
            description: "Fetch и обработка данных",
            color: "from-orange-100 to-orange-50",
            practice: 24
        },
        {
            icon: <Terminal className="text-red-600" size={24} />,
            title: "Формы",
            description: "Валидация и управление формами",
            color: "from-red-100 to-red-50",
            practice: 25
        },
        {
            icon: <Rocket className="text-indigo-600" size={24} />,
            title: "Material-UI",
            description: "Компоненты Material Design",
            color: "from-indigo-100 to-indigo-50",
            practice: 26
        }
    ]

    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                    <Rocket className="text-blue-600 animate-float" size={48} />
                    <h1 className="page-title bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        React Практикум
                    </h1>
                </div>
                <p className="page-subtitle">
                    Освойте современный React на практике. От базовых хуков до продвинутых паттернов.
                </p>
                <div className="flex gap-4 justify-center mt-8">
                    <Link to="/form" className="btn-primary">
                        Начать практику
                    </Link>
                    <Link to="/about" className="btn-secondary">
                        О проекте
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                    <Link
                        key={index}
                        to={feature.practice ? `/practice${feature.practice}` : '/'}
                        className={`bg-gradient-to-br ${feature.color} border border-gray-200 rounded-xl p-6 card-hover`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                                <span className="badge bg-white text-gray-700 border">
                  Занятие {feature.practice}
                </span>
                            </div>
                        </div>
                        <p className="text-gray-600">{feature.description}</p>
                    </Link>
                ))}
            </div>

            <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Что вы освоите?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ul className="space-y-3">
                            {['Хуки React', 'Работа с API', 'Маршрутизация', 'Стейт-менеджмент'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-3">
                            {['Валидация форм', 'Material UI', 'Оптимизация', 'Лучшие практики'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}