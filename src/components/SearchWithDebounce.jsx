import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import useDebounce from '../hooks/useDebounce'

export default function SearchWithDebounce({ onSearch, placeholder = 'Поиск...' }) {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const inputRef = useRef(null)

    useEffect(() => {
        onSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm, onSearch])

    const clearSearch = () => {
        setSearchTerm('')
        inputRef.current.focus()
    }

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                aria-label="Поиск"
            />
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Очистить поиск"
                >
                    <X size={20} />
                </button>
            )}
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {debouncedSearchTerm !== searchTerm && searchTerm && (
                    <div className="animate-pulse">
                        <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}
            </div>
        </div>
    )
}