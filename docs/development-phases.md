# VetOS Pro Development Phases

## 1. Important updated decision

The public website will be built **last** in the UI development order.

Reason:

The main product value is the internal clinic management system. Admin, reception, doctor workflow, EMR, queue, lab, pharmacy, inventory, billing, reports, and operational modules should be completed first. The public website is simpler and should be added after the internal system is visually complete.

## 2. Development method

Use Codex phase by phase.

Do not ask Codex to build the full system in one prompt.

Each phase should produce:

- Working pages.
- Reusable components.
- Dummy data.
- Service-layer structure.
- Responsive UI.
- No backend dependency yet.

## Phase 0: Documentation setup

### Goal
Create the docs folder and final project rules.

### Deliverables

- `ui-style-guide.md`
- `frontend-architecture.md`
- `api-contract.md`
- `mock-data-contract.md`
- `backend-plan.md`
- `development-phases.md`
- `ui-screen-inventory.md`
- `codex-development-prompts.md`

## Phase 1: Frontend project setup

### Goal
Create React/Vite project foundation.

### Tasks

- Create React + Vite app.
- Install Tailwind CSS.
- Install shadcn/ui.
- Install Lucide React.
- Install React Router.
- Install Axios.
- Install React Hook Form.
- Install Zod.
- Install Recharts.
- Setup path aliases.
- Setup global CSS variables.
- Setup routes.
- Setup mock data folder.
- Setup services folder.

### Deliverable
Working empty frontend with placeholder routes.

## Phase 2: Design system

### Goal
Build reusable components before pages.

### Components

- GlassCard.
- StatCard.
- MetricCard.
- StatusBadge.
- PriorityBadge.
- PageHeader.
- SearchBar.
- BranchSelector.
- DateFilter.
- DataTable.
- TableCard.
- ActionButton.
- ConfirmModal.
- DetailModal.
- FormCard.
- FileUploadCard.
- PDFPreviewCard.
- Timeline.
- ActivityFeed.
- QueueCard.
- KanbanColumn.
- ChartCard.
- EmptyState.
- LoadingSkeleton.
- ErrorState.

### Deliverable
Design system preview page.

## Phase 3: Internal layout and auth UI

### Goal
Create the complete internal system shell.

### Tasks

- Build Login page.
- Build Forgot Password page.
- Build AppShell.
- Build Sidebar.
- Build Topbar.
- Add grouped sidebar menu.
- Add role switcher for prototype.
- Add dummy authentication state.

### Deliverable
User can enter internal dashboard and switch roles.

## Phase 4: Admin overview dashboard

### Goal
Build main Bookary-style dashboard.

### UI sections

- Revenue card.
- Appointments card.
- Queue card.
- Emergency card.
- Lab pending card.
- Pharmacy pending card.
- Inventory alert card.
- Revenue breakdown chart.
- Most used services chart.
- Appointment trend chart.
- Branch performance chart.
- Recent activities panel.
- Critical cases panel.
- Top doctors panel.
- Inventory alerts panel.

### Deliverable
Complete internal system overview dashboard.

## Phase 5: Branch management, staff, roles, doctor schedules

### Goal
Build admin foundation screens.

### Screens

- Branch list.
- Add/edit branch.
- Branch profile.
- Staff list.
- Add/edit staff.
- Staff profile.
- Roles and permissions.
- Doctor schedule calendar.

### Deliverable
Admin can visually manage branches, users, roles, and schedules.

## Phase 6: Reception dashboard and appointment requests

### Goal
Build front-desk workflow.

### Screens

- Reception dashboard.
- Appointment request inbox.
- Appointment request detail modal.
- Convert request to appointment modal.
- Reschedule modal.
- Client/pet quick creation modal.

### Functions with UI

- Search client by phone.
- View new requests.
- Mark contacted.
- Call button.
- WhatsApp button.
- Confirm request.
- Reschedule request.
- Cancel/reject request.
- Convert request to appointment.

