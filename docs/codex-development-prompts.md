# VetOS Pro Codex Development Prompts

Use these prompts one by one. Do not give Codex the whole project at once.

## Prompt 1: Project setup

```text
You are building VetOS Pro, a complete veterinary clinic management frontend.

Phase 1 only: create the React + Vite frontend foundation.

Tech stack:
- React + Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Router
- Axios
- React Hook Form
- Zod
- Recharts

Important:
- Do not build all pages yet.
- Create folder structure according to docs/frontend-architecture.md.
- Setup global CSS variables from docs/ui-style-guide.md.
- Setup routing placeholders.
- Setup AppShell placeholder, Sidebar placeholder, Topbar placeholder.
- Setup services folder and mock data folder.
- Use VITE_USE_MOCKS=true.
- App must run without errors.
```

## Prompt 2: Design system

```text
Phase 2 only: build reusable UI components for VetOS Pro.

Use the grey/orange glassmorphism theme from docs/ui-style-guide.md.

Build these components:
- GlassCard
- StatCard
- MetricCard
- StatusBadge
- PriorityBadge
- PageHeader
- SearchBar
- BranchSelector
- DateFilter
- DataTable
- TableCard
- ActionButton
- ConfirmModal
- DetailModal
- FormCard
- FileUploadCard
- PDFPreviewCard
- Timeline
- ActivityFeed
- QueueCard
- KanbanColumn
- ChartCard
- EmptyState
- LoadingSkeleton
- ErrorState

Create a design-system preview page under /app/design-system.
Do not build feature pages yet.
```

## Prompt 3: Internal layout and auth

```text
Phase 3 only: build login UI and internal AppShell.

Build:
- Login page
- Forgot password page
- AppShell
- Sidebar
- Topbar
- Role switcher for prototype

Sidebar must use grouped menu:
MAIN MENU, CLINIC OPERATIONS, SERVICES, MANAGEMENT, OTHERS.

Use Bookary-style internal dashboard structure and orange active states.
Public website must not be built yet.
```

## Prompt 4: Admin dashboard

```text
Phase 4 only: build the Admin Overview dashboard.

Use dummy data through reportService, not hardcoded arrays inside the page.

Dashboard must include:
- Today revenue
- Today appointments
- Active queue
- Emergency cases
- Pending lab reports
- Pharmacy pending
- Low stock items
- Near expiry medicines
- Revenue breakdown chart
- Most used services chart
- Appointment trend chart
- Branch performance chart
- Recent activities panel
- Critical cases panel
- Top doctors panel
- Inventory alerts panel

Match the Bookary dashboard layout but with grey/orange VetOS theme.
```

## Prompt 5: Branch, staff, roles, schedules

```text
Phase 5 only: build admin foundation screens.

Build:
- Branch list
- Add/edit branch form
- Branch profile with tabs
- Staff list
- Add/edit staff form
- Staff profile
- Roles and permissions matrix
- Doctor schedule page

Use services and mock data. Do not connect backend yet.
```

## Prompt 6: Reception and appointment requests

```text
Phase 6 only: build reception dashboard and appointment request inbox.

Build:
- Reception dashboard
- Appointment request inbox
- Request detail modal
- Confirm request modal
- Reschedule modal
- Convert request to appointment modal
- Quick create client/pet modal

Actions can update local/mock state.
Include call and WhatsApp buttons as UI actions.
```

## Prompt 7: Appointment calendar

```text
Phase 7 only: build appointment calendar.

Build:
- Day view
- Week view
- Month view
- Doctor view
- Branch view
- Appointment detail modal
- Create/edit appointment modal

Actions:
- Assign doctor
- Assign branch
- Mark checked in
- Add to queue
- Mark no-show
- Cancel appointment
```

## Prompt 8: Queue and emergency

