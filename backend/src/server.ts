import express from 'express';
import cors from 'cors';
import charactersRouter from './routes/characters';

const app = express();
const PORT = process.env['PORT'] ?? 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/characters', charactersRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
