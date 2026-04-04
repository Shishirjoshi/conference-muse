# Quick Start Guide

## One-Minute Setup

### Prerequisites
- Node.js 16+ installed
- npm or bun

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
# From root directory
npm install
```

### Step 2: Start Backend

```bash
cd server
npm start
```

**Output should show:**
```
✓ EventHub Auth Server running on http://localhost:5000
✓ Database initialized successfully

Demo credentials:
  Email: admin@conference.com
  Password: admin123
```

### Step 3: Start Frontend

In a new terminal:
```bash
npm run dev
```

Open `http://localhost:8080`

## Login with Demo Account

1. Click "Login" button
2. Enter credentials:
   - Email: `admin@conference.com`
   - Password: `admin123`
3. You'll be redirected to Admin Panel

## First Steps

### As Admin:
1. ✅ View all users in "User Management" tab
2. ✅ Create new users with "Create User" button
3. ✅ Edit or delete user accounts
4. ✅ Assign roles (Admin/Participant)
5. ✅ View conferences and manage them

### Create Test User:
1. Go to Admin Panel
2. Click "Create User"
3. Fill in details:
   - Full Name: `John Participant`
   - Email: `john@example.com`
   - Username: `johnp`
   - Password: `password123`
   - Role: `Participant`
4. Click "Create User"
5. Logout and login with new account

### As Participant:
1. ✅ View all conferences
2. ✅ View conference details
3. ✅ Book a conference
4. ✅ See bookings in dashboard
5. ✅ Cancel bookings

## Key Features

✅ **Restricted Access** - Only login users can book
✅ **Admin Panel** - Create/manage users
✅ **Role-Based Access** - Admin vs Participant
✅ **Secure Auth** - Password hashing with bcrypt
✅ **Token-Based** - JWT authentication
✅ **Protected Routes** - Automatic redirects

## Troubleshooting

### Port 5000 already in use?
```bash
# Find what's using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Can't connect to API?
- Make sure backend is running: `http://localhost:5000/api/health`
- Check VITE_API_URL in `.env.local`
- Open browser console for errors

### Lost database?
```bash
# Reset database (delete it)
rm server/conference.db
# Restart backend to recreate
```

### Clear session?
- Open DevTools (F12)
- Application → Local Storage → Clear All
- Reload page

## Next: Create More Users

The system is now ready for multiple users!

```javascript
// You can create as many users as needed:
// - Unlimited admin users
// - Unlimited participant users
// - Each can have separate logins
// - Track all bookings per user
```

## Architecture

```
Frontend (React)
    ↓
Auth Context (useAuth hook)
    ↓
API Client (fetch)
    ↓
Backend (Express.js)
    ↓
Database (SQLite)
```

## Files to Know

- `server/index.js` - Backend server
- `src/App.tsx` - Frontend routing & auth setup
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/pages/Login.tsx` - Login form
- `src/pages/OrganizerDashboard.tsx` - User management
- `server/conference.db` - SQLite database

## More Info

See `AUTHENTICATION_SETUP.md` for complete documentation including:
- API endpoints reference
- Database schema
- Security features
- Advanced configuration
- Extension ideas

---

**Happy coding!** 🎉
