import type { Product, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockProducts: Product[] = [
  { id: '1', name: 'Handcrafted Clay Pot', description: 'A beautiful, sturdy pot made from locally sourced clay.', price: 1000, imageUrl: PlaceHolderImages[0].imageUrl, imageHint: PlaceHolderImages[0].imageHint },
  { id: '2', name: 'Miniature Vase Set', description: 'A set of three miniature vases, perfect for small flowers or as decor.', price: 2200, imageUrl: PlaceHolderImages[1].imageUrl, imageHint: PlaceHolderImages[1].imageHint },
  { id: '3', name: 'Large Painted Urn', description: 'An elegant, hand-painted urn that makes a statement piece.', price: 4800, imageUrl: PlaceHolderImages[2].imageUrl, imageHint: PlaceHolderImages[2].imageHint },
  { id: '4', name: 'Earthen Tea Cup', description: 'A rustic teacup that brings a touch of earth to your morning ritual.', price: 350, imageUrl: PlaceHolderImages[3].imageUrl, imageHint: PlaceHolderImages[3].imageHint },
  { id: '5', name: 'Ornate Serving Bowl', description: 'A large, ornately decorated bowl for serving your favorite dishes.', price: 3200, imageUrl: PlaceHolderImages[4].imageUrl, imageHint: PlaceHolderImages[4].imageHint },
  { id: '6', name: 'Classic Pot Collection (Set of 5)', description: 'A set of 5 classic pots of various sizes for all your planting needs.', price: 7000, imageUrl: PlaceHolderImages[5].imageUrl, imageHint: PlaceHolderImages[5].imageHint },
];

export const mockOrders: Order[] = [
  { id: 'ord1', customerName: 'Suresh Kumar', product: mockProducts[0], quantity: 1, status: 'New' },
  { id: 'ord2', customerName: 'Priya Sharma', product: mockProducts[3], quantity: 4, status: 'New' },
  { id: 'ord3', customerName: 'Amit Singh', product: mockProducts[1], quantity: 1, status: 'Shipped' },
  { id: 'ord4', customerName: 'Deepa Iyer', product: mockProducts[2], quantity: 1, status: 'Completed' },
  { id: 'ord5', customerName: 'Rohan Patel', product: mockProducts[4], quantity: 2, status: 'Completed' },
];
