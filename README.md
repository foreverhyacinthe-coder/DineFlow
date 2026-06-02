# DineFlow

Restaurant management prototype with a React frontend and Express API.

## Project structure

```
DINEFLOW/
├── Backend/
│   ├── data/dineflow-data.js    # Shared seed data
│   └── src/                     # routes → controllers → services → models
└── Frontend/
    └── src/
        ├── api/                   # API client & hooks
        ├── auth/                  # AuthProvider, ProtectedRoute
        ├── components/
        │   ├── cards/             # DishCard, MenuCard, StatCard, …
        │   ├── charts/            # LineChart, HeatMap, DonutChart, …
        │   ├── layout/            # AdminShell, AuthShell, PublicTopbar, …
        │   └── ui/                # Icon, Buttons, Logo, Field, Card
        ├── data/dineflow-data.js  # Frontend fallback data
        ├── lib/                   # Utilities (download, initials)
        ├── pages/
        │   ├── admin/             # Dashboard, Menu, Kitchen, Staff, …
        │   ├── auth/              # SignIn, CreateAccount
        │   └── public/            # Landing, Discover, Customer menu
        ├── routes/AppRoutes.jsx   # All app routes
        └── styles/                # dineflow.css, auth.css (Tailwind in index.css)
```

Run everything from **`Frontend/`** and **`Backend/`** only. Duplicate files at the repo root were removed.

## Run locally

**Terminal 1 — API**

```bash
cd Backend
npm install
npm run dev
```

**Terminal 2 — UI**

```bash
cd Frontend
npm install
npm run dev
```

- App: http://localhost:5173  
- API: http://localhost:4000  

Vite proxies `/api` to the backend in development.

## Demo login

| Email | Password |
|-------|----------|
| `chef@dineflow.com` | `dineflow123` |

## Production build

```bash
cd Frontend
cp .env.example .env   # optional: set VITE_API_URL=http://localhost:4000
npm run build
npm run preview
```

Start the backend separately when using a production build.
