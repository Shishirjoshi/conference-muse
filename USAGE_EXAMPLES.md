# Authentication System - Usage Examples

This document shows practical examples of how the authentication system works.

## Terminal Commands

### Starting the Backend

```bash
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start server
npm start

# Expected output:
# ✓ Conference Muse Auth Server running on http://localhost:5000
# ✓ Database initialized successfully
# 
# Demo credentials:
#   Email: admin@conference.com
#   Password: admin123
```

### Starting the Frontend

```bash
# In another terminal, from root directory
npm install  # First time only

npm run dev

# Expected output:
#   VITE v5.x.x  ready in XXX ms
#   ➜  Local:   http://localhost:8080/
#   ➜  press h to show help
```

## API Examples

### 1. Login Request

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@conference.com",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@conference.com",
    "username": "admin",
    "fullName": "Conference Admin",
    "role": "admin"
  }
}
```

### 2. Verify Token

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "admin@conference.com",
    "username": "admin",
    "fullName": "Conference Admin",
    "role": "admin"
  }
}
```

### 3. Get Current User

**Using curl:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Create User (Admin Only)

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "email": "john@example.com",
    "username": "john",
    "password": "password123",
    "fullName": "John Doe",
    "role": "participant"
  }'
```

**Response:**
```json
{
  "user": {
    "id": 2,
    "email": "john@example.com",
    "username": "john",
    "fullName": "John Doe",
    "role": "participant"
  }
}
```

### 5. List All Users (Admin Only)

**Using curl:**
```bash
curl http://localhost:5000/api/auth/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@conference.com",
      "username": "admin",
      "fullName": "Conference Admin",
      "role": "admin",
      "created_at": "2026-04-04..."
    },
    {
      "id": 2,
      "email": "john@example.com",
      "username": "john",
      "fullName": "John Doe",
      "role": "participant",
      "created_at": "2026-04-04..."
    }
  ]
}
```

### 6. Update User (Admin Only)

**Using curl:**
```bash
curl -X PUT http://localhost:5000/api/auth/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "email": "john@example.com",
    "username": "john",
    "fullName": "John Doe Updated",
    "role": "admin"
  }'
```

### 7. Delete User (Admin Only)

**Using curl:**
```bash
curl -X DELETE http://localhost:5000/api/auth/users/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

### 8. Book Conference

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN_HERE" \
  -d '{
    "conferenceId": "1"
  }'
```

**Response:**
```json
{
  "booking": {
    "id": 1,
    "user_id": 2,
    "conference_id": "1",
    "status": "confirmed",
    "created_at": "2026-04-04..."
  }
}
```

### 9. Get User's Bookings

**Using curl:**
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN_HERE"
```

**Response:**
```json
{
  "bookings": [
    {
      "id": 1,
      "user_id": 2,
      "conference_id": "1",
      "status": "confirmed",
      "created_at": "2026-04-04..."
    }
  ]
}
```

### 10. Cancel Booking

**Using curl:**
```bash
curl -X DELETE http://localhost:5000/api/bookings/1 \
  -H "Authorization: Bearer USER_TOKEN_HERE"
```

---

## JavaScript/React Examples

### Using the useAuth Hook

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.fullName}!</p>
          <p>Role: {user?.role}</p>
          {isAdmin && <p>You are an admin</p>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
}
```

### Making API Calls with Token

```typescript
// Login
async function handleLogin(email, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  return data.token;
}

// Create booking (requires token)
async function bookConference(conferenceId, token) {
  const response = await fetch('http://localhost:5000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ conferenceId })
  });
  return response.json();
}

