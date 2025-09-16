'use client';

import { useState } from 'react';
import { mockOrders as initialOrders } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function OrderCard({ order, onMarkAsShipped }: { order: Order; onMarkAsShipped: (orderId: string) => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <Image
          src={order.product.imageUrl}
          alt={order.product.name}
          width={80}
          height={80}
          className="aspect-square rounded-md object-cover"
          data-ai-hint={order.product.imageHint}
        />
        <div className="flex-1 space-y-1">
          <h3 className="text-base font-semibold">{order.product.name}</h3>
          <p className="text-sm text-muted-foreground">Customer: {order.customerName}</p>
          <p className="text-sm font-medium">Quantity: {order.quantity}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="text-lg font-bold text-primary">{(order.product.price * order.quantity).toLocaleString()}/-</div>
        {order.status === 'New' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4"/>
              Contact
            </Button>
            <Button size="sm" onClick={() => onMarkAsShipped(order.id)}>Mark as Shipped</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function OrderList({ orders, onMarkAsShipped }: { orders: Order[]; onMarkAsShipped: (orderId: string) => void }) {
  if (orders.length === 0) {
    return <p className="mt-4 text-center text-muted-foreground">No orders in this category.</p>;
  }
  return (
    <div className="space-y-4">
      {orders.map(order => <OrderCard key={order.id} order={order} onMarkAsShipped={onMarkAsShipped} />)}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { toast } = useToast();

  const handleMarkAsShipped = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'Shipped' } : order
      )
    );
    toast({
        title: "Order Updated",
        description: `Order #${orderId.replace('ord', '')} has been marked as shipped.`,
    });
  };

  const newOrders = orders.filter(o => o.status === 'New');
  const shippedOrders = orders.filter(o => o.status === 'Shipped');
  const completedOrders = orders.filter(o => o.status === 'Completed');

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Orders</h1>
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">
            New <Badge className="ml-2">{newOrders.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <OrderList orders={newOrders} onMarkAsShipped={handleMarkAsShipped} />
        </TabsContent>
        <TabsContent value="shipped" className="mt-4">
          <OrderList orders={shippedOrders} onMarkAsShipped={handleMarkAsShipped} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <OrderList orders={completedOrders} onMarkAsShipped={handleMarkAsShipped} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
