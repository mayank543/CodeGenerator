import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    theme,
    onToggleTheme,
    isSidebarOpen,
    onToggleSidebar
}) => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans flex flex-col transition-colors duration-300">
            <header className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                        title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">CodeGen AI</h1>
                </div>
                <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    )}
                </button>
            </header>
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-73px)]">
                {children}
            </main>
        </div>
    );
};
