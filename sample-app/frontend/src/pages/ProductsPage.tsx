import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

interface Product {
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

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Get search parameters
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'name';
  const page = parseInt(searchParams.get('page') || '1');

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      rating: 4.5,
      reviewCount: 128,
      description: 'Premium quality wireless headphones with noise cancellation',
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
      description: 'Track your fitness goals with this advanced smartwatch',
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
      description: 'Comfortable and sustainable organic cotton t-shirt',
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
      description: 'High-quality lens for professional photography',
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
      description: 'Non-slip premium yoga mat for all levels',
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
      description: 'Essential reading for JavaScript developers',
      category: 'books',
      inStock: true
    }
  ];

  useEffect(() => {
    setCurrentPage(page);
    loadProducts();
  }, [category, search, sortBy, page]);

  const loadProducts = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Filter by search
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0; // Mock sorting
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    // Pagination
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    setProducts(paginatedProducts);
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    setLoading(false);
  };

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') {
      newParams.set('page', '1'); // Reset to first page when filtering
    }
    setSearchParams(newParams);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
    // In a real app, this would add to cart context/state
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view for product:', productId);
    // In a real app, this would open a modal or navigate to product details
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Home & Garden' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {search ? `Search results for "${search}"` : 'All Products'}
        </h1>
        {category && (
          <p className="text-gray-600">
            Showing products in: <span className="font-semibold capitalize">{category}</span>
          </p>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category Filter */}
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => updateSearchParams('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex-1">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => updateSearchParams('sortBy', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(category || search || sortBy !== 'name') && (
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => updateSearchParams('page', String(currentPage - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => updateSearchParams('page', String(pageNum))}
                  className={`px-3 py-2 border rounded-md ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => updateSearchParams('page', String(currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2a2 2 0 00-2 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 00-2-2H2" />
          </svg>
          <h3 className="mt-6 text-2xl font-semibold text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;