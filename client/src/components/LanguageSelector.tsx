

interface LanguageSelectorProps {
    selected: 'cpp' | 'javascript' | 'python';
    onSelect: (lang: 'cpp' | 'javascript' | 'python') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
    const languages = ['cpp', 'javascript', 'python'] as const;

    return (
        <div className="flex space-x-2">
            {languages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => onSelect(lang)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selected === lang
                        ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    );
};