```text
Phase 8 only: build queue board and emergency management.

Build:
- Queue board with Kanban columns
- Queue card actions
- Emergency fast check-in
- Emergency dashboard
- Emergency case detail

Use priority badges: normal, urgent, emergency, critical.
Emergency/critical must use red visual treatment.
```

## Prompt 9: Clients and pets

```text
Phase 9 and 10: build client and pet management.

Build:
- Client list
- Add/edit client
- Client profile with tabs
- Pet list
- Add/edit pet
- Pet profile with left identity card, center timeline, right owner/actions card
- Pet tabs for visits, prescriptions, labs, imaging, vaccination, deworming, grooming, boarding, billing, files

Pet profile is a key selling screen. Make it visually premium.
```

## Prompt 10: Doctor and EMR

```text
Phase 11 and 12 only: build doctor workflow.

Build:
- Doctor dashboard
- Consultation list
- Consultation/SOAP page
- Clinical templates list/editor
- Prescription list/create/detail
- Vaccination page/card preview
- Deworming page

SOAP page layout:
- Left pet summary
- Center SOAP form tabs
- Right previous history
- Bottom action bar
```

## Prompt 11: Lab and imaging

```text
Phase 13 only: build lab and imaging workflow.

Build:
- Lab dashboard
- Lab orders table
- Lab order detail
- Lab result entry
- Lab report preview
- Imaging orders
- Imaging report entry

Include abnormal result highlighting and doctor review status.
```

## Prompt 12: Pharmacy and inventory

```text
Phase 14 only: build pharmacy and inventory.

Build:
- Pharmacy queue
- Dispense medicine page
- Inventory list
- Add/edit inventory item
- Stock alerts
- Suppliers page
- Purchase orders page
- Stock movement modals

Inventory must show batch, expiry, quantity, minimum stock, and status badges.
```

## Prompt 13: Billing and POS handoff

```text
Phase 15 only: build billing and POS handoff UI.

Build:
- Billing summary list
- Bill detail page
- POS handoff page
- Payment status modal
- Export/print placeholders

Do not create full POS replacement. This is only a billing summary and handoff workflow.
```

## Prompt 14: Surgery, dentistry, consent

```text
Phase 16 only: build surgery, dentistry, and consent UI.

Build:
- Surgery/procedure list
- Surgery detail page
- Pre-op checklist
- Operation notes
- Post-op monitoring
- Dentistry case list
- Dentistry detail page
- Consent form list
- Consent form detail
- Consent PDF preview
```

## Prompt 15: Grooming and boarding

```text
Phase 17 only: build grooming and boarding UI.

Build:
- Grooming dashboard
- Grooming list
- Grooming detail
- Boarding dashboard
- Boarding list
- Boarding detail
- Daily update form
```

## Prompt 16: Communications, reports, audit, settings

```text
Phase 18 only: build communication logs, reports, audit logs, and settings.

Build:
- Communication logs
- Message templates
- Reports dashboard
- Business reports
- Medical reports
- Inventory reports
- Staff reports
- Branch reports
- Audit logs
- Security settings
- Main settings page with tabs
```

## Prompt 17: Full clickable internal demo flow

```text
Phase 19 only: connect the internal mock demo flow.

Create a realistic flow using mock/local state:
1. Appointment request in reception inbox
2. Confirm request
3. Appointment appears in calendar
4. Check in pet
5. Add pet to queue
6. Doctor starts consultation
7. SOAP note created
8. Prescription created
9. Lab order created
10. Lab result entered
11. Pharmacy dispenses medicine
12. Inventory stock visually updates
13. Billing summary generated
14. POS status marked
15. Visit completed
16. Pet timeline updated

No backend. Use mock services/local state.
```

## Prompt 18: Public website last

```text
Phase 20 only: build the public website UI after the internal system is complete.

Build:
- Public home page
- Services page
- Branches page
- Doctors page
- Appointment form page
- Emergency page
- Contact page

Use the same grey/orange theme but make it more landing-page style.
Appointment form should show fake success modal and later connect to appointment requests.
```
