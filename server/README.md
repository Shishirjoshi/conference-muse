# Conference Muse Backend

Authentication and user management server for Conference Muse application.

## Setup

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000` and initialize a SQLite database automatically.

## Demo Credentials

- **Email:** admin@conference.com
- **Password:** admin123

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/verify` - Verify token validity
- `GET /api/auth/me` - Get current user info (requires token)
- `POST /api/auth/logout` - Logout (requires token)

### User Management (Admin Only)

- `GET /api/auth/users` - Get all users
- `POST /api/auth/users` - Create new user
- `PUT /api/auth/users/:id` - Update user
- `DELETE /api/auth/users/:id` - Delete user

### Bookings

- `GET /api/bookings` - Get user's bookings (requires token)
- `POST /api/bookings` - Create booking (requires token)
- `DELETE /api/bookings/:conferenceId` - Cancel booking (requires token)

## Environment Variables

Create a `.env` file in the server directory:

```
JWT_SECRET=your-secret-key-change-this
PORT=5000
```

## Database

SQLite database is automatically created in `conference.db` file.

### Tables

- **users** - User accounts with roles (admin, participant)
- **bookings** - Conference bookings
