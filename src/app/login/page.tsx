'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const translations = {
  kannada: {
    title: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    description: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಲು ಮುಂದುವರಿಯಿರಿ',
    label: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    button: 'ಮುಂದುವರಿಸಿ',
  },
  hindi: {
    title: 'अपना मोबाइल नंबर दर्ज करें',
    description: 'अपने खाते में लॉग इन करने के लिए आगे बढ़ें',
    label: 'मोबाइल नंबर',
    button: 'जारी रखें',
  },
  english: {
    title: 'Enter your mobile number',
    description: 'to continue to your account',
    label: 'Mobile Number',
    button: 'Continue',
  },
};

function LoginPageContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'english') as keyof typeof translations;
  const t = translations[lang];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{t.label}</Label>
            <Input id="phone" type="tel" placeholder="+91 11111 11111" />
          </div>
          <Button className="w-full text-lg" size="lg" asChild>
            <Link href={`/otp?lang=${lang}`}>
              {t.button}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
