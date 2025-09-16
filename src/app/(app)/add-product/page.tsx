'use client';

import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { generateProductDetailsFromImage } from '@/ai/flows/generate-product-details-from-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader, Wand2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockProducts } from '@/lib/data';

type FlowState = 'capture' | 'loading' | 'form';
type AiResult = {
  title: string;
  description: string;
  suggestedPrice: number;
  keywords: string;
  hashtags: string;
};

// Helper to convert image URL to Base64
async function imageUrlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export default function AddProductPage() {
  const [flowState, setFlowState] = useState<FlowState>('capture');
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [image, setImage] = useState<{url: string; hint: string} | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleTakePhoto = () => {
    startTransition(async () => {
      // 1. Pick a random placeholder image
      const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
      setImage({url: randomImage.imageUrl, hint: randomImage.imageHint});
      
      // 2. Set loading state
      setFlowState('loading');
      
      try {
        // 3. Convert image to base64
        const photoDataUri = await imageUrlToBase64(randomImage.imageUrl);
        
        // 4. Call AI flow
        const result = await generateProductDetailsFromImage({
          photoDataUri,
          language: 'English',
        });
        
        // 5. Set result and move to form state
        setAiResult(result);
        setFlowState('form');
      } catch (error) {
        console.error('Error generating product details:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not generate product details. Please try again.',
        });
        setFlowState('capture'); // Reset on error
      }
    });
  };
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiResult || !image) return;

    const newProduct = {
      id: (mockProducts.length + 1).toString(),
      name: (document.getElementById('title') as HTMLInputElement).value,
      price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
      description: (document.getElementById('description') as HTMLTextAreaElement).value,
      imageUrl: image.url,
      imageHint: image.hint,
    };
    
    // Unshift to add to the beginning of the array
    mockProducts.unshift(newProduct);
    
    toast({
        title: "Product Added!",
        description: `${newProduct.name} has been added to your store.`,
    });

    router.push('/my-store');
  }

  return (
    <div className="container mx-auto max-w-2xl">
      {flowState === 'capture' && (
        <Card className="text-center">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <h2 className="text-2xl font-bold font-headline">Create New Listing</h2>
            <p className="text-muted-foreground">Start by taking a photo of your product.</p>
            <Button size="lg" onClick={handleTakePhoto} disabled={isPending}>
              <Wand2 className="mr-2 h-5 w-5" />
              Generate with AI
            </Button>
          </CardContent>
        </Card>
      )}

      {flowState === 'loading' && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {image && <Image src={image.url} alt="product photo" width={200} height={200} className="animate-pulse rounded-lg" data-ai-hint={image.hint} />}
          <Loader className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold font-headline">Karminetra is working...</h2>
          <p className="text-muted-foreground">Generating your product details.</p>
        </div>
      )}

      {flowState === 'form' && aiResult && image && (
         <form onSubmit={handleAddProduct} className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <Image
                src={image.url}
                alt={aiResult.title}
                width={600}
                height={600}
                className="mx-auto rounded-lg object-cover"
                data-ai-hint={image.hint}
              />
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={aiResult.title} />
            </div>
            <div>
              <Label htmlFor="price">Price (/-)</Label>
              <Input id="price" type="number" defaultValue={aiResult.suggestedPrice} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={aiResult.description} rows={5} />
            </div>
            <div>
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input id="hashtags" defaultValue={aiResult.hashtags} />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 pb-24">
             <Button size="lg" className="w-full text-lg" type="submit">
                Add to My Store
             </Button>
          </div>
        </form>
      )}
    </div>
  );
}
