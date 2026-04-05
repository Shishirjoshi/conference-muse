import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'conference.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
});

// Promisify database operations
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID });
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

const dbExec = (sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Initialize database schema
export async function initializeDatabase() {
  // Create users table
  await dbExec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'participant' CHECK(role IN ('admin', 'participant')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create bookings table
  await dbExec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      conference_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed' CHECK(status IN ('pending', 'confirmed', 'cancelled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, conference_id)
    )
  `);

  // Create contact messages table
  await dbExec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create seed data - demo admin user
  const adminExists = await dbGet('SELECT * FROM users WHERE email = ?', ['admin@conference.com']);
  if (!adminExists) {
    const hashedPassword = bcryptjs.hashSync('admin123', 10);
    await dbRun(`
      INSERT INTO users (email, username, password, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `, ['admin@conference.com', 'admin', hashedPassword, 'Conference Admin', 'admin']);
    console.log('✓ Demo admin user created: admin@conference.com / admin123');
  }

  console.log('✓ Database initialized successfully');
}

// User queries
export const userQueries = {
  findByEmail: (email) => dbGet('SELECT * FROM users WHERE email = ?', [email]),
  findById: (id) => dbGet('SELECT * FROM users WHERE id = ?', [id]),
  findByUsername: (username) => dbGet('SELECT * FROM users WHERE username = ?', [username]),
  
  create: async (email, username, hashedPassword, fullName) => {
    const result = await dbRun(`
      INSERT INTO users (email, username, password, full_name, role)
      VALUES (?, ?, ?, ?, 'participant')
    `, [email, username, hashedPassword, fullName]);
    return dbGet('SELECT * FROM users WHERE id = ?', [result.lastID]);
  },

  update: async (id, updates) => {
    const keys = Object.keys(updates);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => updates[k]);
    values.push(id);
    
    await dbRun(`UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);
    return dbGet('SELECT * FROM users WHERE id = ?', [id]);
  },

  delete: (id) => dbRun('DELETE FROM users WHERE id = ?', [id]),

  getAllAdmins: () => dbAll('SELECT * FROM users WHERE role = ?', ['admin']),
  
  getAllParticipants: () => dbAll('SELECT * FROM users WHERE role = ?', ['participant']),

  getAllUsers: () => dbAll('SELECT id, email, username, full_name, role, created_at FROM users ORDER BY created_at DESC'),

  updateUserRole: async (id, role) => {
    await dbRun('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [role, id]);
    return dbGet('SELECT * FROM users WHERE id = ?', [id]);
  }
};

// Booking queries
export const bookingQueries = {
  create: async (userId, conferenceId) => {
    const result = await dbRun(`
      INSERT INTO bookings (user_id, conference_id, status)
      VALUES (?, ?, 'confirmed')
    `, [userId, conferenceId]);
    return dbGet('SELECT * FROM bookings WHERE id = ?', [result.lastID]);
  },

  findByUserAndConference: (userId, conferenceId) =>
    dbGet('SELECT * FROM bookings WHERE user_id = ? AND conference_id = ?', [userId, conferenceId]),

  getByUserId: (userId) =>
    dbAll('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [userId]),

  delete: (id) => dbRun('DELETE FROM bookings WHERE id = ?', [id]),

  deleteByUserAndConference: (userId, conferenceId) => {
    return dbRun('DELETE FROM bookings WHERE user_id = ? AND conference_id = ?', [userId, conferenceId]);
  }
};

// Contact message queries
export const contactQueries = {
  create: async (name, email, message) => {
    const result = await dbRun(`
      INSERT INTO contact_messages (name, email, message)
      VALUES (?, ?, ?)
    `, [name, email, message]);

    return dbGet('SELECT * FROM contact_messages WHERE id = ?', [result.lastID]);
  },

  getAll: () => dbAll('SELECT * FROM contact_messages ORDER BY created_at DESC'),
};
