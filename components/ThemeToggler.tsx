'use client';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const saved = localStorage.getItem('theme');
        const initialTheme = saved || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme} className="btn btn-circle border-none btn-outline text-lg">
            {theme === 'light' ? <MoonIcon className="w-5 h-5 text-yellow-11" /> : <SunIcon className="w-5 h-5" />}
        </button>
    );
}
