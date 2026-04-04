# EventHub - Authentication System Setup

## Overview

This document explains the complete authentication system implementation for EventHub. The system provides restricted access with admin user management.

## Features Implemented

✅ **Restricted Authentication**
- Public user registration is disabled
- Only organizers can create user accounts
- Login required for conference booking

✅ **Login System**
- Email/username and password authentication
- JWT token-based sessions
- Auto-verification of tokens
- Secure password hashing with bcrypt

✅ **Role-Based Access Control**
- Admin role: Full user management access
- Participant role: Can view and book conferences
- Protected routes enforce access control

✅ **User Management (Admin Only)**
- Create new user accounts
- Edit user details and roles
- Delete user accounts
- View all users table
- Role assignment (Admin/Participant)

✅ **Session Management**
- Logout functionality
- Token-based authentication
- Local storage for token persistence
- Token validation on app load

## Project Structure

### Backend (Node.js + Express)
```
server/
├── index.js           # Express server entry point
├── db.js              # SQLite database setup & queries
├── auth.js            # JWT token management
├── routes.js          # API endpoints
├── package.json       # Backend dependencies
└── conference.db      # SQLite database (auto-created)
```

### Frontend (React)
```
src/
├── contexts/
│   └── AuthContext.tsx       # Auth state & provider
├── hooks/
│   └── useAuth.ts            # Auth context hook
├── components/
│   ├── Navbar.tsx            # Updated with logout
│   └── ProtectedRoute.tsx     # Route protection wrapper
├── pages/
│   ├── Login.tsx             # Complete login implementation
│   ├── OrganizerDashboard.tsx # User management dashboard
│   ├── Dashboard.tsx          # User dashboard (protected)
│   └── ...other pages
└── App.tsx                    # Auth provider setup
```

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

**Important:** Make sure you have Node.js 16+ installed.

### 2. Start Backend Server

```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000` and automatically:
- Create SQLite database
- Initialize tables
- Create demo admin account

**Output:**
```
✓ EventHub Auth Server running on http://localhost:5000
✓ Database initialized successfully

Demo credentials:
  Email: admin@conference.com
  Password: admin123
```

### 3. Update Frontend Environment

A `.env.local` file has been created in the root directory with the API URL. The default is already set:

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend

In a new terminal (keep backend running):

```bash
npm install  # if not done yet
npm run dev
```

Frontend runs on `http://localhost:8080`

## Demo Credentials

Use these credentials to test the system:

**Admin User:**
- Email: `admin@conference.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### User Management (Admin Only)
- `GET /api/auth/users` - Get all users
- `POST /api/auth/users` - Create user
- `PUT /api/auth/users/:id` - Update user
- `DELETE /api/auth/users/:id` - Delete user

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `DELETE /api/bookings/:conferenceId` - Cancel booking

## Key Features

### 1. Protected Routes
Dashboard and admin panel routes are automatically protected:
```typescript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### 2. Role-Based Access
Admin routes check for admin role:
```typescript
<Route 
  path="/organizer-dashboard" 
  element={
    <ProtectedRoute requiredRole="admin">
      <OrganizerDashboard />
    </ProtectedRoute>
  } 
/>
```

### 3. Authentication Context
Use the `useAuth()` hook in any component:
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### 4. Navigation Updates
- Login button shows when not authenticated
- User info and logout button show when authenticated
- Admin panel only appears for admin users
- Dashboard link only visible when logged in

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL (hashed),
  full_name TEXT NOT NULL,
  role TEXT ('admin' | 'participant'),
  created_at DATETIME,
  updated_at DATETIME
)
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  user_id INTEGER (foreign key),
  conference_id TEXT NOT NULL,
  status TEXT ('pending' | 'confirmed' | 'cancelled'),
  created_at DATETIME,
  updated_at DATETIME
)
```

## Security Features

✅ **Password Security**
- Bcrypt hashing (salt rounds: 10)
- Passwords never stored in plain text
- Secure comparison on login

✅ **Token Security**
- JWT tokens with 7-day expiry
- Tokens stored in localStorage
- Bearer token in Authorization header

✅ **Access Control**
- Protected routes via ProtectedRoute component
- Role-based endpoint authorization
- Admin-only mutation endpoints

✅ **Data Validation**
- Email format validation
- Required field checks
- Type safety with TypeScript

## Making User Accounts

As an admin, you can create user accounts:

1. Login with admin credentials
2. Go to Admin Panel
3. Click "Create User" button
4. Fill in details:
   - Full Name
   - Email
   - Username
   - Password (auto-hashed)
   - Role (Admin or Participant)
5. Click "Create User"

Users can now login with their credentials.

## Permissions Summary

| Action | Public | Participant | Admin |
|--------|--------|-------------|-------|
| View Conferences | ✅ | ✅ | ✅ |
| View Conference Details | ✅ | ✅ | ✅ |
| Book Conference | ❌ | ✅ | ✅ |
| Access Dashboard | ❌ | ✅ | ✅ |
| Create User | ❌ | ❌ | ✅ |
| Edit User | ❌ | ❌ | ✅ |
| Delete User | ❌ | ❌ | ✅ |
| Access Admin Panel | ❌ | ❌ | ✅ |

## Troubleshooting

### Backend won't start
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Ensure Node.js is installed: `node --version`

### Can't connect to API
- Verify backend is running on http://localhost:5000
- Check VITE_API_URL in `.env.local`
- Check browser console for CORS errors

### Login fails
- Reset database: Delete `server/conference.db` and restart backend
- Check demo credentials are correct
- Verify user exists in admin panel

### Token errors
- Clear localStorage: Open DevTools → Application → Clear All
- Restart frontend app
- Re-login

## Next Steps

You can extend this system with:
1. Email verification for new users
2. Password reset functionality
3. Two-factor authentication
4. User profiles and preferences
5. Booking history and cancellation
6. Conference attendance tracking
7. Admin dashboard analytics
8. Export user/booking reports

## Files Modified/Created

**New Files:**
- `server/` - Complete backend
- `src/contexts/AuthContext.tsx` - Auth context
- `src/hooks/useAuth.ts` - Auth hook
- `src/components/ProtectedRoute.tsx` - Route protection
- `.env.local` - Environment configuration

**Modified Files:**
- `src/App.tsx` - Added AuthProvider and ProtectedRoute
- `src/pages/Login.tsx` - Complete authentication logic
- `src/pages/OrganizerDashboard.tsx` - User management
- `src/components/Navbar.tsx` - Logout and auth info

## Support

For issues or questions:
1. Check the server logs (from backend terminal)
2. Check browser console (F12 → Console tab)
3. Verify API endpoints use correct format
4. Reset database if needed

---

**Status:** ✅ Complete

Authentication system is fully implemented and ready to use!
