import express from 'express';
import cors from 'cors';
import { initializeDatabase, contactQueries } from './db.js';
import authRoutes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081',
    'http://127.0.0.1:8082',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));

app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);

// Contact messages route
app.post('/api/contact-messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contactMessage = await contactQueries.create(name.trim(), email.trim(), message.trim());
    res.status(201).json({
      message: 'Contact message submitted successfully',
      contactMessage,
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`\n✓ Eventix Auth Server running on http://localhost:${PORT}`);
  console.log(`\nDemo credentials:`);
  console.log('  Email: admin@conference.com');
  console.log('  Password: admin123');
  console.log(`\nAPI: http://localhost:${PORT}/api`);
});
