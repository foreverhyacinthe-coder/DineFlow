# DineFlow Backend

Express API with a clear **routes → controllers → services → models** layout.

## Structure

```
Backend/
├── data/
│   └── dineflow-data.js      # Seed / static catalog data
└── src/
    ├── server.js               # Entry point
    ├── app.js                  # Express app setup
    ├── config/
    ├── middleware/             # CORS, auth, errors
    ├── routes/                 # URL definitions
    ├── controllers/            # Request / response handling
    ├── services/               # Business logic
    ├── models/                 # Data shapes + in-memory store
    └── utils/
```

## Run

```bash
npm install
npm run dev
```

API: http://localhost:4000

## Authentication

Uses **bcrypt** for passwords and **JWT** bearer tokens.

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |
| GET | `/api/auth/me` | Bearer token |

Demo user (created on startup):

- Email: `chef@dineflow.com`
- Password: `dineflow123`

Send the token from login/register:

```
Authorization: Bearer <token>
```

## Main API routes

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/health` | — | Health check |
| GET | `/api/menu` | — | List menu |
| POST | `/api/menu` | Yes | Add menu item |
| PATCH | `/api/menu/:id` | Yes | Update item (e.g. stock) |
| GET | `/api/orders` | Yes | List orders (admin) |
| POST | `/api/orders` | Optional | Guest checkout |
| GET | `/api/kitchen` | — | Kitchen kanban board |
| PATCH | `/api/kitchen/advance` | Yes | Move kitchen ticket |
| GET | `/api/overview` | — | Dashboard overview |
| GET | `/api/analytics` | — | Analytics |
| GET | `/api/staff` | — | Staff |
| GET | `/api/billing` | — | Billing |
| GET | `/api/reservations` | — | Reservations |
| GET | `/api/operations` | — | Operations |
| GET | `/api/public-menu` | — | Public discover data |

## Environment

| Variable | Default |
|----------|---------|
| `PORT` | `4000` |
| `JWT_SECRET` | dev secret (set in production) |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `*` |

Data is stored **in memory** and resets when the server restarts.
