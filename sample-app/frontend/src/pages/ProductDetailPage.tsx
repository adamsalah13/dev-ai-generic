import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  inStock: boolean;
  inventory: number;
  discount?: number;
  specifications: Record<string, string>;
  vendor: {
    name: string;
    rating: number;
  };
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  // Mock product data
  const mockProduct: Product = {
    id: id || '1',
    name: 'Wireless Bluetooth Headphones Pro Max',
    price: 299.99,
    images: [
      'https://via.placeholder.com/600x600?text=Headphones+Front',
      'https://via.placeholder.com/600x600?text=Headphones+Side',
      'https://via.placeholder.com/600x600?text=Headphones+Back',
      'https://via.placeholder.com/600x600?text=Headphones+Case'
    ],
    rating: 4.7,
    reviewCount: 328,
    description: `Experience premium audio quality with our flagship wireless headphones. 
    Featuring advanced noise cancellation technology, these headphones deliver crystal-clear sound 
    whether you're commuting, working, or relaxing. The comfortable over-ear design ensures 
    hours of listening pleasure, while the long-lasting battery keeps your music playing all day.
    
    Key Features:
    • Active Noise Cancellation (ANC)
    • 30-hour battery life
    • Quick charge: 5 minutes = 3 hours playback
    • Premium materials and comfortable fit
    • Voice assistant integration
    • Multi-device connectivity`,
    category: 'electronics',
    inStock: true,
    inventory: 23,
    discount: 15,
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Battery Life': '30 hours (ANC on), 40 hours (ANC off)',
      'Charging Time': '2 hours (full charge)',
      'Weight': '290g',
      'Connectivity': 'Bluetooth 5.2, USB-C',
      'Noise Cancellation': 'Active (ANC)',
      'Microphone': 'Built-in with noise reduction',
      'Compatibility': 'iOS, Android, Windows, Mac'
    },
    vendor: {
      name: 'AudioTech Pro',
      rating: 4.8
    }
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Absolutely fantastic headphones! The noise cancellation is incredible and the sound quality is top-notch. Worth every penny.',
      date: '2024-12-15',
      verified: true
    },
    {
      id: '2',
      userName: 'Mike Chen',
      rating: 4,
      comment: 'Great headphones with excellent battery life. The only minor complaint is they can feel a bit heavy during long sessions.',
      date: '2024-12-10',
      verified: true
    },
    {
      id: '3',
      userName: 'Emma Johnson',
      rating: 5,
      comment: 'Perfect for my daily commute. The ANC blocks out all the subway noise. Highly recommended!',
      date: '2024-12-08',
      verified: false
    }
  ];

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setProduct(mockProduct);
    setReviews(mockReviews);
    setLoading(false);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of product ${id} to cart`);
    // In a real app, this would add to cart context
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} of product ${id}`);
    // In a real app, this would add to cart and navigate to checkout
    navigate('/checkout');
  };

  const discountedPrice = product?.discount 
    ? product.price * (1 - product.discount / 100) 
    : product?.price || 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-300 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
              Home
            </button>
          </li>
          <li>/</li>
          <li>
            <button onClick={() => navigate('/products')} className="text-blue-600 hover:text-blue-800">
              Products
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-500 capitalize">{product.category}</li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {renderStars(Math.floor(product.rating))}
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="text-sm text-gray-500">
                by {product.vendor.name}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            {product.discount && (
              <div className="text-green-600 font-medium">
                You save ${(product.price - discountedPrice).toFixed(2)}
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">
                  In Stock ({product.inventory} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-700 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.inventory}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.inventory, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-0 focus:ring-0"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free shipping on orders over $50
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-day return policy
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                1-year warranty included
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t">
        <div className="flex space-x-8 mb-6">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'reviews' && ` (${reviews.length})`}
            </button>
          ))}
        </div>

        <div className="pb-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {product.description}
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;