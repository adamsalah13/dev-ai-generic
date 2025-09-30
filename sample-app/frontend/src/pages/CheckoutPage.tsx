import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Mock cart items
  const cartItems = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      quantity: 2,
      image: 'https://via.placeholder.com/80x80?text=Headphones'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80?text=Watch'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = async () => {
    // Simulate order placement
    console.log('Placing order...', formData);
    
    // In a real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to success page or show success message
    alert('Order placed successfully!');
    navigate('/');
  };

  const validateShippingForm = () => {
    return formData.email && formData.firstName && formData.lastName && 
           formData.address && formData.city && formData.state && formData.zipCode;
  };

  const validatePaymentForm = () => {
    if (formData.paymentMethod === 'card') {
      return formData.cardNumber && formData.expiryDate && formData.cvv && formData.nameOnCard;
    }
    return true; // PayPal validation would be handled differently
  };

  const renderProgressBar = () => {
    const steps = ['shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              index <= currentIndex ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-300'
            }`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderShippingForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div></div>

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>PayPal</span>
            </label>
          </div>
        </div>

        {formData.paymentMethod === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="md:col-span-2">
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card *
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {formData.paymentMethod === 'paypal' && (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
      
      {/* Shipping Address */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
        <p className="text-gray-700">
          {formData.firstName} {formData.lastName}<br />
          {formData.address}<br />
          {formData.city}, {formData.state} {formData.zipCode}<br />
          {formData.country}
        </p>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
        <p className="text-gray-700">
          {formData.paymentMethod === 'card' ? (
            `Credit Card ending in ${formData.cardNumber.slice(-4)}`
          ) : (
            'PayPal'
          )}
        </p>
      </div>

      {/* Order Items */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
      
      {renderProgressBar()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 'shipping' && renderShippingForm()}
          {currentStep === 'payment' && renderPaymentForm()}
          {currentStep === 'review' && renderOrderReview()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 'shipping'}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep !== 'review' ? (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 'shipping' && !validateShippingForm()) ||
                  (currentStep === 'payment' && !validatePaymentForm())
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
              >
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
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
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;