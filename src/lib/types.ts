export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
};

export type Order = {
  id:string;
  customerName: string;
  product: Product;
  quantity: number;
  status: 'New' | 'Shipped' | 'Completed';
};
