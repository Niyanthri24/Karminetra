'use client';

import { Suspense, useEffect, useState } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    // Only save to localStorage if the theme is not the default 'system' on initial load,
    // or if it's being actively changed.
    if(localStorage.getItem('theme') !== theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Karminetra – The Eye of the Artisan</title>
        <meta name="description" content="A smart assistant for artisans to build their online business." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "font-body antialiased",
      )} suppressHydrationWarning>
        <Suspense fallback={<div />}>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
