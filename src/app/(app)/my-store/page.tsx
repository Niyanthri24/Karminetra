'use client';
import { mockProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyStorePage() {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Pottery Store',
        text: 'Check out my handcrafted pottery!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Share link copied!",
        description: "You can now paste it in any app.",
      })
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">My Store</h1>
        <Button onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share My Store
        </Button>
      </div>

      {mockProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {mockProducts.map((product) => (
            <Link href={`/my-store/${product.id}`} key={product.id}>
                <Card className="overflow-hidden h-full">
                  <CardHeader className="p-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-auto w-full object-cover aspect-square"
                      data-ai-hint={product.imageHint}
                    />
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-base font-semibold truncate">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground truncate h-10">{product.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <p className="text-lg font-bold text-primary">{product.price.toLocaleString()}/-</p>
                  </CardFooter>
                </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-12 text-center">
            <CardHeader>
                <CardTitle>Your store is empty</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Add your first product by tapping the camera button below.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