## Phase 7: Appointment calendar

### Goal
Build calendar for confirmed appointments.

### Screens

- Day view.
- Week view.
- Month view.
- Doctor view.
- Branch view.
- Appointment detail modal.
- Create/edit appointment modal.

### Functions with UI

- Create appointment.
- Assign doctor.
- Assign branch.
- Assign room.
- Mark checked in.
- Add to queue.
- Mark no-show.
- Cancel appointment.

## Phase 8: Queue and emergency management

### Goal
Build live patient flow and emergency workflow.

### Screens

- Queue board.
- Queue entry detail modal.
- Emergency fast check-in.
- Emergency dashboard.
- Emergency case detail.

### Functions with UI

- Move queue item.
- Send to doctor.
- Send to lab.
- Send to imaging.
- Send to pharmacy.
- Send to billing.
- Mark completed.
- Create emergency case.
- Set triage level.
- Add emergency notes.

## Phase 9: Client management

### Goal
Build owner/client management.

### Screens

- Client list.
- Add/edit client.
- Client profile.
- Client appointments tab.
- Client visits tab.
- Client invoices tab.
- Client communication tab.

### Functions with UI

- Add client.
- Edit client.
- Search by phone.
- Add pet under client.
- Create appointment.
- Call.
- WhatsApp.
- Add communication log.

## Phase 10: Pet management and pet timeline

### Goal
Build the most important profile screen.

### Screens

- Pet list.
- Add/edit pet.
- Pet profile.
- Pet medical timeline.
- Pet prescriptions tab.
- Pet lab reports tab.
- Pet imaging tab.
- Pet vaccination tab.
- Pet deworming tab.
- Pet grooming tab.
- Pet boarding tab.
- Pet billing tab.
- Pet files tab.

### Functions with UI

- Add pet.
- Edit pet.
- Upload photo placeholder.
- Add allergy.
- Add warning.
- Add weight record.
- Start consultation.
- Order lab.
- Request imaging.
- Add vaccine.
- Add deworming.
- Schedule follow-up.

## Phase 11: Doctor dashboard and EMR/SOAP

### Goal
Build doctor workflow.

### Screens

- Doctor dashboard.
- Consultation list.
- Consultation detail.
- SOAP note form.
- Previous visit panel.
- Follow-up form.

### Functions with UI

- View today’s patients.
- Start consultation.
- Save draft.
- Write SOAP note.
- Add diagnosis.
- Add treatment plan.
- Complete visit.
- Schedule follow-up.

## Phase 12: Clinical templates, prescriptions, vaccination, deworming

### Goal
Build medical support workflows.

### Screens

- Clinical template list.
- Clinical template editor.
- Prescription list.
- Prescription creation page.
- Prescription detail/PDF preview.
- Vaccination page.
- Vaccination card preview.
- Deworming page.

### Functions with UI

- Use template.
- Save template.
- Create prescription.
- Add medicine rows.
- Send to pharmacy.
- Add vaccination record.
- Set next due date.
- Add deworming record.

## Phase 13: Lab and imaging

### Goal
Build diagnostics workflow.

### Screens

- Lab dashboard.
- Lab orders.
- Lab order detail.
- Lab result entry.
- Lab report preview.
- Imaging orders.
- Imaging report entry.

### Functions with UI

- Mark sample collected.
- Enter result.
- Highlight abnormal values.
- Upload report placeholder.
- Send for doctor review.
- Mark completed.
- Add imaging findings.
- Attach imaging report.

## Phase 14: Pharmacy and inventory

### Goal
Build medicine dispensing and stock management.

### Screens

- Pharmacy queue.
- Dispense medicine page.
- Inventory list.
- Add/edit inventory item.
- Stock alerts.
- Suppliers.
- Purchase orders.
- Stock movement.

### Functions with UI

