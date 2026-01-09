import React, { useState, useEffect } from 'react';
import { Settings, Palette, Check, Moon, Sun } from 'lucide-react';

const THEMES = [
  {
    id: 'cosmic',
    name: 'Cosmic',
    primary: '#6366f1', // Indigo 500
    primaryRGB: '99, 102, 241',
    primary400: '#818cf8',
    primary600: '#4f46e5',
    secondary: '#a855f7', // Purple 500
    secondary400: '#c084fc',
    aurora1: '#4338ca',
    aurora2: '#7c3aed',
    aurora3: '#db2777'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    primary: '#22d3ee', // Cyan 400
    primaryRGB: '34, 211, 238',
    primary400: '#67e8f9',
    primary600: '#06b6d4',
    secondary: '#d946ef', // Fuchsia 500
    secondary400: '#e879f9',
    aurora1: '#0e7490',
    aurora2: '#22c55e',
    aurora3: '#d946ef'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primary: '#f43f5e', // Rose 500
    primaryRGB: '244, 63, 94',
    primary400: '#fb7185',
    primary600: '#e11d48',
    secondary: '#f59e0b', // Amber 500
    secondary400: '#fbbf24',
    aurora1: '#be123c',
    aurora2: '#b45309',
    aurora3: '#7c2d12'
  },
  {
    id: 'royal',
    name: 'Royal',
    primary: '#eab308', // Yellow 500 (Gold)
    primaryRGB: '234, 179, 8',
    primary400: '#facc15',
    primary600: '#ca8a04',
    secondary: '#ef4444', // Red 500
    secondary400: '#f87171',
    aurora1: '#854d0e',
    aurora2: '#991b1b',
    aurora3: '#1e1b4b'
  }
];

interface ThemeSwitcherProps {}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const applyTheme = (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    setCurrentTheme(themeId);
    
    // Update CSS Variables directly on root
    const root = document.documentElement;
    root.style.setProperty('--primary-rgb', theme.primaryRGB);
    root.style.setProperty('--primary-400', theme.primary400);
    root.style.setProperty('--primary-500', theme.primary);
    root.style.setProperty('--primary-600', theme.primary600);
    root.style.setProperty('--secondary-400', theme.secondary400);
    root.style.setProperty('--secondary-500', theme.secondary);
    
    root.style.setProperty('--aurora-1', theme.aurora1);
    root.style.setProperty('--aurora-2', theme.aurora2);
    root.style.setProperty('--aurora-3', theme.aurora3);
  };

  return (
    <div className="fixed top-24 right-4 z-40 flex flex-col gap-3">
        {/* Toggle Dark/Light Mode */}
        <button
            id="theme-mode-btn"
            onClick={toggleDarkMode}
            className="bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:border-indigo-500 group text-slate-400 hover:text-indigo-400"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Theme Palette Settings */}
        <div className="relative">
            <button
                id="theme-settings-btn"
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-full shadow-lg hover:rotate-90 transition-all duration-500 hover:border-indigo-500 group ${isOpen ? 'rotate-90 border-indigo-500' : ''}`}
                title="Change Color Theme"
            >
                <Settings className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
            </button>

            <div className={`absolute top-0 right-14 bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl w-64 transition-all duration-300 origin-top-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
                    <Palette className="w-4 h-4 text-indigo-400" />
                    <span className="font-heading font-bold text-slate-100 text-sm">Theme Engine</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {THEMES.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => applyTheme(theme.id)}
                            className={`relative p-3 rounded-xl border transition-all flex flex-col items-center gap-2 group ${currentTheme === theme.id ? 'bg-slate-800 border-indigo-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="flex gap-1">
                                <div className="w-4 h-4 rounded-full" style={{ background: theme.primary }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ background: theme.secondary }}></div>
                            </div>
                            <span className={`text-xs font-medium ${currentTheme === theme.id ? 'text-white' : 'text-slate-500'}`}>{theme.name}</span>
                            
                            {currentTheme === theme.id && (
                                <div className="absolute top-2 right-2">
                                    <Check className="w-3 h-3 text-indigo-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ThemeSwitcher;