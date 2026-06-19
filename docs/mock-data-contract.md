# VetOS Pro Mock Data Contract

## 1. Purpose

The frontend will be built first with mock data. This mock data must match the future Django API response structure.

The goal is to avoid rewriting UI later.

## 2. General mock data rules

All mock records must:

- Include `id`.
- Use backend-style field names.
- Use ISO date format: `YYYY-MM-DD`.
- Use ISO datetime format: `YYYY-MM-DDTHH:mm:ssZ`.
- Use controlled status values.
- Use IDs for relationships.
- Use nested objects only when needed for display.

Bad:

```js
{ name: "Max", status: "Pet is waiting" }
```

Good:

```js
{
  id: 1,
  name: "Max",
  status: "waiting_doctor"
}
```

## 3. Mock files

```text
src/data/
├── mockUsers.js
├── mockBranches.js
├── mockStaff.js
├── mockClients.js
├── mockPets.js
├── mockAppointments.js
├── mockAppointmentRequests.js
├── mockQueue.js
├── mockEmergencyCases.js
├── mockVisits.js
├── mockClinicalTemplates.js
├── mockPrescriptions.js
├── mockVaccinations.js
├── mockDeworming.js
├── mockLabOrders.js
├── mockImagingOrders.js
├── mockSurgeries.js
├── mockDentistry.js
├── mockPharmacy.js
├── mockInventory.js
├── mockBills.js
├── mockGrooming.js
├── mockBoarding.js
├── mockConsentForms.js
├── mockCommunications.js
├── mockReports.js
└── mockAuditLogs.js
```

## 4. Users

```js
export const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@vetos.com",
    role: "super_admin",
    branch_id: null,
    avatar_url: "/images/staff/admin.jpg",
    is_active: true,
  },
];
```

## 5. Branches

```js
export const mockBranches = [
  {
    id: 1,
    name: "DHA Branch",
    address: "DHA Lahore",
    phone: "0420000000",
    whatsapp: "03000000000",
    email: "dha@vetos.com",
    opening_time: "09:00",
    closing_time: "23:00",
    emergency_available: true,
    is_active: true,
  },
];
```

## 6. Staff

```js
export const mockStaff = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    email: "ahmed@vetos.com",
    phone: "03001234567",
    role: "veterinarian",
    department: "Medical",
    branch_id: 1,
    branch_name: "DHA Branch",
    specialization: "Small Animal Medicine",
    is_active: true,
    last_active_at: "2026-06-18T10:20:00Z",
  },
];
```

## 7. Clients

```js
export const mockClients = [
  {
    id: 1,
    name: "Ayesha Khan",
    phone: "03001234567",
    whatsapp: "03001234567",
    email: "ayesha@example.com",
    address: "Lahore",
    city: "Lahore",
    emergency_contact: "03210000000",
    preferred_branch_id: 1,
    preferred_doctor_id: 1,
    tags: ["regular"],
    total_pets: 2,
    total_visits: 8,
    total_spending: 78500,
    outstanding_balance: 2500,
    last_visit_date: "2026-06-18",
    notes: "Prefers WhatsApp communication",
  },
];
```

## 8. Pets

```js
export const mockPets = [
  {
    id: 1,
    name: "Max",
    species: "dog",
    breed: "German Shepherd",
    gender: "male",
    date_of_birth: "2023-04-12",
    age_label: "3 years",
    weight_kg: 28.5,
    color: "Black/Tan",
    owner_id: 1,
    owner: {
      id: 1,
      name: "Ayesha Khan",
      phone: "03001234567",
      whatsapp: "03001234567"
    },
    photo_url: "/images/pets/max.jpg",
    microchip_number: null,
    is_neutered: false,
    allergies: ["Penicillin"],
    chronic_diseases: [],
    current_medicines: [],
    warnings: ["Anxious during injections"],
    temperament: "anxious",
    bite_history: false,
    food_preference: "Dry food",
    vaccination_status: "due_soon",
    deworming_status: "up_to_date",
    last_visit_date: "2026-06-18",
    next_followup_date: "2026-06-21"
  },
];
```

