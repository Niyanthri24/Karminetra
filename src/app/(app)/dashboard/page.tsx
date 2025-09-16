import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders, mockProducts } from "@/lib/data";
import { Package, IndianRupee, MapPin } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const newOrdersCount = mockOrders.filter(o => o.status === 'New').length;
  const totalProducts = mockProducts.length;
  const totalRevenue = mockOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, order) => sum + order.product.price * order.quantity, 0);

  const recentActivities = [
    { text: "New order #ord2 received from Priya Sharma.", time: "10 mins ago" },
    { text: "Your product 'Handcrafted Clay Pot' is running low on stock.", time: "1 hour ago" },
    { text: "You have a new 5-star review for 'Miniature Vase Set'.", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Welcome, Ramu Anna!</h1>
        <p className="text-muted-foreground">Here&apos;s a summary of your store today.</p>
      </div>

      <Card className="overflow-hidden">
        <Image src="/shop.png" alt="Pottery Shop" width={600} height={200} className="w-full object-cover" data-ai-hint="pottery shop" />
        <CardHeader>
          <CardTitle>Ramu Anna's Pottery & Clay Crafts</CardTitle>
          <Link href="https://www.google.com/maps/search/?api=1&query=Pottery+Town+Bangalore" target="_blank" rel="noopener noreferrer">
            <CardDescription className="flex items-center gap-2 hover:text-primary hover:underline">
              <MapPin className="h-4 w-4" />
              Shop-27, Pottery Town, Bangalore
            </CardDescription>
          </Link>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newOrdersCount}</div>
            <p className="text-xs text-muted-foreground">Ready to be shipped</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <IndianRupee className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Items listed in your store</p>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-2 w-2 translate-y-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
