import { mockProducts } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <Card className="overflow-hidden">
        <CardHeader className="p-0">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="w-full object-cover"
                data-ai-hint={product.imageHint}
            />
        </CardHeader>
        <CardContent className="p-4 space-y-4">
            <div className="space-y-1">
                <CardTitle className="text-3xl font-bold font-headline">{product.name}</CardTitle>
                <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()}/-</p>
            </div>
            <CardDescription className="text-base text-foreground leading-relaxed">
                {product.description}
            </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
