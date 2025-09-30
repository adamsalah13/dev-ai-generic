# API Development Guide

## 🚀 Overview

This guide covers modern API development practices using Node.js, Express, and MongoDB. Learn how to build scalable, secure, and well-documented REST APIs with AI-assisted development techniques.

## 🏗️ API Architecture

### RESTful API Design Principles

1. **Resource-Based URLs**
   - Use nouns, not verbs: `/api/products` not `/api/getProducts`
   - Use HTTP methods for actions: GET, POST, PUT, DELETE
   - Nested resources: `/api/users/123/orders`

2. **HTTP Status Codes**
   ```
   200 OK - Successful GET, PUT, PATCH
   201 Created - Successful POST
   204 No Content - Successful DELETE
   400 Bad Request - Invalid request data
   401 Unauthorized - Authentication required
   403 Forbidden - Insufficient permissions
   404 Not Found - Resource doesn't exist
   422 Unprocessable Entity - Validation errors
   500 Internal Server Error - Server error
   ```

3. **Consistent Response Format**
   ```javascript
   // Success Response
   {
     "success": true,
     "data": {
       "id": "123",
       "name": "Product Name"
     },
     "meta": {
       "timestamp": "2024-01-01T00:00:00Z",
       "requestId": "req-123"
     }
   }

   // Error Response
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid input data",
       "details": [
         {
           "field": "email",
           "message": "Invalid email format"
         }
       ]
     },
     "meta": {
       "timestamp": "2024-01-01T00:00:00Z",
       "requestId": "req-123"
     }
   }
   ```

## 🛠️ API Implementation

### Express.js Setup

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version,
    timestamp: new Date().toISOString()
  });
});

export default app;
```

### Route Organization

```javascript
// routes/index.js
import express from 'express';
import userRoutes from './users.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';

const router = express.Router();

// API versioning
router.use('/v1/users', userRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/orders', orderRoutes);

export default router;
```

### Product API Example

```javascript
// routes/products.js
import express from 'express';
import { body, query, param } from 'express-validator';
import { ProductController } from '../controllers/ProductController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { cache } from '../middleware/cache.js';

const router = express.Router();
const productController = new ProductController();

// Get all products with filtering and pagination
router.get('/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('category').optional().isMongoId(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('search').optional().isLength({ min: 1, max: 100 }),
    query('sortBy').optional().isIn(['name', 'price', 'rating', 'createdAt']),
    query('sortOrder').optional().isIn(['asc', 'desc'])
  ],
  validate,
  cache(300), // Cache for 5 minutes
  productController.getProducts
);

// Get single product
router.get('/:id',
  [param('id').isMongoId()],
  validate,
  cache(600), // Cache for 10 minutes
  productController.getProduct
);

// Create product (admin only)
router.post('/',
  authenticate,
  authorize(['admin']),
  [
    body('name').isLength({ min: 3, max: 100 }).trim(),
    body('description').isLength({ min: 10, max: 1000 }).trim(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').isMongoId(),
    body('images').optional().isArray({ max: 5 }),
    body('images.*.url').isURL(),
    body('images.*.alt').optional().isLength({ max: 100 })
  ],
  validate,
  productController.createProduct
);

// Update product (admin only)
router.put('/:id',
  authenticate,
  authorize(['admin']),
  [
    param('id').isMongoId(),
    body('name').optional().isLength({ min: 3, max: 100 }).trim(),
    body('description').optional().isLength({ min: 10, max: 1000 }).trim(),
    body('price').optional().isFloat({ min: 0 }),
    body('categoryId').optional().isMongoId()
  ],
  validate,
  productController.updateProduct
);

// Delete product (admin only)
router.delete('/:id',
  authenticate,
  authorize(['admin']),
  [param('id').isMongoId()],
  validate,
  productController.deleteProduct
);

// Product reviews
router.post('/:id/reviews',
  authenticate,
  [
    param('id').isMongoId(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').isLength({ min: 10, max: 500 }).trim()
  ],
  validate,
  productController.addReview
);

export default router;
```

### Controller Implementation

```javascript
// controllers/ProductController.js
import { ProductService } from '../services/ProductService.js';
import { CacheService } from '../services/CacheService.js';
import { responseHandler } from '../utils/responseHandler.js';

export class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.cacheService = new CacheService();
  }

  getProducts = async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 20,
        category,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const filters = {};
      if (category) filters.category = category;
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
      }
      if (search) {
        filters.$text = { $search: search };
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
      };

      const result = await this.productService.getProducts(filters, options);
      
      responseHandler.success(res, result, {
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: result.pages
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      
      if (!product) {
        return responseHandler.notFound(res, 'Product not found');
      }

      responseHandler.success(res, product);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      
      // Clear related caches
      await this.cacheService.invalidatePattern('products:*');
      
      responseHandler.created(res, product);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const product = await this.productService.updateProduct(id, updates);
      
      if (!product) {
        return responseHandler.notFound(res, 'Product not found');
      }

      // Clear related caches
      await this.cacheService.invalidatePattern(`products:*`);
      await this.cacheService.invalidate(`product:${id}`);
      
      responseHandler.success(res, product);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);
      
      if (!deleted) {
        return responseHandler.notFound(res, 'Product not found');
      }

      // Clear related caches
      await this.cacheService.invalidatePattern('products:*');
      await this.cacheService.invalidate(`product:${id}`);
      
      responseHandler.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  addReview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user.id;

      const review = await this.productService.addReview(id, {
        userId,
        rating,
        comment
      });

      // Clear product cache to reflect new rating
      await this.cacheService.invalidate(`product:${id}`);
      
      responseHandler.created(res, review);
    } catch (error) {
      next(error);
    }
  };
}
```

### Service Layer

```javascript
// services/ProductService.js
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Review } from '../models/Review.js';

