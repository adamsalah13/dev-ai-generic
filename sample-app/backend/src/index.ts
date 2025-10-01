import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import productsRouter from './routes/products';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'shopflow-backend', timestamp: new Date().toISOString() });
});

app.use('/api/products', productsRouter);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