## 9. Pet timeline

```js
export const mockPetTimeline = [
  {
    id: 1,
    pet_id: 1,
    type: "consultation",
    title: "Vomiting consultation",
    description: "SOAP note created and lab ordered",
    date: "2026-06-18",
    time: "16:40",
    related_record_id: 1,
  },
  {
    id: 2,
    pet_id: 1,
    type: "lab",
    title: "CBC ordered",
    description: "Doctor requested CBC and parvo test",
    date: "2026-06-18",
    time: "17:00",
    related_record_id: 4,
  }
];
```

## 10. Appointment requests

```js
export const mockAppointmentRequests = [
  {
    id: 1,
    owner_name: "Usman Ali",
    phone: "03215556677",
    whatsapp: "03215556677",
    email: "usman@example.com",
    pet_name: "Milo",
    species: "cat",
    breed: "Persian",
    service_id: 2,
    service_name: "Vaccination",
    branch_id: 1,
    branch_name: "DHA Branch",
    preferred_date: "2026-06-20",
    preferred_time: "16:30",
    complaint: "Annual vaccination required",
    is_emergency: false,
    status: "new_request",
    created_at: "2026-06-18T10:15:00Z"
  },
];
```

## 11. Appointments

```js
export const mockAppointments = [
  {
    id: 1,
    client_id: 1,
    pet_id: 1,
    pet_name: "Max",
    owner_name: "Ayesha Khan",
    doctor_id: 1,
    doctor_name: "Dr. Ahmed Khan",
    branch_id: 1,
    branch_name: "DHA Branch",
    service_id: 1,
    service_name: "Consultation",
    appointment_date: "2026-06-20",
    start_time: "16:30",
    end_time: "17:00",
    status: "confirmed",
    notes: "Vomiting for 2 days"
  },
];
```

## 12. Queue

```js
export const mockQueue = [
  {
    id: 1,
    token_number: "Q-014",
    appointment_id: 1,
    client_id: 1,
    pet_id: 1,
    pet_name: "Max",
    species: "dog",
    owner_name: "Ayesha Khan",
    doctor_id: 1,
    doctor_name: "Dr. Ahmed Khan",
    branch_id: 1,
    service: "Consultation",
    status: "waiting_doctor",
    priority: "normal",
    arrived_at: "2026-06-20T16:10:00Z",
    waiting_minutes: 18,
    notes: "Owner reports vomiting"
  },
];
```

## 13. Emergency cases

```js
export const mockEmergencyCases = [
  {
    id: 1,
    pet_id: 1,
    pet_name: "Max",
    owner_name: "Ayesha Khan",
    owner_phone: "03001234567",
    species: "dog",
    complaint: "Severe vomiting and weakness",
    triage_level: "urgent",
    status: "active",
    assigned_doctor_id: 1,
    assigned_doctor_name: "Dr. Ahmed Khan",
    arrived_at: "2026-06-20T15:45:00Z",
    estimated_cost: 8500,
    consent_status: "pending"
  },
];
```

## 14. Visits and SOAP notes

```js
export const mockVisits = [
  {
    id: 1,
    pet_id: 1,
    client_id: 1,
    doctor_id: 1,
    appointment_id: 1,
    status: "in_progress",
    subjective: "Owner reports vomiting for 2 days and reduced appetite.",
    objective: "Temperature 103F, mild dehydration, active but weak.",
    assessment: "Suspected gastroenteritis. Rule out parvo.",
    plan: "CBC, parvo test, antiemetic, fluids, follow-up in 3 days.",
    created_at: "2026-06-20T16:40:00Z"
  },
];
```

## 15. Prescriptions