- View prescriptions.
- Check stock.
- Select batch.
- Dispense full.
- Partial dispense.
- Mark unavailable.
- Request substitute.
- Stock in/out.
- Transfer stock.
- Adjust stock.
- Create purchase order.

## Phase 15: Billing and POS handoff

### Goal
Build billing summary without replacing POS.

### Screens

- Billing summary list.
- Bill detail.
- POS handoff page.
- Payment status modal.
- Billing export placeholder.

### Functions with UI

- Add billable item.
- Mark sent to POS.
- Mark paid.
- Mark pending.
- Mark partial.
- Export CSV placeholder.
- Print billing summary placeholder.

## Phase 16: Surgery, dentistry, consent forms

### Goal
Build procedure workflows.

### Screens

- Surgery/procedure list.
- Surgery detail.
- Pre-op checklist.
- Operation notes.
- Post-op monitoring.
- Dentistry case list.
- Dentistry detail.
- Consent form list.
- Consent form detail.
- Consent PDF preview.

### Functions with UI

- Book procedure.
- Assign surgeon.
- Add anesthesia plan.
- Generate consent.
- Add operation notes.
- Add dental notes.
- Mark consent signed.
- Attach form to pet record.

## Phase 17: Grooming and boarding

### Goal
Build optional service modules.

### Screens

- Grooming dashboard.
- Grooming list.
- Grooming detail.
- Boarding dashboard.
- Boarding list.
- Boarding detail.
- Daily update form.

### Functions with UI

- Create grooming appointment.
- Add grooming notes.
- Upload before/after photo placeholder.
- Mark grooming complete.
- Create boarding booking.
- Check in/out.
- Assign kennel.
- Add feeding record.
- Add medication record.
- Add daily update.

## Phase 18: Communications, reports, audit logs, settings

### Goal
Build management and control screens.

### Screens

- Communication logs.
- Message templates.
- Reports dashboard.
- Business reports.
- Medical reports.
- Inventory reports.
- Staff reports.
- Branch reports.
- Audit logs.
- Security settings.
- General settings.
- Services/pricing settings.
- Templates settings.

### Functions with UI

- Log communication.
- Copy WhatsApp message.
- Create template.
- Filter reports.
- Export placeholder.
- Filter audit logs.
- Update settings.

## Phase 19: Full clickable internal demo flow

### Goal
Make the internal system feel connected.

### Demo flow

1. Appointment request exists in reception inbox.
2. Reception confirms it.
3. Appointment appears in calendar.
4. Pet is checked in.
5. Pet enters queue.
6. Doctor starts consultation.
7. SOAP note is created.
8. Prescription is created.
9. Lab order is created.
10. Lab result is entered.
11. Pharmacy dispenses medicine.
12. Inventory stock visually updates.
13. Billing summary is generated.
14. POS status is marked.
15. Visit is completed.
16. Pet timeline shows all events.

## Phase 20: Public website UI last

### Goal
Build customer-facing website after internal system is complete.

### Screens

- Home page.
- Services page.
- Branches page.
- Doctors page.
- Appointment form page.
- Emergency page.
- Contact page.

### Functions with UI

- Submit appointment request.
- Show success modal.
- Call button.
- WhatsApp button.
- Emergency call button.

## Phase 21: Backend foundation

### Goal
Create Django backend.

### Tasks

- Setup Django.
- Setup PostgreSQL.
- Setup DRF.
- Add JWT/auth.
- Add core models.
- Add serializers.
- Add viewsets.
- Add admin panel.

## Phase 22: API integration

### Goal
Replace mock services with real API calls.

### Rule
Only service files should change where possible. UI components should remain mostly unchanged.

## Phase 23: PDFs, file uploads, deployment

### Goal
Prepare production features.

### Tasks

- Prescription PDF.
- Lab report PDF.
- Vaccination card PDF.
- Billing summary PDF.
- Consent form PDF.
- File uploads.
- Deployment.
- Backup.
