# VetOS Pro UI Style Guide

## 1. Final UI direction

VetOS Pro will use a hybrid design approach:

> **Bookary-style SaaS dashboard structure + grey/orange glassmorphism theme.**

The internal clinic system should feel like a serious operational dashboard, not a simple website. The UI should be suitable for admin, reception, doctors, lab, pharmacy, inventory, billing, grooming, boarding, and branch management.

## 2. Design references

### UI Reference 1: Grey Glassmorphism Dashboard
Use this reference for:

- Soft grey background.
- Rounded cards.
- Transparent/frosted panels.
- Premium visual depth.
- Public website later.
- Pet profile hero-style sections.

### UI Reference 2: Bookary Dashboard
Use this reference for:

- Internal system layout.
- Left sidebar.
- Top search bar.
- Dashboard grid.
- Stat cards.
- Right activity panel.
- Tables and charts.
- Management screens.

## 3. Final visual identity

The internal system should look:

- Clean.
- Premium.
- Data-heavy but readable.
- Warm and modern.
- Professional for clinic staff.
- Not childish or cartoonish.

Use pet/medical icons but avoid making the UI look like a kids' pet app.

## 4. Color palette

Use orange as the primary brand color. Do not use green as the main color.

```css
:root {
  --bg-main: #F1F2EE;
  --bg-soft: #E7E4DD;
  --bg-sidebar: rgba(255, 255, 255, 0.72);

  --card-bg: rgba(255, 255, 255, 0.72);
  --card-bg-soft: rgba(255, 255, 255, 0.52);
  --card-border: rgba(255, 255, 255, 0.55);

  --primary: #E9783A;
  --primary-dark: #C95B23;
  --primary-soft: #FFE0CC;

  --text-main: #151515;
  --text-secondary: #626262;
  --text-muted: #8A8A8A;

  --success: #4F8F68;
  --warning: #E9A23B;
  --danger: #D64545;
  --info: #4C7FAF;

  --white: #FFFFFF;
}
```

## 5. Color usage rules

### Orange
Use orange for:

- Primary buttons.
- Active sidebar item.
- Main CTA.
- Selected tabs.
- Active filters.
- Important chart highlights.
- Confirm appointment actions.
- Main workflow action buttons.

### Red
Use red only for:

- Emergency.
- Critical triage.
- Dangerous delete actions.
- Expired stock.
- Severe medical warning.

### Green
Use green only for:

- Completed.
- Stable.
- Paid.
- Normal status.
- Available stock.

### Yellow/orange warning
Use warning color for:

- Pending.
- Waiting.
- Near expiry.
- Urgent but not critical.

## 6. Typography

Recommended fonts:

```text
Headings: Manrope
Body: Inter
```

Typography rules:

- Page titles should be strong and clear.
- Section headings should be medium weight.
- Table text should remain readable.
- Avoid tiny text below 12px.
- Important numbers should be large and bold.

## 7. Global background

Use a soft grey/cream gradient:

```css
body {
  background: linear-gradient(135deg, #F1F2EE 0%, #E7E4DD 100%);
  color: #151515;
}
```

## 8. Card style

Default card:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.07);
}
```

Card rules:

- Use `24px` radius for normal cards.
- Use `28px` to `32px` radius for hero/profile cards.
- Use subtle shadows only.
- Avoid thick borders.
- Use consistent padding: `20px`, `24px`, or `28px`.

## 9. Button style

Primary button:

```css
.btn-primary {
  background: #E9783A;
  color: white;
  border-radius: 999px;
  padding: 11px 22px;
  font-weight: 600;
  box-shadow: 0 12px 25px rgba(233, 120, 58, 0.25);
}
```

Secondary button:

```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.72);
  color: #151515;
  border: 1px solid rgba(255,255,255,0.55);
  border-radius: 999px;
}
```

Emergency button:

```css
.btn-emergency {
  background: #D64545;
  color: white;
  border-radius: 999px;
}
```

## 10. Sidebar design

Use Bookary-style grouped sidebar.

### Sidebar groups

```text
MAIN MENU
- Overview
- Appointments
- Requests
- Queue
- Clients
- Pets
- Consultations

