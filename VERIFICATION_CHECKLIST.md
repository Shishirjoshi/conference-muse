# Authentication System - Verification Checklist

Use this checklist to verify that the authentication system is working correctly before deployment.

## Pre-Startup Checklist

### Prerequisites
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm or bun installed (`npm --version`)
- [ ] Git repository initialized
- [ ] No other services running on ports 5000 and 8080

### File Verification
- [ ] Server directory exists: `server/`
- [ ] Backend files present:
  - [ ] `server/index.js`
  - [ ] `server/db.js`
  - [ ] `server/auth.js`
  - [ ] `server/routes.js`
  - [ ] `server/package.json`
- [ ] Frontend auth files present:
  - [ ] `src/contexts/AuthContext.tsx`
  - [ ] `src/hooks/useAuth.ts`
  - [ ] `src/components/ProtectedRoute.tsx`
- [ ] Configuration present:
  - [ ] `.env.local` at root
  - [ ] `server/.env.example`

### Dependencies
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Frontend dependencies installed (`npm install`)

---

## Backend Startup Verification

### Start Backend
```bash
cd server
npm start
```

Verify output:
- [ ] No errors in console
- [ ] "Database initialized successfully" message shown
- [ ] "Server running on http://localhost:5000" message shown
- [ ] Demo credentials printed:
  - [ ] Email: admin@conference.com
  - [ ] Password: admin123

### Check Database
- [ ] `server/conference.db` file created
- [ ] Database is accessible:
  ```bash
  sqlite3 conference.db ".tables"
  # Should show: bookings  users
  ```

### Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```

---

## Frontend Startup Verification

### Start Frontend
```bash
npm run dev
```

Verify output:
- [ ] No build errors
- [ ] Server running on `http://localhost:8080`
- [ ] No warnings about missing dependencies

### Open in Browser
- [ ] `http://localhost:8080` loads without errors
- [ ] No console errors (open DevTools: F12)
- [ ] Page shows navigation bar
- [ ] "Login" button visible

---

## Authentication Flow Testing

### Test 1: Login Page Accessibility
- [ ] Click "Login" button
- [ ] Login page loads
- [ ] Shows "Welcome Back" heading
- [ ] Shows info message about credentials
- [ ] Email and password fields present
- [ ] Demo credentials displayed at bottom

### Test 2: Invalid Credentials
- [ ] Enter wrong email/password
- [ ] Click "Sign In"
- [ ] Error message shows: "Invalid credentials"
- [ ] User stays on login page

### Test 3: Valid Login (Admin)
- [ ] Enter: admin@conference.com / admin123
- [ ] Click "Sign In"
- [ ] Loading indicator appears
- [ ] Redirects to Admin Panel (not dashboard)
- [ ] Shows "Admin Panel" heading
- [ ] Shows user's name in profile section

### Test 4: Token Persistence
- [ ] Login as admin
- [ ] Refresh page (F5)
- [ ] User stays logged in (no redirect to login)
- [ ] User info still visible

### Test 5: Logout
- [ ] Click user menu or logout button
- [ ] Select "Logout"
- [ ] Redirected to login page
- [ ] localStorage cleared (check DevTools)
- [ ] Trying to access dashboard → redirected to login

---

## Route Protection Testing

### Test 1: Protected Dashboard
1. [ ] Logout (if currently logged in)
2. [ ] Try to access `/dashboard` directly
3. [ ] ✅ Redirected to `/login`

### Test 2: Protected Admin Panel
1. [ ] Logout
2. [ ] Try to access `/organizer-dashboard`
3. [ ] ✅ Redirected to `/login`

### Test 3: Login Admin Sees Dashboard Link
1. [ ] Login as admin
2. [ ] Navbar shows "Admin Panel" link
3. [ ] Click it
4. [ ] ✅ Opens admin panel (not hidden)

### Test 4: Participant Can't See Admin Link
1. [ ] Create participant user (see Admin Panel Tests)
2. [ ] Login as participant
3. [ ] Check navbar
4. [ ] ✅ "Admin Panel" link NOT visible

