import React, { useState } from 'react';

interface HistoryItem {
    id: string;
    prompt: string;
    language: string;
    timestamp: number;
    code: string;
    isFavorite?: boolean;
}

interface HistoryProps {
    items: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onToggleFavorite: (id: string) => void;
    onDelete: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ items, onSelect, onToggleFavorite, onDelete }) => {
    const [search, setSearch] = useState('');
    const [filterLanguage, setFilterLanguage] = useState<string>('all');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const filteredItems = items
        .filter((item) => {
            const matchesSearch = item.prompt.toLowerCase().includes(search.toLowerCase());
            const matchesLanguage = filterLanguage === 'all' || item.language === filterLanguage;
            const matchesFavorite = !showFavoritesOnly || item.isFavorite;
            return matchesSearch && matchesLanguage && matchesFavorite;
        })
        .sort((a, b) => {
            // Sort by favorite first, then by timestamp (newest first)
            if (a.isFavorite === b.isFavorite) {
                return b.timestamp - a.timestamp;
            }
            return a.isFavorite ? -1 : 1;
        });

    const languages = ['all', 'cpp', 'javascript', 'python', 'java', 'c'];

    return (
        <div className="w-full bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full transition-colors duration-300">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 space-y-3">
                <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">History</h2>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search history..."
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-600 transition-colors"
                />
                <div className="flex gap-2">
                    <select
                        value={filterLanguage}
                        onChange={(e) => setFilterLanguage(e.target.value)}
                        className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded px-2 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang === 'all' ? 'All Languages' : lang.toUpperCase()}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`px-3 py-1.5 rounded border text-xs font-medium transition-colors ${showFavoritesOnly
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-500'
                            : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                            }`}
                        title="Show Favorites Only"
                    >
                        ★
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredItems.length === 0 ? (
                    <div className="p-4 text-center text-neutral-500 dark:text-neutral-600 text-sm">No history found</div>
                ) : (
                    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {filteredItems.map((item) => (
                            <li key={item.id} className="group relative">
                                <button
                                    onClick={() => onSelect(item)}
                                    className="w-full text-left p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate pr-20 group-hover:text-neutral-900 dark:group-hover:text-white font-medium">
                                            {item.prompt}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs text-neutral-500 uppercase">{item.language}</span>
                                        <span className="text-xs text-neutral-400 dark:text-neutral-600">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </button>
                                <div className="absolute top-4 right-2 flex gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleFavorite(item.id);
                                        }}
                                        className={`p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${item.isFavorite ? 'text-yellow-500' : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400'
                                            }`}
                                        title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={item.isFavorite ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id);
                                        }}
                                        className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-neutral-400 dark:text-neutral-600 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete from history"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