```js
export const mockPrescriptions = [
  {
    id: 1,
    visit_id: 1,
    pet_id: 1,
    client_id: 1,
    doctor_id: 1,
    status: "sent_to_pharmacy",
    created_at: "2026-06-20T17:05:00Z",
    items: [
      {
        id: 1,
        medicine_id: 5,
        medicine_name: "Amoxicillin",
        strength: "250mg",
        dose: "1 tablet",
        frequency: "BID",
        duration: "5 days",
        route: "oral",
        quantity: 10,
        instructions: "Give after food",
        refill_allowed: false
      }
    ],
    owner_instructions: "Keep pet hydrated and return if vomiting continues."
  },
];
```

## 16. Lab orders

```js
export const mockLabOrders = [
  {
    id: 1,
    visit_id: 1,
    pet_id: 1,
    pet_name: "Max",
    owner_name: "Ayesha Khan",
    doctor_id: 1,
    doctor_name: "Dr. Ahmed Khan",
    test_name: "CBC",
    status: "sample_pending",
    priority: "normal",
    ordered_at: "2026-06-20T17:00:00Z",
    results: [],
    report_url: null
  },
];
```

## 17. Imaging orders

```js
export const mockImagingOrders = [
  {
    id: 1,
    visit_id: 1,
    pet_id: 1,
    imaging_type: "x_ray",
    body_area: "abdomen",
    clinical_reason: "Persistent vomiting",
    findings: "",
    impression: "",
    status: "ordered",
    report_url: null
  },
];
```

## 18. Inventory

```js
export const mockInventory = [
  {
    id: 1,
    name: "Amoxicillin",
    category: "medicine",
    brand: "VetMox",
    generic_name: "Amoxicillin",
    unit: "tablet",
    purchase_price: 25,
    sale_price: 50,
    supplier_id: 1,
    supplier_name: "Lahore Vet Supplies",
    branch_id: 1,
    branch_name: "DHA Branch",
    storage_condition: "room_temperature",
    batch_number: "AMX-2026-01",
    expiry_date: "2027-01-20",
    quantity: 120,
    minimum_stock_level: 30,
    status: "available"
  },
];
```

## 19. Billing

```js
export const mockBills = [
  {
    id: 1,
    visit_id: 1,
    client_id: 1,
    pet_id: 1,
    client_name: "Ayesha Khan",
    pet_name: "Max",
    status: "billing_pending",
    pos_status: "not_sent",
    subtotal: 8500,
    discount: 0,
    total: 8500,
    items: [
      { id: 1, type: "consultation", name: "General Consultation", amount: 1500 },
      { id: 2, type: "lab", name: "CBC", amount: 2500 },
      { id: 3, type: "medicine", name: "Medicines", amount: 4500 }
    ]
  },
];
```

## 20. Reports

```js
export const mockDashboardReport = {
  revenue_today: 86500,
  appointments_today: 36,
  active_queue: 14,
  emergency_cases: 3,
  pending_lab_reports: 9,
  low_stock_items: 12,
  revenue_breakdown: [
    { name: "Consultation", value: 32000 },
    { name: "Lab", value: 18000 },
    { name: "Pharmacy", value: 26000 },
    { name: "Grooming", value: 10500 }
  ]
};
```

## 21. Mock service behavior

Each service should use fake delay:

```js
const delay = (data, time = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(data), time));
```

Example:

```js
export const appointmentService = {
  getRequests: () => delay(mockAppointmentRequests),
  getAppointments: () => delay(mockAppointments),
};
```

## 22. Clickable demo mock behavior

For the full demo flow, mock services should support local state for:

- Creating appointment request.
- Confirming request.
- Adding appointment.
- Checking in pet.
- Moving pet through queue.
- Creating visit.
- Creating prescription.
- Creating lab order.
- Marking lab result complete.
- Dispensing medicine.
- Generating billing summary.
- Adding final timeline entry.

This can be done using Context API or Zustand later.
