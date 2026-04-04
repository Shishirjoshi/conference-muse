# Project Structure with Authentication

## Complete Directory Tree

```
eventhub/
│
├── 📁 server/                          ← NEW: Backend server
│   ├── index.js                        ← Express server entry point
│   ├── db.js                           ← SQLite database & queries
│   ├── auth.js                         ← JWT token management
│   ├── routes.js                       ← API endpoints
│   ├── package.json                    ← Backend dependencies
│   ├── .env.example                    ← Environment template
│   ├── README.md                       ← Backend documentation
│   └── conference.db                   ← Auto-created SQLite database
│
├── 📁 src/
│   ├── 📁 contexts/                    ← NEW: Context providers
│   │   └── AuthContext.tsx             ← Auth state management
│   │
│   ├── 📁 hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useAuth.ts                  ← NEW: Auth hook
│   │
│   ├── 📁 components/
│   │   ├── Navbar.tsx                  ← MODIFIED: Added logout
│   │   ├── ProtectedRoute.tsx           ← NEW: Route protection
│   │   ├── ConferenceCard.tsx
│   │   ├── Footer.tsx
│   │   └── 📁 ui/                      ← Shadcn UI components
│   │
│   ├── 📁 pages/
│   │   ├── Login.tsx                   ← MODIFIED: Real authentication
│   │   ├── Dashboard.tsx               ← MODIFIED: User bookings
│   │   ├── OrganizerDashboard.tsx      ← MODIFIED: User management
│   │   ├── Conferences.tsx
│   │   ├── ConferenceDetail.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── 📁 test/
│   │
│   ├── 📁 lib/
│   │   └── utils.ts
│   │
│   ├── 📁 data/
│   │   └── conferences.ts
│   │
│   ├── App.tsx                         ← MODIFIED: AuthProvider setup
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── 📁 public/
│   └── robots.txt
│
├── 📄 Authentication Files (NEW)
│   ├── AUTHENTICATION_SETUP.md          ← Complete documentation
│   ├── QUICK_START.md                   ← Quick start guide
│   ├── IMPLEMENTATION_SUMMARY.md        ← This file
│   └── .env.local                       ← Frontend API config
│
├── Configuration Files
│   ├── .env.local                       ← NEW: API URL
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── components.json
│   ├── playground.config.ts
│   └── playwright.config.ts
│
├── Documentation
│   ├── README.md
│   ├── AUTHENTICATION_SETUP.md          ← NEW
│   ├── QUICK_START.md                   ← NEW
│   └── IMPLEMENTATION_SUMMARY.md        ← NEW
│
└── Root Files
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── bun.lockb
    ├── bun.lock
    └── .gitignore
```

## Key Directories Explained

### Backend (`server/`)
Complete Express.js application with:
- **index.js** - Server entry point with CORS and middleware
- **db.js** - SQLite database setup and query functions
- **auth.js** - JWT token generation and verification
- **routes.js** - 11 API endpoints for auth and bookings
- **conference.db** - SQLite database file (auto-created)

### Frontend Auth (`src/contexts/`, `src/hooks/`)
React authentication layer:
- **AuthContext.tsx** - Global auth state with login/logout
- **useAuth.ts** - Hook to access auth anywhere
- **ProtectedRoute.tsx** - Route protection wrapper

### Pages (`src/pages/`)
User-facing pages with modifications:
- **Login.tsx** - Email/password login form
- **Dashboard.tsx** - Authenticated user's bookings
- **OrganizerDashboard.tsx** - Admin user management

### Components (`src/components/`)
Updated UI components:
- **Navbar.tsx** - Shows user info and logout button
- **ProtectedRoute.tsx** - Wraps protected pages

## File Dependencies

```
App.tsx
├── imports AuthProvider from AuthContext.tsx
├── imports ProtectedRoute from ProtectedRoute.tsx
└── wraps routes with protection

Pages
├── use useAuth() from useAuth.ts
├── access user from AuthContext
└── call API with token

AuthContext.tsx
├── defines auth state (user, token, isAuthenticated)
├── handles login/logout
└── manages token in localStorage

Backend (server/index.js)
├── uses db.js for database operations
├── uses auth.js for JWT handling
├── uses routes.js for API endpoints
└── creates/initializes conference.db
```

