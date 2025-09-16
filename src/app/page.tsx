import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LanguageSelectionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <div className="mb-8">
        <Image src="/logo.png" alt="Karminetra Logo" width={180} height={45} className="mx-auto" />
        <h1 className="font-headline text-5xl font-bold text-primary mt-4">
          Karminetra
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          The Eye of the Artisan
        </p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <p className="font-semibold">Choose your language</p>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href="/login?lang=kannada">ಕನ್ನಡ</Link>
        </Button>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href="/login?lang=hindi">हिन्दी</Link>
        </Button>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href="/login?lang=english">English</Link>
        </Button>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href="/login?lang=english">Other</Link>
        </Button>
      </div>
    </div>
  );
}
