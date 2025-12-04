import { useState, useEffect } from 'react'
import { Save, Link, Calendar, Hash, AlertCircle, ExternalLink, Tag } from 'lucide-react'

export default function TechnologyFormAdvanced({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        priority: initialData.priority || 'medium',
        estimatedHours: initialData.estimatedHours || 10,
        resources: initialData.resources || [''],
        tags: initialData.tags || []
    })

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [newTag, setNewTag] = useState('')

    const validateForm = () => {
        const newErrors = {}

        // Валидация названия
        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно'
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Минимум 2 символа'
        } else if (formData.title.trim().length > 100) {
            newErrors.title = 'Максимум 100 символов'
        }

        // Валидация описания
        if (!formData.description.trim()) {
            newErrors.description = 'Описание обязательно'
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Минимум 10 символов'
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Максимум 500 символов'
        }

        // Валидация дедлайна
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом'
            }
        }

        // Валидация часов
        if (formData.estimatedHours < 1) {
            newErrors.estimatedHours = 'Минимум 1 час'
        } else if (formData.estimatedHours > 500) {
            newErrors.estimatedHours = 'Максимум 500 часов'
        }

        // Валидация URL ресурсов
        formData.resources.forEach((resource, index) => {
            if (resource.trim() && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Некорректный URL (должен начинаться с http:// или https://)'
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    useEffect(() => {
        validateForm()
    }, [formData])

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }))
        setTouched(prev => ({ ...prev, [name]: true }))
    }

    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources]
        newResources[index] = value
        setFormData(prev => ({ ...prev, resources: newResources }))
    }

    const addResource = () => {
        setFormData(prev => ({ ...prev, resources: [...prev.resources, ''] }))
    }

    const removeResource = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, resources: newResources }))
        }
    }

    const addTag = () => {
        const trimmedTag = newTag.trim()
        if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 10) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }))
            setNewTag('')
        }
    }

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(r => r.trim() !== '')
            }
            if (onSave) {
                onSave(cleanedData)
            } else {
                alert('Данные сохранены: ' + JSON.stringify(cleanedData, null, 2))
            }
        }
    }

    const handleCancel = () => {
        if (onCancel) onCancel()
        else window.history.back()
    }

    return (
        <div className="py-12">
            <div className="glass-card dark:bg-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Hash className="text-purple-600 dark:text-purple-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {initialData.title ? 'Редактирование' : 'Добавление технологии'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Расширенная форма с дополнительными полями
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Название */}
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Название технологии *
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                                errors.title && touched.title
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="React, Node.js, MongoDB"
                            aria-required="true"
                            aria-invalid={!!errors.title}
                            aria-describedby={errors.title ? 'title-error' : undefined}
                        />
                        {errors.title && (
                            <div id="title-error" className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400" role="alert">
                                <AlertCircle size={16} />
                                <span className="text-sm">{errors.title}</span>
                            </div>
                        )}
                    </div>

                    {/* Описание */}
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Описание *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                                errors.description && touched.description
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="Описание технологии..."
                            aria-required="true"
                            aria-invalid={!!errors.description}
                            aria-describedby={errors.description ? 'description-error' : undefined}
                        />
                        {errors.description && (
                            <div id="description-error" className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400" role="alert">
                                <AlertCircle size={16} />
                                <span className="text-sm">{errors.description}</span>
                            </div>
                        )}
                        <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {formData.description.length}/500 символов
                        </div>
                    </div>

                    {/* Категория и сложность */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Категория *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                aria-required="true"
                            >
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="database">База данных</option>
                                <option value="devops">DevOps</option>
                                <option value="mobile">Мобильная разработка</option>
                                <option value="ai">Искусственный интеллект</option>
                                <option value="cloud">Облачные технологии</option>
                                <option value="tools">Инструменты</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Сложность *
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                aria-required="true"
                            >
                                <option value="beginner">Начинающий (1-20 часов)</option>
                                <option value="intermediate">Средний (20-50 часов)</option>
                                <option value="advanced">Продвинутый (50-100 часов)</option>
                                <option value="expert">Эксперт (100+ часов)</option>
                            </select>
                        </div>
                    </div>

                    {/* Приоритет и часы */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Приоритет
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="low">Низкий</option>
                                <option value="medium">Средний</option>
                                <option value="high">Высокий</option>
                                <option value="critical">Критический</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Оценочное время (часы)
                            </label>
                            <input
                                type="number"
                                name="estimatedHours"
                                value={formData.estimatedHours}
                                onChange={handleChange}
                                min="1"
                                max="500"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                                    errors.estimatedHours
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                aria-invalid={!!errors.estimatedHours}
                                aria-describedby={errors.estimatedHours ? 'hours-error' : undefined}
                            />
                            {errors.estimatedHours && (
                                <div id="hours-error" className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400" role="alert">
                                    <AlertCircle size={16} />
                                    <span className="text-sm">{errors.estimatedHours}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Дедлайн */}
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Дедлайн
                        </label>
                        <div className="flex items-center gap-3">
                            <Calendar className="text-gray-400" size={20} />
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                                    errors.deadline
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                aria-invalid={!!errors.deadline}
                                aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                            />
                        </div>
                        {errors.deadline && (
                            <div id="deadline-error" className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400" role="alert">
                                <AlertCircle size={16} />
                                <span className="text-sm">{errors.deadline}</span>
                            </div>
                        )}
                    </div>

                    {/* Теги */}
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Теги
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Добавить тег..."
                                maxLength={20}
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                disabled={!newTag.trim() || formData.tags.length >= 10}
                                className={`px-4 py-3 rounded-lg transition-colors ${
                                    !newTag.trim() || formData.tags.length >= 10
                                        ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                                        : 'bg-green-500 hover:bg-green-600'
                                } text-white`}
                            >
                                Добавить
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm flex items-center gap-2">
                                    <Tag size={12} />
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        aria-label={`Удалить тег ${tag}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {formData.tags.length === 0 && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    Добавьте теги для лучшей организации
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formData.tags.length}/10 тегов
                        </div>
                    </div>

                    {/* Ресурсы */}
                    <div>
                        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ресурсы для изучения
                        </label>
                        <div className="space-y-3">
                            {formData.resources.map((resource, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        value={resource}
                                        onChange={(e) => handleResourceChange(index, e.target.value)}
                                        className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                                            errors[`resource_${index}`]
                                                ? 'border-red-500 dark:border-red-400'
                                                : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="https://example.com/learn"
                                        aria-invalid={!!errors[`resource_${index}`]}
                                        aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
                                    />
                                    {formData.resources.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeResource(index)}
                                            className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                                            aria-label={`Удалить ресурс ${index + 1}`}
                                        >
                                            Удалить
                                        </button>
                                    )}
                                    {errors[`resource_${index}`] && (
                                        <div id={`resource-${index}-error`} className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400" role="alert">
                                            <AlertCircle size={16} />
                                            <span className="text-sm">{errors[`resource_${index}`]}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addResource}
                                className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                                <Link size={20} />
                                Добавить ресурс
                            </button>
                        </div>
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                                Object.keys(errors).length > 0
                                    ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                                    : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
                            } text-white`}
                        >
                            <Save size={20} />
                            Сохранить технологию
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-8 py-4 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg font-medium transition-all duration-300"
                        >
                            Отмена
                        </button>
                    </div>

                    {/* Статус валидации */}
                    <div className="text-sm text-gray-500 dark:text-gray-400" role="status">
                        {Object.keys(errors).length === 0 ? (
                            <span className="text-green-600 dark:text-green-400">✓ Все поля заполнены корректно</span>
                        ) : (
                            <span className="text-red-600 dark:text-red-400">⚠ Исправьте ошибки в форме</span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}