---

## Admin Panel Testing

### Test 1: User Management Tab
- [ ] Click "User Management" tab
- [ ] Table of users loads
- [ ] Shows all existing users
- [ ] Columns: Name, Email, Username, Role, Actions

### Test 2: Create User
- [ ] Click "Create User" button
- [ ] Modal opens with form
- [ ] Fields: Full Name, Email, Username, Password, Role
- [ ] Fill in valid data:
  - Full Name: `Test User`
  - Email: `test@example.com`
  - Username: `testuser`
  - Password: `testpass123`
  - Role: `Participant`
- [ ] Click "Create User"
- [ ] Success (no error)
- [ ] User appears in table
- [ ] Can refresh and user still there

### Test 3: Edit User
- [ ] Click "Edit" on a participant user
- [ ] Modal opens with current data
- [ ] Change name to: `Updated Name`
- [ ] Click "Update User"
- [ ] Success
- [ ] Table shows updated name

### Test 4: Delete User
- [ ] Click "Delete" on a participant user
- [ ] Confirm dialog appears
- [ ] Click "OK"
- [ ] User removed from table
- [ ] Can't delete demo admin (button disabled)

### Test 5: Logout Disabled for Demo Admin
- [ ] Try to delete admin@conference.com user
- [ ] Delete button is disabled/grayed out
- [ ] Tooltip explains it's demo account

---

## Participant User Testing

### Setup: Create Test Participant
1. [ ] Login as admin
2. [ ] Create user:
   - Email: `participant@example.com`
   - Username: `participant`
   - Password: `participantpass123`
   - Role: `Participant`
3. [ ] Click "Create User"
4. [ ] Logout

### Test 1: Participant Login
- [ ] Login as participant@example.com / participantpass123
- [ ] ✅ Redirected to Dashboard (not Admin Panel)
- [ ] Shows "My Bookings" section

### Test 2: Participant Can't See Admin Panel
- [ ] Check navbar
- [ ] ✅ "Admin Panel" link NOT visible
- [ ] Try to access `/organizer-dashboard` directly
- [ ] ✅ Redirected to `/`

### Test 3: View Conferences
- [ ] Click "Conferences" link
- [ ] ✅ See list of conferences
- [ ] Each shows title, date, location
- [ ] Can click to view details

### Test 4: Book Conference
- [ ] Click on any conference
- [ ] Click "Book Now" button
- [ ] ✅ Booking appears in dashboard
- [ ] Can logout and login, booking persists

### Test 5: View Bookings
- [ ] In Dashboard, see "My Bookings" section
- [ ] Shows booked conferences
- [ ] Each booking shows status: (Confirmed/Pending)
- [ ] Can click "View" to see conference details

---

## API Testing (Advanced)

### Test 1: Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@conference.com","password":"admin123"}'
```
- [ ] Returns status 200
- [ ] Response includes: token, user object
- [ ] Token is valid JWT (3 parts separated by .)

### Test 2: Create User API
```bash
# First, get token from login
TOKEN="your_token_here"

curl -X POST http://localhost:5000/api/auth/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "email":"apitest@example.com",
    "username":"apitest",
    "password":"apipass123",
    "fullName":"API Test User",
    "role":"participant"
  }'
```
- [ ] Returns status 201
- [ ] Response includes created user
- [ ] User appears in database

### Test 3: List Users API
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer $TOKEN"
```
- [ ] Returns status 200
- [ ] Response includes array of users

### Test 4: Protected Endpoint Without Token
```bash
curl http://localhost:5000/api/bookings
```
- [ ] Returns status 401
- [ ] Error message: "No token provided"

### Test 5: Admin Endpoint as Non-Admin
```bash
# First login as participant and get their token
TOKEN="participant_token"

curl http://localhost:5000/api/auth/users \
  -H "Authorization: Bearer $TOKEN"
```
- [ ] Returns status 403
- [ ] Error message: "Admin access required"

---

## Database Verification