CLINIC OPERATIONS
- Lab & Diagnostics
- Imaging
- Pharmacy
- Inventory
- Billing / POS Handoff

SERVICES
- Emergency
- Surgery & Procedures
- Dentistry
- Grooming
- Boarding

MANAGEMENT
- Branches
- Staff
- Doctor Schedules
- Reports & Analytics
- Communication Logs
- Audit Logs
- Settings

OTHERS
- Help & Support
- Log Out
```

### Sidebar rules

- Sidebar width: around `260px`.
- Active item: orange background, white text, rounded pill.
- Icons: Lucide React.
- Keep labels short.
- Use group headings in small uppercase muted text.

## 11. Topbar design

Topbar should contain:

- Page title area.
- Global search.
- Branch selector.
- Date filter.
- Notifications.
- Settings shortcut.
- User avatar.

Topbar should stay clean and not overcrowded.

## 12. Dashboard layout pattern

Use a 12-column responsive grid.

Recommended layout:

- Left main area: 8 or 9 columns.
- Right activity panel: 3 or 4 columns.
- Stat cards in grid.
- Charts below stat cards.
- Tables below charts.

## 13. Table design

Tables should use:

- Rounded card container.
- Sticky header if table is long.
- Clear row hover.
- Status badges.
- Compact action buttons.
- Search and filters above table.

## 14. Form design

Forms should be inside `FormCard` components.

Form rules:

- Use labels above fields.
- Use clear validation messages.
- Use 2-column layout on desktop.
- Use 1-column layout on mobile.
- Put save/cancel actions at bottom right.
- Use required field markers.

## 15. Badge rules

Create reusable `StatusBadge` and `PriorityBadge`.

Common statuses:

```text
new_request
contacted
confirmed
rescheduled
cancelled
checked_in
waiting
in_consultation
lab_pending
imaging_pending
pharmacy_pending
billing_pending
completed
no_show
critical
urgent
stable
paid
partial
pending
```

## 16. Chart style

Use Recharts.

Charts should use:

- Orange as main highlight.
- Muted greys for secondary data.
- Green for positive/success.
- Red for critical/loss.
- Rounded chart cards.
- Clear labels.

## 17. Module-specific UI direction

### Admin dashboard
Use Bookary-style dashboard with top KPI cards, charts, tables, and right-side activity feed.

### Reception dashboard
Use operational layout: appointment request inbox, queue preview, selected pet/client summary, quick actions.

### Queue board
Use Kanban-style columns and queue cards. Emergency cards must be visually urgent.

### Pet profile
Use premium card-heavy layout. This is a selling screen. Include pet photo, warnings, owner, timeline, and quick actions.

### Doctor consultation
Use clarity over beauty. Left pet summary, center SOAP note form, right history panel, bottom action bar.

### Lab/imaging
Use task queue + result-entry layout.

### Pharmacy
Use prescription queue + dispensing detail layout.

### Inventory
Use data table, stock alert cards, batch/expiry fields, and supplier views.

### Billing/POS handoff
Use bill summary card, billable item table, payment status, and POS status.

### Reports
Use dashboard cards, charts, filters, and export buttons.

### Public website
Build last. It may use more visual landing-page styling with larger hero sections and public CTAs.

## 18. Responsive rules

- Desktop-first for clinic staff dashboard.
- Minimum good desktop width: 1366px.
- Tablet support should not break layout.
- Mobile support required for public website and simple staff tasks.
- Tables can horizontally scroll on small screens.

## 19. UI quality checklist

Before moving to backend, every UI page must have:

- Correct layout.
- Dummy data.
- Loading state.
- Empty state.
- Error state.
- Search/filter if relevant.
- Status badges.
- Action buttons.
- Modals where needed.
- Responsive layout.
- Consistent theme.