export class ProductService {
  async getProducts(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 20,
      sort = { createdAt: -1 }
    } = options;

    const skip = (page - 1) * limit;

    // Build aggregation pipeline
    const pipeline = [
      { $match: filters },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $addFields: {
          category: { $arrayElemAt: ['$categoryInfo', 0] }
        }
      },
      {
        $project: {
          categoryInfo: 0,
          __v: 0
        }
      },
      { $sort: sort },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit }
          ],
          totalCount: [
            { $count: 'count' }
          ]
        }
      }
    ];

    const [result] = await Product.aggregate(pipeline);
    const products = result.data;
    const total = result.totalCount[0]?.count || 0;
    const pages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1
      }
    };
  }

  async getProductById(id) {
    return Product.findById(id)
      .populate('category', 'name description')
      .populate({
        path: 'reviews',
        select: 'rating comment user createdAt',
        populate: {
          path: 'user',
          select: 'name avatar'
        },
        options: {
          sort: { createdAt: -1 },
          limit: 10
        }
      })
      .lean();
  }

  async createProduct(productData) {
    // Verify category exists
    const category = await Category.findById(productData.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const product = new Product({
      ...productData,
      category: productData.categoryId
    });

    return product.save();
  }

  async updateProduct(id, updates) {
    if (updates.categoryId) {
      const category = await Category.findById(updates.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
      updates.category = updates.categoryId;
      delete updates.categoryId;
    }

    return Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
  }

  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      return false;
    }

    // Delete associated reviews
    await Review.deleteMany({ product: id });
    
    await Product.findByIdAndDelete(id);
    return true;
  }

  async addReview(productId, reviewData) {
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: reviewData.userId
    });

    if (existingReview) {
      throw new Error('You have already reviewed this product');
    }

    const review = new Review({
      ...reviewData,
      product: productId,
      user: reviewData.userId
    });

    await review.save();

    // Update product rating
    await this.updateProductRating(productId);

    return review;
  }

  async updateProductRating(productId) {
    const stats = await Review.aggregate([
      { $match: { product: mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        'ratings.average': Math.round(stats[0].averageRating * 10) / 10,
        'ratings.count': stats[0].totalReviews
      });
    }
  }
}
```

## 🔒 API Security

### Authentication Middleware

```javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { responseHandler } from '../utils/responseHandler.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      return responseHandler.unauthorized(res, 'Access token required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return responseHandler.unauthorized(res, 'Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return responseHandler.unauthorized(res, 'Token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      return responseHandler.unauthorized(res, 'Invalid token');
    }
    next(error);
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseHandler.unauthorized(res, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      return responseHandler.forbidden(res, 'Insufficient permissions');
    }

    next();
  };
};

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};
```

### Input Validation

```javascript
// middleware/validation.js
import { validationResult } from 'express-validator';
import { responseHandler } from '../utils/responseHandler.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    return responseHandler.validationError(res, 'Validation failed', formattedErrors);
  }

  next();
};

// Custom validators
export const customValidators = {
  isStrongPassword: (value) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
  },

  isValidPhoneNumber: (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(value);
  }
};
```

## 📝 API Documentation

### OpenAPI/Swagger Documentation

```javascript
// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShopFlow API',
      version: '1.0.0',
      description: 'E-commerce API for ShopFlow application',
      contact: {
        name: 'API Support',
        email: 'api-support@shopflow.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      },
      {
        url: 'https://api.shopflow.com/v1',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'categoryId'],
          properties: {
            id: {
              type: 'string',
              description: 'Product ID'
            },
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Product name'
            },
            description: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
              description: 'Product description'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Product price'
            },
            categoryId: {
              type: 'string',
              description: 'Category ID'
            },
            images: {
              type: 'array',
              maxItems: 5,
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string', format: 'uri' },
                  alt: { type: 'string', maxLength: 100 }
                }
              }
            },
            ratings: {
              type: 'object',
              properties: {
                average: { type: 'number', minimum: 0, maximum: 5 },
                count: { type: 'integer', minimum: 0 }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
  }));
};
```

### Route Documentation Examples

```javascript
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer }
 *                         limit: { type: integer }
 *                         total: { type: integer }
 *                         pages: { type: integer }
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
```

## 🧪 API Testing

### Unit Testing with Jest

```javascript
// __tests__/services/ProductService.test.js
import { ProductService } from '../../services/ProductService.js';
import { Product } from '../../models/Product.js';
import { Category } from '../../models/Category.js';