## Environment Configuration

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env.example)
```
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

## Database Tables

### users table
- id (INTEGER, PRIMARY KEY)
- email (TEXT, UNIQUE)
- username (TEXT, UNIQUE)
- password (TEXT, hashed)
- full_name (TEXT)
- role (TEXT: 'admin' or 'participant')
- created_at (DATETIME)
- updated_at (DATETIME)

### bookings table
- id (INTEGER, PRIMARY KEY)
- user_id (INTEGER, FOREIGN KEY)
- conference_id (TEXT)
- status (TEXT: 'pending', 'confirmed', 'cancelled')
- created_at (DATETIME)
- updated_at (DATETIME)

## Server Ports

- **Frontend:** http://localhost:8080 (Vite dev server)
- **Backend:** http://localhost:5000 (Express server)
- **API Base:** http://localhost:5000/api (REST endpoints)

## Authentication Flow

```
1. User opens app
   ├─ App.tsx loads AuthProvider
   ├─ AuthContext checks localStorage for token
   └─ If found, verifies token validity

2. Unauthenticated user
   ├─ Sees login page only
   ├─ "Book conference" shows login redirect
   └─ Dashboard shows 403 error

3. User logs in
   ├─ Frontend POSTs /api/auth/login
   ├─ Backend validates credentials
   ├─ Backend returns JWT token
   ├─ Frontend stores token in localStorage
   ├─ Frontend updates user state
   └─ Frontend redirects to dashboard

4. Authenticated user
   ├─ Can access Dashboard (ProtectedRoute)
   ├─ API calls include Authorization header
   ├─ Backend verifies token on each request
   └─ Token refreshes on page load (verify endpoint)

5. Admin user
   ├─ Can access OrganizerDashboard
   ├─ Can make admin API calls
   ├─ Backend checks role: 'admin'
   └─ Non-admins get 403 Forbidden

6. User logs out
   ├─ Frontend clears localStorage token
   ├─ Frontend clears user state
   ├─ Frontend redirects to login
   └─ Backend doesn't need to do anything
```

## Startup Sequence

### Backend Startup (npm start from server/)
```
1. Load .env variables
2. Import Express, SQLite, bcryptsjs, jwt
3. Initialize database (db.js)
   ├─ Create users table if not exists
   ├─ Create bookings table if not exists
   ├─ Create demo admin user if not exists
   └─ Database ready!
4. Setup Express middleware (CORS, JSON)
5. Register routes (/api/auth/*, /api/bookings/*)
6. Listen on port 5000
7. Log server status
```

### Frontend Startup (npm run dev from root)
```
1. Load .env.local (VITE_API_URL)
2. Initialize Vite dev server on port 8080
3. React app loads
   ├─ AuthProvider wraps entire app
   ├─ AuthContext checks localStorage for token
   ├─ If token exists, verifies with backend
   ├─ Updates user state if valid
   └─ App renders based on auth state
4. User sees either login or authenticated view
```

## What's Protected vs Public

### Public Routes (No Auth Needed)
```
GET  /                          → Index page
GET  /conferences               → Conference list
GET  /conference/:id            → Conference details
GET  /login                     → Login page
POST /api/auth/login            → Login endpoint
POST /api/auth/verify           → Token verification
```

### Protected Routes (Auth Required)
```
GET  /dashboard                 → User dashboard (all users)
POST /api/bookings              → Create booking
GET  /api/bookings              → Get user's bookings
DELETE /api/bookings/:id        → Cancel booking
```

### Admin Routes (Auth + Admin Role Required)
```
GET  /organizer-dashboard       → Admin panel
GET  /api/auth/users            → List users
POST /api/auth/users            → Create user
PUT  /api/auth/users/:id        → Update user
DELETE /api/auth/users/:id      → Delete user
```

## Development Tips

### Check if servers are running:
```bash
# Frontend
curl http://localhost:8080/

# Backend
curl http://localhost:5000/api/health

# Frontend API
curl http://localhost:5000/api/auth/login
```

### View database:
```bash
# From server directory
# Open conference.db in any SQLite viewer
sqlite3 conference.db
.tables
SELECT * FROM users;
.quit
```

### Debug authentication:
```javascript
// In browser console:
localStorage.getItem('authToken')
// Compare with backend database token claim
```

### Reset everything:
```bash
# 1. Stop both servers (Ctrl+C)
# 2. Delete database
rm server/conference.db
# 3. Clear browser localStorage (F12 → Application → Clear All)
# 4. Restart backend
cd server && npm start
# 5. Restart frontend
npm run dev
# 6. Login again
```

---

**This structure ensures:**
- ✅ Clean separation of concerns
- ✅ Easy to find files
- ✅ Scalable architecture
- ✅ Clear dependency flow
- ✅ Protected and public routes
