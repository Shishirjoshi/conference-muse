import express from 'express';
import bcryptjs from 'bcryptjs';
import { generateToken, verifyToken } from './auth.js';
import { userQueries, bookingQueries } from './db.js';

const router = express.Router();

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = payload;
  next();
}

// Middleware to check if user is admin
function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await userQueries.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/verify
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const user = await userQueries.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userQueries.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
  // Token invalidation would typically be done with a token blacklist
  // For now, just return success - frontend should clear the token
  res.json({ message: 'Logged out successfully' });
});

// ADMIN ROUTES

// GET /api/auth/users - Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await userQueries.getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// POST /api/auth/users - Create new user
router.post('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { email, username, password, fullName, role } = req.body;

    if (!email || !username || !password || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['admin', 'participant'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existingEmail = await userQueries.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const existingUsername = await userQueries.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await userQueries.create(email, username, hashedPassword, fullName);

    if (role === 'admin') {
      await userQueries.updateUserRole(newUser.id, 'admin');
    }

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        fullName: newUser.full_name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/auth/users/:id - Update user
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, username, fullName, role, password } = req.body;

    const user = await userQueries.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = {};
    if (email && email !== user.email) {
      const existing = await userQueries.findByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      updates.email = email;
    }

    if (username && username !== user.username) {
      const existing = await userQueries.findByUsername(username);
      if (existing) {
        return res.status(409).json({ error: 'Username already in use' });
      }
      updates.username = username;
    }

    if (fullName) updates.full_name = fullName;
    if (password) updates.password = bcryptjs.hashSync(password, 10);
    if (role && ['admin', 'participant'].includes(role)) {
      await userQueries.updateUserRole(userId, role);
    }

    if (Object.keys(updates).length > 0) {
      await userQueries.update(userId, updates);
    }

    const updatedUser = await userQueries.findById(userId);
    res.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        fullName: updatedUser.full_name,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/auth/users/:id - Delete user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await userQueries.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting the demo admin
    if (user.email === 'admin@conference.com') {
      return res.status(403).json({ error: 'Cannot delete demo admin user' });
    }

    await userQueries.delete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// BOOKING ROUTES

// GET /api/bookings - Get user's bookings
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await bookingQueries.getByUserId(req.user.id);
    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// POST /api/bookings - Create booking
router.post('/bookings', authMiddleware, async (req, res) => {
  try {
    const { conferenceId } = req.body;

    if (!conferenceId) {
      return res.status(400).json({ error: 'Conference ID is required' });
    }

    const existing = await bookingQueries.findByUserAndConference(req.user.id, conferenceId);
    if (existing) {
      return res.status(409).json({ error: 'Already booked for this conference' });
    }

    const booking = await bookingQueries.create(req.user.id, conferenceId);
    res.status(201).json({ booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// DELETE /api/bookings/:conferenceId - Cancel booking
router.delete('/bookings/:conferenceId', authMiddleware, async (req, res) => {
  try {
    const conferenceId = req.params.conferenceId;
    await bookingQueries.deleteByUserAndConference(req.user.id, conferenceId);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router;