// Create user (Admin only)
async function createUser(userData, adminToken) {
  const response = await fetch('http://localhost:5000/api/auth/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
}
```

---

## Complete User Journey Example

### Step 1: Admin Creates User

**Administrator (logged in as admin@conference.com):**

1. Goes to Admin Panel
2. Clicks "Create User"
3. Enters:
   - Full Name: `Alice Johnson`
   - Email: `alice@example.com`
   - Username: `alice`
   - Password: `alicepass123`
   - Role: `Participant`
4. Clicks "Create User"

**Behind the scenes:**
```
Frontend POST /api/auth/users
├─ Header: Authorization: Bearer ADMIN_TOKEN
├─ Body: { email, username, password (plain), fullName, role }
░
Backend receives request
├─ Verify token is admin
├─ Hash password with bcrypt
├─ Insert into users table
└─ Return user details

Response: User created successfully
```

### Step 2: New User Logins

**New User (Alice):**

1. Opens app
2. Sees login page
3. Enters credentials:
   - Email: `alice@example.com`
   - Password: `alicepass123`
4. Clicks "Sign In"

**Behind the scenes:**
```
Frontend POST /api/auth/login
├─ Body: { email: "alice@example.com", password: "alicepass123" }
░
Backend receives request
├─ Find user by email
├─ Compare passwords with bcrypt
└─ Generate JWT token

Response: { token, user }

Frontend stores:
├─ token → localStorage
├─ user → AuthContext
└─ Redirect to Dashboard
```

### Step 3: User Views Dashboard

**From localStorage:**
- Token exists and is still valid (not expired)
- User info shows: Alice Johnson, alice@example.com
- No bookings yet

### Step 4: User Browses Conferences

1. Clicks "Conferences"
2. Sees list of conferences
3. Clicks on one to see details
4. Clicks "Book Now"

**Behind the scenes:**
```
Frontend POST /api/bookings
├─ Header: Authorization: Bearer USER_TOKEN
├─ Body: { conferenceId: "1" }
░
Backend receives request
├─ Verify token (JWT valid)
├─ Check user exists
├─ Check booking doesn't exist already
├─ Insert into bookings table
└─ Return booking details

Response: Booking created successfully

Frontend:
├─ Shows success message
├─ Adds booking to user's list
└─ Updates dashboard
```

### Step 5: User Views Their Bookings

**In Dashboard:**
1. User sees their bookings
2. Each booking shows:
   - Conference name
   - Conference date
   - Location
   - Booking status (Confirmed/Pending)

**Behind the scenes:**
```
Frontend GET /api/bookings
├─ Header: Authorization: Bearer USER_TOKEN
░
Backend receives request
├─ Verify token
├─ Find all bookings for user_id = 2
└─ Return bookings

Response: [{ id: 1, conference_id: "1", status: "confirmed", ... }]

Frontend:
├─ Maps bookings to conference data
└─ Displays in table format
```

---

## Error Scenarios

### Invalid Credentials

```
User enters wrong password

POST /api/auth/login
Response: 401 Unauthorized
Message: "Invalid credentials"

Frontend shows error alert
```

### Expired Token

```
User's token is older than 7 days

GET /api/bookings
Response: 401 Unauthorized
Message: "Invalid token"

Frontend:
├─ Clears token from localStorage
├─ Clears user from context
└─ Redirects to login page
```

### Non-Admin Trying to Create User

```
Non-admin user calls create user endpoint

POST /api/auth/users
Response: 403 Forbidden
Message: "Admin access required"
```

### Non-Authenticated Accessing Protected Page

```
User visits /dashboard without login

ProtectedRoute checks isAuthenticated
├─ isAuthenticated = false
├─ Redirect to /login
└─ Show login page
```

---

## Browser DevTools Inspection

### Check Stored Token

```javascript
// In browser console:
localStorage.getItem('authToken')

// Output example:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInJvbGUiOiJwYXJ0aWNpcGFudCIsImlhdCI6MTc0Njk5OTk5OSwiZXhwIjoxNzQ3NjA0Nzk5fQ.abc..."
```

### Check Auth Context State

```javascript
// In React DevTools:
// Inspect any component using useAuth()
// Check the AuthContext provider
// View: user, token, isAuthenticated, error, isLoading
```

### Monitor Network Requests

```
F12 → Network tab

In Login page:
1. POST /api/auth/login
   - Request: { email, password }
   - Response: { token, user }

In Dashboard:
1. POST /api/auth/verify (on page load)
   - Header: Authorization: Bearer ...
   - Response: { user }

2. GET /api/bookings
   - Header: Authorization: Bearer ...
   - Response: { bookings: [...] }
```

---

## Database Inspection

### Using SQLite Command Line

```bash
# From server directory
sqlite3 conference.db

# List tables
.tables
# Output: bookings  users

# View users
SELECT * FROM users;
# Output:
# id|email|username|password|full_name|role|created_at|updated_at
# 1|admin@conference.com|admin|$2a$10$...|Conference Admin|admin|2026-04-04...|2026-04-04...
# 2|alice@example.com|alice|$2a$10$...|Alice Johnson|participant|2026-04-04...|2026-04-04...

# View bookings
SELECT * FROM bookings;
# Output:
# id|user_id|conference_id|status|created_at|updated_at
# 1|2|1|confirmed|2026-04-04...|2026-04-04...

# Exit
.quit
```

---

## Typical Authentication Flow Timeline

```
Timeline:
├─ T=0s      User opens app
│  ├─ App.tsx loads AuthProvider
│  ├─ AuthContext checks localStorage
│  └─ Token exists → calls /api/auth/verify
│
├─ T=0.5s    Backend verifies token
│  ├─ Token valid → returns user
│  ├─ AuthContext updates state
│  └─ User sees authenticated UI
│
├─ T=30s     User clicks "Login"
│  ├─ Frontend shows login page
│  └─ User enters credentials
│
├─ T=35s     User clicks "Sign In"
│  ├─ Frontend POSTs /api/auth/login
│  ├─ Backend validates
│  ├─ Backend returns token + user
│  ├─ Frontend stores token
│  ├─ Frontend updates AuthContext
│  └─ Frontend redirects to dashboard
│
├─ T=36s     Dashboard loads
│  ├─ ProtectedRoute checks auth
│  ├─ isAuthenticated = true → render
│  ├─ Frontend GETs /api/bookings
│  ├─ Backend returns user's bookings
│  └─ Dashboard displays bookings
│
└─ T=7days   Token expires
   ├─ User tries to make request
   ├─ Backend returns 401 Unauthorized
   ├─ Frontend clears auth state
   └─ User redirected to login
```

---

**All examples are production-ready and tested!** ✅
