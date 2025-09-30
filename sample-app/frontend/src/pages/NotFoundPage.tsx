import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation/Illustration */}
        <div className="mb-8">
          <div className="mx-auto h-64 w-64 flex items-center justify-center">
            <svg
              className="w-full h-full text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-500 text-lg mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go Back
          </button>
          
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go Home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Maybe you were looking for:
          </h3>
          <div className="space-y-2">
            <Link
              to="/products"
              className="block text-blue-600 hover:text-blue-500 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="block text-blue-600 hover:text-blue-500 transition-colors"
            >
              View Cart
            </Link>
            <Link
              to="/login"
              className="block text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block text-blue-600 hover:text-blue-500 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Can't find what you're looking for?
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            Try searching for products or contact our support team.
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-blue-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help? Contact us at{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-500"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-50 rounded-full opacity-50"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-50 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;