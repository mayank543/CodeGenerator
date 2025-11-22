

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
            onChange('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Describe the code you want to generate..."
                className="flex-1 w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-base text-neutral-900 dark:text-neutral-200 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 focus:border-transparent placeholder-neutral-400 dark:placeholder-neutral-600 transition-colors"
            />
            <div className="mt-4 flex justify-end">
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
