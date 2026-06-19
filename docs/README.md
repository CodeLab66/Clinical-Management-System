# VetOS Pro Documentation Pack

This folder contains the development documentation for **VetOS Pro**, a complete veterinary clinic management system.

The plan has been updated according to the latest decision:

- **Internal admin/dashboard system comes first.**
- **Public website comes last in the UI build order.**
- UI must cover **every feature and function** from the project brief.
- Frontend will be built first with mock data, but it must remain compatible with a later Django + PostgreSQL backend.
- UI direction: **Bookary-style SaaS dashboard structure + grey/orange glassmorphism theme**.
- Appointment MVP: **form, call button, WhatsApp button, manual reception confirmation**.
- Loyalty/membership module is not included.

## Files in this folder

| File | Purpose |
|---|---|
| `ui-style-guide.md` | Final design theme, colors, layout rules, component rules, UI behavior, and module design direction. |
| `frontend-architecture.md` | React/Vite frontend structure, routing, components, services, mock API pattern, and backend compatibility rules. |
| `api-contract.md` | Planned REST API endpoints, request/response shapes, status enums, errors, and integration rules. |
| `mock-data-contract.md` | Mock data models that must match future Django API responses. |
| `backend-plan.md` | Django + PostgreSQL backend architecture, apps, models, auth, media, PDFs, deployment plan. |
| `development-phases.md` | Final phase-by-phase build order with admin dashboards first and public website last. |
| `ui-screen-inventory.md` | Complete checklist of UI screens/actions for every module and functionality. |
| `codex-development-prompts.md` | Phase-by-phase prompts to give Codex during development. |

## Reference assets to keep with this folder

Place these files in the same docs folder or project root:

- `project-brief.pdf` — original VetOS Pro brief.
- `ui-reference-1.png` — grey glassmorphism dashboard reference.
- `ui-reference-2.png` — Bookary SaaS dashboard reference.

## High-level development rule

Do not build the whole project in one prompt. Build one phase at a time:

1. Setup and architecture.
2. Design system.
3. Internal layout.
4. Admin dashboard.
5. Reception.
6. Queue and emergency.
7. Clients and pets.
8. Doctor and EMR.
9. Lab, imaging, pharmacy, inventory, billing.
10. Extra services, reports, settings.
11. Public website last.
12. Backend.
13. API integration.
