'use client';

import { ArrowLeft, Mic, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type AppHeaderProps = {
  title: string;
  showBackButton?: boolean;
  onMicClick: () => void;
  onSettingsClick: () => void;
};

export function AppHeader({ title, showBackButton = false, onMicClick, onSettingsClick }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {title === 'Home' ? (
             <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Karminetra Logo" width={32} height={32} className="h-8 w-auto"/>
                <span className="font-headline text-xl font-bold text-primary">Karminetra</span>
            </Link>
          ) : (
            <h1 className="font-headline text-xl font-bold text-primary">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onMicClick}>
            <Mic className="h-6 w-6" />
            <span className="sr-only">Voice Assistant</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onSettingsClick}>
            <Settings className="h-6 w-6" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
