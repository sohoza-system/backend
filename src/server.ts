import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import postRoutes from './routes/post.routes.js';
import contactRoutes from './routes/contact.routes.js';
import express from 'express';


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
