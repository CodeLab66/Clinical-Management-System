# VetOS Pro Frontend Architecture

## 1. Goal

The frontend will be built first as a complete UI system with mock data. It must be compatible with a future Django REST Framework backend.

The main rule:

> Build UI now, but structure it like a real API-based production frontend.

## 2. Frontend stack

```text
React + Vite
Tailwind CSS
shadcn/ui
Lucide React
React Router
React Hook Form
Zod
Axios
Recharts
```

## 3. Core architecture rule

Do not hardcode data inside page components.

Bad:

```jsx
const pets = [{ name: "Max" }];
```

Good:

```jsx
const pets = await petService.getPets();
```

During UI-only development, services return mock data. Later, the same services will call Django APIs.

## 4. Frontend folder structure

```text
vetos-pro-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── cards/
│   │   ├── tables/
│   │   ├── forms/
│   │   ├── charts/
│   │   ├── modals/
│   │   ├── badges/
│   │   └── empty-states/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── branches/
│   │   ├── staff/
│   │   ├── clients/
│   │   ├── pets/
│   │   ├── appointments/
│   │   ├── queue/
│   │   ├── emergency/
│   │   ├── consultations/
│   │   ├── prescriptions/
│   │   ├── vaccination/
│   │   ├── deworming/
│   │   ├── lab/
│   │   ├── imaging/
│   │   ├── surgery/
│   │   ├── dentistry/
│   │   ├── pharmacy/
│   │   ├── inventory/
│   │   ├── billing/
│   │   ├── grooming/
│   │   ├── boarding/
│   │   ├── consent/
│   │   ├── communications/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── audit/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── styles/
│   └── lib/
├── .env
├── package.json
└── README.md
```

## 5. Routing structure

Public website is built last, but routes are reserved from the start.

```text
/login
/forgot-password

/app/overview
/app/appointments
/app/appointment-requests
/app/queue
/app/emergency-checkin
/app/clients
/app/clients/new
/app/clients/:clientId
/app/pets
/app/pets/new
/app/pets/:petId
/app/doctor/dashboard
/app/consultations
/app/consultations/:visitId
/app/prescriptions
/app/prescriptions/:prescriptionId
/app/vaccinations/:petId
/app/deworming/:petId
/app/lab/dashboard
/app/lab/orders
/app/lab/orders/:orderId
/app/lab/result-entry/:orderId
/app/imaging
/app/imaging/:orderId
/app/pharmacy/queue
/app/pharmacy/dispense/:prescriptionId
/app/inventory
/app/inventory/new
/app/inventory/alerts
/app/inventory/suppliers
/app/inventory/purchase-orders
/app/billing
/app/billing/:billId
/app/pos-handoff
/app/surgery
/app/surgery/:procedureId
/app/dentistry
/app/dentistry/:caseId
/app/grooming
/app/grooming/:appointmentId
/app/boarding
/app/boarding/:bookingId
/app/consent-forms
/app/consent-forms/:formId
/app/branches
/app/staff
/app/doctor-schedules
/app/reports
/app/communications
/app/audit-logs
/app/settings

/public
/public/services
/public/branches
/public/doctors
/public/appointment
/public/emergency
/public/contact
```

## 6. Layout architecture

### AppShell
Used by all internal system pages.

Contains:

- Sidebar.
- Topbar.
- Main content wrapper.
- Optional right panel.

### PublicLayout
Used only by public website pages, built near the end of UI development.

### AuthLayout
Used for login and forgot password pages.

## 7. Service layer pattern

Each module gets a service file.

Example:

```text
services/petService.js
services/clientService.js
services/appointmentService.js
services/queueService.js
```

Service files must support mock mode and API mode.

```js
const useMocks = import.meta.env.VITE_USE_MOCKS === "true";
```

Example service:

```js
import apiClient from "./apiClient";
import { mockPets } from "../data/mockPets";

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const petService = {
  async getPets() {
    if (useMocks) return Promise.resolve(mockPets);
    const response = await apiClient.get("/pets/");
    return response.data;
  },

  async getPetById(id) {
    if (useMocks) return Promise.resolve(mockPets.find((p) => p.id === Number(id)));
    const response = await apiClient.get(`/pets/${id}/`);
    return response.data;
  },
};
```

## 8. API client

```js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## 9. Environment variables

Development mock mode:

```text
VITE_USE_MOCKS=true
VITE_API_BASE_URL=http://localhost:8000/api
```

Backend integration mode:

```text
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8000/api
```

Production:

```text
VITE_USE_MOCKS=false
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 10. Data fetching rules

Every page should have:

- Loading state.
- Error state.
- Empty state.
- Success state for actions.

During mock mode, fake a short delay so loading states can be designed.

## 11. Form rules

Use:

```text
React Hook Form + Zod
```

Every form should have:

- Schema validation.
- Default values.
- Error messages.
- Submit/loading state.
- Cancel/reset action.

## 12. Component rules

- Pages fetch data.
- Feature components receive props.
- Reusable UI components must not know business logic.
- Keep tables reusable.
- Keep modals reusable.
- Keep status badge mapping centralized.

## 13. State management

For the UI-only demo, start with:

- React state.
- Context for role/demo session.
- Mock services.

If the clickable workflow becomes complex, add Zustand later.

## 14. Role-based UI

Roles:

- Super Admin.
- Branch Admin.
- Receptionist.
- Veterinarian.
- Lab Staff.
- Imaging Staff.
- Pharmacy Staff.
- Inventory Manager.
- Grooming Staff.
- Boarding Staff.
- Accountant.
- Viewer.

For frontend prototype, role switching can be simulated.

## 15. Development order

Public website is intentionally last.

1. Project setup.
2. Design system.
3. Internal AppShell.
4. Admin dashboard.
5. Branch/staff/settings foundation.
6. Reception.
7. Queue and emergency.
8. Clients/pets.
9. Doctor/EMR.
10. Lab/imaging.
11. Pharmacy/inventory/billing.
12. Extra services/reports/audit/settings.
13. Public website.
