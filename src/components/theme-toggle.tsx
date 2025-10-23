'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
  
    // Prevent hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      return (
        <button className="w-8 px-0">
          <SunIcon className="h-4 w-4" />
        </button>
      );
    }
  
    return (
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all 
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 
        shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 
        focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
        aria-invalid:border-destructive border border-border bg-background hover:bg-accent hover:text-accent-foreground 
        dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }