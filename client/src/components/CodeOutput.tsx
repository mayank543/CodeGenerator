import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeOutputProps {
    code: string;
    language: string;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    theme: 'light' | 'dark';
    onCodeChange: (code: string) => void;
    isLoading: boolean;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
    code,
    language,
    fontSize,
    onFontSizeChange,
    theme,
    onCodeChange,
    isLoading
}) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden transition-colors relative">
            <div className="flex justify-between items-center px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{language}</span>
                    <div className="flex items-center space-x-2 border-l border-neutral-200 dark:border-neutral-800 pl-4">
                        <span className="text-xs text-neutral-500">Font Size:</span>
                        <button
                            onClick={() => onFontSizeChange(Math.max(10, fontSize - 1))}
                            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-1"
                        >
                            -
                        </button>
                        <span className="text-xs text-neutral-700 dark:text-neutral-300 w-4 text-center">{fontSize}</span>
                        <button
                            onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
                            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-1"
                        >
                            +
                        </button>
                    </div>
                    <div className="border-l border-neutral-200 dark:border-neutral-800 pl-4">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`text-xs font-medium transition-colors ${isEditing
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                                }`}
                        >
                            {isEditing ? 'Done' : 'Edit'}
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className={`text-xs transition-colors flex items-center gap-1 ${isCopied
                        ? 'text-green-600 dark:text-green-400 font-medium'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                >
                    {isCopied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        'Copy'
                    )}
                </button>
            </div>
            <div className={`flex-1 relative ${isEditing ? 'overflow-hidden' : 'overflow-auto custom-scrollbar'}`}>
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-neutral-950/80 flex items-center justify-center z-10 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-neutral-100 rounded-full animate-spin"></div>
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Generating code...</span>
                        </div>
                    </div>
                )}
                {isEditing ? (
                    <textarea
                        value={code}
                        onChange={(e) => onCodeChange(e.target.value)}
                        className="w-full h-full p-6 bg-transparent text-neutral-900 dark:text-neutral-100 font-mono resize-none focus:outline-none overflow-auto custom-scrollbar"
                        style={{
                            fontSize: `${fontSize}px`,
                            lineHeight: '1.5',
                            fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
                        }}
                        spellCheck={false}
                    />
                ) : (
                    <SyntaxHighlighter
                        language={language}
                        style={theme === 'dark' ? vscDarkPlus : vs}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            height: '100%',
                            background: 'transparent',
                            fontSize: `${fontSize}px`,
                            lineHeight: '1.5'
                        }}
                        codeTagProps={{
                            style: {
                                fontSize: 'inherit'
                            }
                        }}
                    >
                        {code || '// Generated code will appear here'}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
};
