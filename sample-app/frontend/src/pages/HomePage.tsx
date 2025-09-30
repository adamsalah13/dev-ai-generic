import React from 'react';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  // Mock data for demonstration
  const featuredProducts = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      rating: 4.5,
      reviewCount: 128,
      description: 'Premium quality wireless headphones with noise cancellation',
      category: 'Electronics',
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
      description: 'Track your fitness goals with this advanced smartwatch',
      category: 'Electronics',
      inStock: true
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      image: 'https://via.placeholder.com/300x300?text=T-Shirt',
      rating: 4.7,
      reviewCount: 256,
      description: 'Comfortable and sustainable organic cotton t-shirt',
      category: 'Clothing',
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
      description: 'High-quality lens for professional photography',
      category: 'Electronics',
      inStock: false
    }
  ];

  const categories = [
    { name: 'Electronics', image: 'https://via.placeholder.com/200x200?text=Electronics', count: 1234 },
    { name: 'Clothing', image: 'https://via.placeholder.com/200x200?text=Clothing', count: 856 },
    { name: 'Home & Garden', image: 'https://via.placeholder.com/200x200?text=Home', count: 642 },
    { name: 'Sports', image: 'https://via.placeholder.com/200x200?text=Sports', count: 389 },
    { name: 'Books', image: 'https://via.placeholder.com/200x200?text=Books', count: 2156 },
    { name: 'Health & Beauty', image: 'https://via.placeholder.com/200x200?text=Beauty', count: 578 }
  ];

  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
    // In a real app, this would dispatch an action or call an API
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view for product:', productId);
    // In a real app, this would open a modal or navigate to product details
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to ShopFlow
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-lg group-hover:scale-110 transition-transform"
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} items
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-semibold">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                className="group"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products,
            exclusive deals, and special offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50. Fast and reliable delivery.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600">
                100% satisfaction guarantee. Return any item within 30 days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support for all your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;