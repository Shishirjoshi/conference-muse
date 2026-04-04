import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'conference.db');

export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Create users table
  db.exec(`
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
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      conference_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed' CHECK(status IN ('pending', 'confirmed', 'cancelled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, conference_id)
    )
  `);

  // Create seed data - demo admin user
  const adminExists = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@conference.com');
  if (!adminExists) {
    const hashedPassword = bcryptjs.hashSync('admin123', 10);
    db.prepare(`
      INSERT INTO users (email, username, password, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin@conference.com', 'admin', hashedPassword, 'Conference Admin', 'admin');
    console.log('✓ Demo admin user created: admin@conference.com / admin123');
  }

  console.log('✓ Database initialized successfully');
}

// User queries
export const userQueries = {
  findByEmail: (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email),
  findById: (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id),
  findByUsername: (username) => db.prepare('SELECT * FROM users WHERE username = ?').get(username),
  
  create: (email, username, hashedPassword, fullName) => {
    const stmt = db.prepare(`
      INSERT INTO users (email, username, password, full_name, role)
      VALUES (?, ?, ?, ?, 'participant')
    `);
    const result = stmt.run(email, username, hashedPassword, fullName);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  },

  update: (id, updates) => {
    const setClause = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(updates);
    values.push(id);
    
    db.prepare(`UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  delete: (id) => {
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
  },

  getAllAdmins: () => db.prepare('SELECT * FROM users WHERE role = ?').all('admin'),
  
  getAllParticipants: () => db.prepare('SELECT * FROM users WHERE role = ?').all('participant'),

  getAllUsers: () => db.prepare('SELECT id, email, username, full_name, role, created_at FROM users ORDER BY created_at DESC').all(),

  updateUserRole: (id, role) => {
    db.prepare('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(role, id);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }
};

// Booking queries
export const bookingQueries = {
  create: (userId, conferenceId) => {
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, conference_id, status)
      VALUES (?, ?, 'confirmed')
    `);
    const result = stmt.run(userId, conferenceId);
    return db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
  },

  findByUserAndConference: (userId, conferenceId) =>
    db.prepare('SELECT * FROM bookings WHERE user_id = ? AND conference_id = ?').get(userId, conferenceId),

  getByUserId: (userId) =>
    db.prepare('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC').all(userId),

  delete: (id) => {
    db.prepare('DELETE FROM bookings WHERE id = ?').run(id);
  },

  deleteByUserAndConference: (userId, conferenceId) => {
    db.prepare('DELETE FROM bookings WHERE user_id = ? AND conference_id = ?').run(userId, conferenceId);
  }
};
