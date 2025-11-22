import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PromptInput } from './components/PromptInput';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeOutput } from './components/CodeOutput';
import { History } from './components/History';

export interface HistoryItem {
  id: string;
  prompt: string;
  language: string;
  timestamp: number;
  code: string;
  isFavorite?: boolean;
}

function App() {
  const [language, setLanguage] = useState<'cpp' | 'javascript' | 'python' | 'java' | 'c'>('javascript');
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state from localStorage if available
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('codegen_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('codegen_fontsize');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('codegen_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Persist history, fontSize, and theme
  useEffect(() => {
    localStorage.setItem('codegen_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('codegen_fontsize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('codegen_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleGenerate = async (promptText: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText, language }),
      });
      const data = await response.json();
      setCode(data.code);

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        prompt: promptText,
        language,
        timestamp: Date.now(),
        code: data.code,
        isFavorite: false,
      };
      setHistory((prev) => [newItem, ...prev]);
    } catch (error) {
      console.error('Error generating code:', error);
      setCode('// Error generating code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setCode(item.code);
    setLanguage(item.language as any);
    setPrompt(item.prompt);
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Layout
      theme={theme}
      onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
    >
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 h-full shadow-xl md:shadow-none
          md:static md:inset-auto
          transition-all duration-300 ease-in-out overflow-hidden
          bg-neutral-50 dark:bg-neutral-900
          ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-0'}
        `}
      >
        <div className="w-64 h-full">
          <History
            items={history}
            onSelect={handleHistorySelect}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteHistoryItem}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden transition-all duration-300">
        <div className="flex flex-col w-full md:w-1/2 gap-4 h-full min-h-0">
          <LanguageSelector selected={language} onSelect={setLanguage} />
          <div className="flex-1 min-h-0">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              favorites={history.filter(item => item.isFavorite)}
            />
          </div>
        </div>
        <div className="flex-1 w-full md:w-1/2 min-h-0">
          <CodeOutput
            code={code}
            language={language}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            theme={theme}
            onCodeChange={setCode}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
