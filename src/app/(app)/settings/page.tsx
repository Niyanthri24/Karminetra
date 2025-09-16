'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Moon, Sun, Laptop } from 'lucide-react';

const translations = {
  kannada: {
    title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    nameLabel: 'ಹೆಸರು',
    phoneLabel: 'ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    emailLabel: 'ಇಮೇಲ್',
    languageLabel: 'ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ',
    themeLabel: 'ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಾಶಸ್ತ್ಯ',
    light: 'ಬೆಳಕು',
    dark: 'ಡಾರ್ಕ್',
    system: 'ಸಿಸ್ಟಂ',
    logout: 'ಲಾಗ್ ಔಟ್',
  },
  hindi: {
    title: 'सेटिंग्स',
    nameLabel: 'नाम',
    phoneLabel: 'पंजीकृत मोबाइल नंबर',
    emailLabel: 'ईमेल',
    languageLabel: 'भाषा बदलें',
    themeLabel: 'ऐप प्राथमिकता',
    light: 'लाइट',
    dark: 'डार्क',
    system: 'सिस्टम',
    logout: 'लॉग आउट',
  },
  english: {
    title: 'Settings',
    nameLabel: 'Name',
    phoneLabel: 'Registered Mobile Number',
    emailLabel: 'Email',
    languageLabel: 'Change Language',
    themeLabel: 'App Preference',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    logout: 'Logout',
  },
};

type Theme = 'light' | 'dark' | 'system';

function SettingsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'english') as keyof typeof translations;
  const t = translations[lang];

  // State for theme, defaulting to 'system'
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    // On mount, read the theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Force a re-render to apply the theme immediately
    window.location.reload();
  }


  const handleLanguageChange = (newLang: string) => {
    router.push(`?lang=${newLang}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t.nameLabel}</Label>
            <p id="name" className="text-lg font-semibold text-muted-foreground">
              Ramu Anna
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.phoneLabel}</Label>
            <p id="phone" className="text-lg font-semibold text-muted-foreground">
              +91 11111 11111
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.emailLabel}</Label>
            <p id="email" className="text-lg font-semibold text-muted-foreground">
              ramu.anna@potterytown.com
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">{t.languageLabel}</Label>
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
                <SelectItem value="hindi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">{t.themeLabel}</Label>
            <Select value={theme} onValueChange={(value) => handleThemeChange(value as Theme)}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" /> {t.light}
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" /> {t.dark}
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4" /> {t.system}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
        {t.logout}
      </Button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPageContent />
    </Suspense>
  );
}