jest.mock('../../models/Product.js');
jest.mock('../../models/Category.js');

describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService();
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const categoryData = { _id: 'category123', name: 'Electronics' };
      const productData = {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999.99,
        categoryId: 'category123'
      };

      Category.findById.mockResolvedValue(categoryData);
      Product.prototype.save = jest.fn().mockResolvedValue({
        ...productData,
        _id: 'product123',
        category: 'category123'
      });

      const result = await productService.createProduct(productData);

      expect(Category.findById).toHaveBeenCalledWith('category123');
      expect(result.name).toBe(productData.name);
      expect(result.price).toBe(productData.price);
    });

    it('should throw error if category not found', async () => {
      const productData = {
        name: 'Laptop',
        categoryId: 'nonexistent'
      };

      Category.findById.mockResolvedValue(null);

      await expect(productService.createProduct(productData))
        .rejects.toThrow('Category not found');
    });
  });
});
```

### Integration Testing

```javascript
// __tests__/integration/products.test.js
import request from 'supertest';
import app from '../../app.js';
import { connectDB, closeDB, clearDB } from '../utils/database.js';

describe('Product API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  describe('GET /api/v1/products', () => {
    it('should return empty array when no products exist', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.products).toEqual([]);
      expect(response.body.data.pagination.total).toBe(0);
    });

    it('should return products with pagination', async () => {
      // Create test data
      const category = await Category.create({
        name: 'Electronics',
        description: 'Electronic devices'
      });

      const products = await Product.create([
        {
          name: 'Laptop',
          description: 'High-performance laptop',
          price: 999.99,
          category: category._id
        },
        {
          name: 'Mouse',
          description: 'Wireless mouse',
          price: 29.99,
          category: category._id
        }
      ]);

      const response = await request(app)
        .get('/api/v1/products?limit=1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.products).toHaveLength(1);
      expect(response.body.data.pagination.total).toBe(2);
      expect(response.body.data.pagination.pages).toBe(2);
    });
  });

  describe('POST /api/v1/products', () => {
    it('should create product with valid data and admin auth', async () => {
      const adminToken = await generateAdminToken();
      const category = await Category.create({
        name: 'Electronics',
        description: 'Electronic devices'
      });

      const productData = {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 599.99,
        categoryId: category._id.toString()
      };

      const response = await request(app)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(productData.name);
      expect(response.body.data.price).toBe(productData.price);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/products')
        .send({ name: 'Test' })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Access token required');
    });
  });
});
```

## 📊 API Monitoring

### Performance Monitoring

```javascript
// middleware/monitoring.js
import prometheus from 'prom-client';

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

export const monitoringMiddleware = (req, res, next) => {
  const start = Date.now();
  
  activeConnections.inc();
  
  // Override res.end to capture metrics
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
    
    activeConnections.dec();
    
    originalEnd.call(this, ...args);
  };
  
  next();
};

// Metrics endpoint
export const metricsHandler = async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
};
```

### Health Check

```javascript
// utils/healthCheck.js
import mongoose from 'mongoose';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const healthCheck = async () => {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {}
  };

  // Check MongoDB
  try {
    await mongoose.connection.db.admin().ping();
    status.services.mongodb = { status: 'healthy' };
  } catch (error) {
    status.status = 'unhealthy';
    status.services.mongodb = { status: 'unhealthy', error: error.message };
  }

  // Check Redis
  try {
    await redis.ping();
    status.services.redis = { status: 'healthy' };
  } catch (error) {
    status.status = 'unhealthy';
    status.services.redis = { status: 'unhealthy', error: error.message };
  }

  // Check memory usage
  const memUsage = process.memoryUsage();
  status.services.memory = {
    status: memUsage.heapUsed < 500 * 1024 * 1024 ? 'healthy' : 'warning',
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`
  };

  return status;
};
```

## 🚀 API Deployment

### Production Configuration

```javascript
// config/production.js
export const productionConfig = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false
    }
  },
  redis: {
    url: process.env.REDIS_URL,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h'
  }
};
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["npm", "start"]
```

---

**Next Steps**: Implement these patterns in your API development and test thoroughly before deployment.