import express, { Request, Response } from 'express';
import { products } from '../data/products';

const router = express.Router();

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let filtered = [...products];

  if (category && typeof category === 'string') {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (search && typeof search === 'string') {
    const term = search.toLowerCase();
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  res.json({
    data: filtered,
    meta: {
      total: filtered.length
    }
  });
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: `Product with id ${req.params.id} was not found.`
      }
    });
  }

  res.json({ data: product });
});

export default router;