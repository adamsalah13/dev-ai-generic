import React, { useState } from 'react';
import CartItem from '../components/CartItem';

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99, // Discounted price
      quantity: 2,
      image: 'https://via.placeholder.com/200x200?text=Headphones',
      maxQuantity: 10
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      quantity: 1,
      image: 'https://via.placeholder.com/200x200?text=Smart+Watch',
      maxQuantity: 5
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 25.49, // Discounted price
      quantity: 3,
      image: 'https://via.placeholder.com/200x200?text=T-Shirt',
      maxQuantity: 20
    }
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    // In a real app, this would navigate to checkout page
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Start shopping to add items to your cart.</p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-4 py-6 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Items in your cart</h2>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <button className="text-blue-600 hover:text-blue-500 font-medium">
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    🎉 You qualified for free shipping!
                  </div>
                )}
                
                {shipping > 0 && (
                  <div className="text-sm text-gray-500">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="promo-code"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter code"
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              {/* Security Icons */}
              <div className="mt-6 text-center">
                <div className="text-xs text-gray-500 mb-2">Secure checkout powered by</div>
                <div className="flex justify-center space-x-4">
                  <div className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">
                    SSL
                  </div>
                  <div className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">
                    256-bit
                  </div>
                  <div className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">
                    Encrypted
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">You might also like</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/60x60?text=Product"
                    alt="Recommended product"
                    className="w-15 h-15 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Wireless Charger</h4>
                    <p className="text-sm text-gray-500">$24.99</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-blue-500">
                    Add
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/60x60?text=Product"
                    alt="Recommended product"
                    className="w-15 h-15 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Phone Case</h4>
                    <p className="text-sm text-gray-500">$19.99</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-blue-500">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;