export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  inStock: boolean;
  discount?: number;
}

export const products: ProductSummary[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    rating: 4.5,
    reviewCount: 128,
    description: 'Premium quality wireless headphones with noise cancellation.',
    category: 'electronics',
    inStock: true,
    discount: 20
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    rating: 4.3,
    reviewCount: 89,
    description: 'Track your goals with heart rate, sleep tracking, and GPS.',
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    rating: 4.7,
    reviewCount: 256,
    description: 'Soft, sustainable fabric available in multiple colours.',
    category: 'clothing',
    inStock: true,
    discount: 15
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 449.99,
    image: 'https://via.placeholder.com/300x300?text=Camera+Lens',
    rating: 4.8,
    reviewCount: 45,
    description: 'Crisp optics with weather sealing and 3-year warranty.',
    category: 'electronics',
    inStock: false
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 59.99,
    image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
    rating: 4.6,
    reviewCount: 312,
    description: 'Non-slip premium yoga mat for all skill levels.',
    category: 'sports',
    inStock: true,
    discount: 10
  },
  {
    id: '6',
    name: 'JavaScript: The Good Parts',
    price: 34.99,
    image: 'https://via.placeholder.com/300x300?text=JS+Book',
    rating: 4.4,
    reviewCount: 189,
    description: 'Classic read for honing your JavaScript intuition.',
    category: 'books',
    inStock: true
  }
];