### Check Users Table
```bash
sqlite3 server/conference.db "SELECT * FROM users;"
```
- [ ] Shows at least 2 users (admin + test)
- [ ] Passwords are hashed (start with $2a$)
- [ ] Roles are correct (admin or participant)
- [ ] Timestamps are present

### Check Bookings Table
```bash
sqlite3 server/conference.db "SELECT * FROM bookings;"
```
- [ ] Shows created bookings
- [ ] user_id references valid user
- [ ] conference_id is valid
- [ ] status is one of: pending, confirmed, cancelled

---

## Error Handling Testing

### Test 1: Invalid Email
- [ ] Login with: invalidemail
- [ ] ✅ Shows validation error

### Test 2: Network Error Recovery
1. [ ] Stop backend server
2. [ ] Try to login
3. [ ] Show connection error
4. [ ] Restart backend
5. [ ] Retry login
6. [ ] ✅ Works again

### Test 3: Expired Token
Do this manually (wait 7+ days) or:
1. [ ] Modify JWT_SECRET in backend
2. [ ] Restart backend
3. [ ] Try to make request with old token
4. [ ] ✅ Redirected to login

### Test 4: Duplicate Email
1. [ ] Admin creates user with email: `duplicate@test.com`
2. [ ] Admin tries to create another with same email
3. [ ] ✅ Shows error: "Email already exists"

---

## Performance Testing

### Test 1: Large User List
1. [ ] Admin creates 50+ users
2. [ ] User table loads without lag
3. [ ] No console errors

### Test 2: Multiple Bookings
1. [ ] User books 20+ conferences
2. [ ] Dashboard loads all bookings
3. [ ] No performance degradation

### Test 3: Multiple Logins
1. [ ] Login/logout 10 times quickly
2. [ ] ✅ No errors or state issues

---

## Browser Compatibility

Test in these browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browser (iOS/Android)

For each browser, verify:
- [ ] Login works
- [ ] Forms are usable
- [ ] No console errors
- [ ] Responsive layout works

---

## Security Verification

### Test 1: Password Hashing
```bash
# Check database
sqlite3 server/conference.db "SELECT password FROM users LIMIT 1;"
```
- [ ] Password starts with `$2a$` (bcrypt hash)
- [ ] Password is NOT plaintext

### Test 2: Token in Headers
1. [ ] Login and get token
2. [ ] Open DevTools → Network
3. [ ] Make API request
4. [ ] Check request headers
5. [ ] ✅ Token in "Authorization: Bearer ..." header (not in URL)

### Test 3: CORS Protection
```bash
curl -X OPTIONS http://localhost:5000/ \
  -H "Origin: http://evil.com"
```
- [ ] Returns appropriate CORS headers
- [ ] Only allows whitelisted origins

### Test 4: localStorage is Encrypted?
```javascript
// In browser console
localStorage.getItem('authToken')
```
- [ ] Note: Token is NOT encrypted, just stored
- [ ] This is acceptable for frontend
- [ ] Use HTTPS in production for safety

---

## Deployment Preparation

### Backend Production Check
- [ ] Change `JWT_SECRET` in `.env` to strong value
- [ ] Set `NODE_ENV=production`
- [ ] Set `PORT` for production server
- [ ] Database file path is writable
- [ ] CORS origins whitelist is updated

### Frontend Production Check
- [ ] Update `VITE_API_URL` to production API
- [ ] Build frontend: `npm run build`
- [ ] `dist/` folder created correctly
- [ ] No source maps in production build
- [ ] Environment variables properly injected

### Pre-Deployment Checklist
- [ ] All tests above pass ✓
- [ ] No console errors
- [ ] No warning messages
- [ ] Database backed up
- [ ] Deployment procedure documented
- [ ] Rollback plan documented

---

## Final Sign-Off

When all checks pass:

```
Date: _______________
Checked by: _______________
Status: ✅ READY FOR DEPLOYMENT
```

---

**Next Step:** See DEPLOYMENT.md for production setup

**Questions?** See AUTHENTICATION_SETUP.md or USAGE_EXAMPLES.md
