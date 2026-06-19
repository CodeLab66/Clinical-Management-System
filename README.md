# VetOS Pro Frontend

Phase 1 foundation for the VetOS Pro veterinary clinic management system.

## Stack

- React + Vite
- Tailwind CSS
- shadcn/ui-ready configuration
- React Router
- Lucide React
- Axios
- React Hook Form + Zod
- Recharts

## Getting Started

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```

## Environment

Copy `.env.example` to `.env` for local development when needed.

```text
VITE_USE_MOCKS=true
VITE_API_BASE_URL=http://localhost:8000/api
```

Mock mode keeps all service calls local. Later, set `VITE_USE_MOCKS=false` and the service layer will call the Django REST Framework API through `src/services/apiClient.js`.

## Phase 1 Scope

This phase includes project setup, theme variables, routing, the internal AppShell, starter UI components, backend-ready folders, mock data, and async services. Feature pages and the public website are intentionally placeholders for later phases.
