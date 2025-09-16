'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavBar } from '@/components/BottomNavBar';
import { Button } from '@/components/ui/button';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { cn } from '@/lib/utils';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Home',
  '/my-store': 'My Products',
  '/orders': 'Orders',
  '/add-product': 'Add New Product',
  '/settings': 'Settings',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const getTitle = () => {
    if (pathname.startsWith('/my-store/')) {
        return 'Product Details';
    }
    return pageTitles[pathname] || 'Karminetra';
  }

  const title = getTitle();
  const showBackButton = !['/dashboard', '/my-store', '/orders'].includes(pathname);
  
  const showFab = ['/dashboard', '/my-store', '/orders'].includes(pathname);
  const lang = searchParams.get('lang') || 'english';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader
        title={title}
        showBackButton={showBackButton}
        onMicClick={() => setIsVoiceModalOpen(true)}
        onSettingsClick={() => router.push(`/settings?lang=${lang}`)}
      />
      <main className="px-4 pb-28 pt-20">{children}</main>

      {showFab && (
        <div className="fixed bottom-24 right-6 z-30">
            <Button asChild className="h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90">
                <Link href="/add-product">
                    <Camera className="h-8 w-8" />
                    <span className="sr-only">Add Product</span>
                </Link>
            </Button>
        </div>
      )}

      <BottomNavBar />
      <VoiceAssistantModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} language={lang}/>
    </div>
  );
}
