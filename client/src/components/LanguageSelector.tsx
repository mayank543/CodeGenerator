

interface LanguageSelectorProps {
    selected: 'cpp' | 'javascript' | 'python' | 'java' | 'c';
    onSelect: (lang: 'cpp' | 'javascript' | 'python' | 'java' | 'c') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
    const languages = ['cpp', 'javascript', 'python', 'java', 'c'] as const;

    return (
        <div className="flex space-x-2">
            <select
                value={selected}
                onChange={(e) => onSelect(e.target.value as any)}
                className="px-4 py-2 rounded-md text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 cursor-pointer transition-colors appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 0.5rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`,
                    paddingRight: `2.5rem`
                }}
            >
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};
