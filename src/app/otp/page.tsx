'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const translations = {
  kannada: {
    title: 'OTP ನಮೂದಿಸಿ',
    description: 'ನಿಮ್ಮ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಲಾದ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ',
    button: 'ಪರಿಶೀಲಿಸಿ',
  },
  hindi: {
    title: 'ओटीपी दर्ज करें',
    description: 'आपके नंबर पर भेजा गया कोड दर्ज करें',
    button: 'सत्यापित करें',
  },
  english: {
    title: 'Enter OTP',
    description: 'Enter the code sent to your number',
    button: 'Verify',
  },
};

function OtpPageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'english') as keyof typeof translations;
  const t = translations[lang];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/login?lang=${lang}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2">
            <Input className="h-14 w-12 text-center text-2xl" maxLength={1} />
            <Input className="h-14 w-12 text-center text-2xl" maxLength={1} />
            <Input className="h-14 w-12 text-center text-2xl" maxLength={1} />
            <Input className="h-14 w-12 text-center text-2xl" maxLength={1} />
          </div>
          <Button className="w-full text-lg" size="lg" asChild>
            <Link href="/dashboard">
              {t.button}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OtpPageContent />
        </Suspense>
    )
}
