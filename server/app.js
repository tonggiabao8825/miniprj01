import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, products, brands, images } from './catalog.js';

const root = fileURLToPath(new URL('../', import.meta.url));
export const app = express();
app.disable('x-powered-by');

app.get('/api/catalog', (req, res) => {
  const category = req.query.category ?? 'all';
  if (!categories.some(({ id }) => id === category)) {
    return res.status(400).json({ message: 'Danh mục không hợp lệ.' });
  }
  res.json({
    categories,
    products: products.filter((p) => category === 'all' || p.category === category)
      .map(({ file, ...product }) => ({ ...product, image: `/api/images/${product.id}` })),
    brands,
    banner: '/api/images/banner',
  });
});

app.get('/api/images/:id', (req, res, next) => {
  const file = images.get(req.params.id);
  if (!file) return res.status(404).json({ message: 'Không tìm thấy ảnh.' });
  res.sendFile(path.join(root, file), { maxAge: '1h' }, (error) => {
    if (error) next(error);
  });
});
app.use('/api', (req, res) => res.status(404).json({ message: 'API không tồn tại.' }));
app.use(express.static(path.join(root, 'dist')));
app.get('/', (req, res) => res.sendFile(path.join(root, 'dist/index.html')));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({ message: 'Không thể tải tài nguyên.' });
});