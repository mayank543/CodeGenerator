
import { useState, useRef, useEffect } from 'react';


interface HistoryItem {
    id: string;
    prompt: string;
    language: string;
    timestamp: number;
    code: string;
    isFavorite?: boolean;
}

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    favorites: HistoryItem[];
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading, favorites }) => {
    const [showFavorites, setShowFavorites] = useState(false);
    const favoritesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
                setShowFavorites(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
            onChange('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                onSubmit(value);
                onChange('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden relative">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the code you want to generate..."
                className="flex-1 w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-base text-neutral-900 dark:text-neutral-200 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 focus:border-transparent placeholder-neutral-400 dark:placeholder-neutral-600 transition-colors"
            />
            <div className="mt-4 flex justify-between items-center">
                <div className="relative" ref={favoritesRef}>
                    <button
                        type="button"
                        onClick={() => setShowFavorites(!showFavorites)}
                        className="px-3 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-2"
                        title="Use a favorite prompt"
                    >
                        <span className="text-yellow-500">★</span>
                        Favourites
                    </button>
                    {showFavorites && (
                        <div className="absolute bottom-full left-0 mb-2 w-64 max-h-48 overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-20">
                            {favorites.length === 0 ? (
                                <div className="p-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">No favorite prompts yet</div>
                            ) : (
                                <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {favorites.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onChange(item.prompt);
                                                    setShowFavorites(false);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors truncate"
                                            >
                                                {item.prompt}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !value.trim()}
                    className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Generating...' : 'Generate Code'}
                </button>
            </div>
        </form>
    );
};
