import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * GET /api/products
 * Get all products with optional filtering and pagination
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sortOrder as string === 'asc' ? 1 : -1;

    // Build query filter
    const filter: any = { active: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('vendor', 'name email')
      .exec();

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      active: true 
    }).populate('vendor', 'name email rating');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/products
 * Create a new product (vendors only)
 */
router.post('/', [
  auth,
  body('name').trim().isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('category').trim().isIn(['electronics', 'clothing', 'books', 'home', 'sports']).withMessage('Invalid category'),
  body('inventory').isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer'),
  body('images').isArray({ min: 1, max: 10 }).withMessage('Must provide 1-10 images'),
  body('tags').optional().isArray({ max: 10 }).withMessage('Maximum 10 tags allowed')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    // Check if user is a vendor
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ error: 'Only vendors can create products' });
    }

    // Create product
    const product = new Product({
      ...req.body,
      vendor: req.user.id,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await product.save();
    await product.populate('vendor', 'name email');

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: Object.values(error.errors).map(e => e.message) 
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/products/:id
 * Update a product (vendors can only update their own products)
 */
router.put('/:id', [
  auth,
  body('name').optional().trim().isLength({ min: 3, max: 200 }),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }),
  body('price').optional().isFloat({ min: 0.01 }),
  body('category').optional().trim().isIn(['electronics', 'clothing', 'books', 'home', 'sports']),
  body('inventory').optional().isInt({ min: 0 }),
  body('images').optional().isArray({ min: 1, max: 10 }),
  body('tags').optional().isArray({ max: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check ownership (vendors can only update their own products)
    if (req.user.role === 'vendor' && product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update product
    Object.assign(product, req.body, { updatedAt: new Date() });
    await product.save();
    await product.populate('vendor', 'name email');

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/products/:id
 * Soft delete a product
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check ownership (vendors can only delete their own products)
    if (req.user.role === 'vendor' && product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Soft delete
    product.active = false;
    product.updatedAt = new Date();
    await product.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/products/categories
 * Get all product categories with counts
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json(categories.map(cat => ({
      name: cat._id,
      count: cat.count
    })));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;