# VetOS Pro API Contract

## 1. Purpose

This document defines the planned REST API shape for the future Django REST Framework backend.

The frontend will be built first using mock services, but mock data must follow this API contract so that the real backend can be connected later without rewriting the UI.

## 2. API base URL

Development:

```text
http://localhost:8000/api
```

Production example:

```text
https://api.clinicdomain.com/api
```

## 3. Authentication

### Login

```http
POST /api/auth/login/
```

Request:

```json
{
  "email": "admin@clinic.com",
  "password": "password"
}
```

Response:

```json
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@clinic.com",
    "role": "super_admin",
    "branch_id": null
  }
}
```

### Me

```http
GET /api/auth/me/
```

### Refresh token

```http
POST /api/auth/refresh/
```

### Logout

```http
POST /api/auth/logout/
```

## 4. Standard response patterns

### Paginated list response

```json
{
  "count": 100,
  "next": null,
  "previous": null,
  "results": []
}
```

### Error response

```json
{
  "detail": "Error message",
  "errors": {
    "field_name": ["Validation error"]
  }
}
```

## 5. Common query filters

Most list endpoints should support:

```text
?search=
?branch_id=
?status=
?date_from=
?date_to=
?page=
?page_size=
```

## 6. Core status enums

Appointment request statuses:

```text
new_request
contacted
confirmed
rescheduled
cancelled
rejected
duplicate
converted
```

Appointment statuses:

```text
confirmed
checked_in
waiting
in_consultation
lab_pending
imaging_pending
pharmacy_pending
billing_pending
completed
cancelled
no_show
```

Queue statuses:

```text
waiting_reception
waiting_doctor
in_consultation
lab_pending
imaging_pending
pharmacy_pending
billing_pending
completed
```

Priority levels:

```text
normal
urgent
emergency
critical
```

Payment statuses:

```text
not_billed
billing_pending
paid
partial
pending
refunded
cancelled
```

## 7. Branches

```http
GET    /api/branches/
POST   /api/branches/
GET    /api/branches/{id}/
PATCH  /api/branches/{id}/
DELETE /api/branches/{id}/
```

Branch object:

```json
{
  "id": 1,
  "name": "DHA Branch",
  "address": "DHA Lahore",
  "phone": "0420000000",
  "whatsapp": "03000000000",
  "email": "dha@clinic.com",
  "opening_time": "09:00",
  "closing_time": "23:00",
  "emergency_available": true,
  "is_active": true
}
```

## 8. Staff and roles

```http
GET/POST   /api/staff/
GET/PATCH  /api/staff/{id}/
GET/POST   /api/roles/
GET/PATCH  /api/roles/{id}/
GET/POST   /api/doctor-schedules/
```

Staff object:

```json
{
  "id": 1,
  "name": "Dr. Ahmed Khan",
  "email": "doctor@clinic.com",
  "phone": "03001234567",
  "role": "veterinarian",
  "branch_id": 1,
  "department": "Medical",
  "is_active": true
}
```

## 9. Clients

```http
GET    /api/clients/
POST   /api/clients/
GET    /api/clients/{id}/
PATCH  /api/clients/{id}/
DELETE /api/clients/{id}/
GET    /api/clients/{id}/pets/
GET    /api/clients/{id}/appointments/
GET    /api/clients/{id}/invoices/
```

Client object:

```json
{
  "id": 1,
  "name": "Ayesha Khan",
  "phone": "03001234567",
  "whatsapp": "03001234567",
  "email": "ayesha@example.com",
  "address": "Lahore",
  "city": "Lahore",
  "emergency_contact": "03210000000",
  "preferred_branch_id": 1,
  "preferred_doctor_id": 3,
  "tags": ["regular"],
  "total_pets": 2,
  "total_visits": 8,
  "outstanding_balance": 2500
}
```

## 10. Pets

```http
GET    /api/pets/
POST   /api/pets/
GET    /api/pets/{id}/
PATCH  /api/pets/{id}/
DELETE /api/pets/{id}/
GET    /api/pets/{id}/timeline/
GET    /api/pets/{id}/medical-history/
GET    /api/pets/{id}/prescriptions/
GET    /api/pets/{id}/lab-reports/
GET    /api/pets/{id}/vaccinations/
GET    /api/pets/{id}/deworming/
```

Pet object:

```json
{
  "id": 1,
  "name": "Max",
  "species": "dog",
  "breed": "German Shepherd",
  "gender": "male",
  "date_of_birth": "2023-04-12",
  "weight_kg": 28.5,
  "color": "Black/Tan",
  "owner_id": 1,
  "microchip_number": null,
  "is_neutered": false,
  "allergies": ["Penicillin"],
  "warnings": ["Anxious during injections"],
  "vaccination_status": "due_soon",
  "deworming_status": "up_to_date",
  "last_visit_date": "2026-06-18"
}
```

## 11. Appointment requests

```http
GET    /api/appointment-requests/
POST   /api/appointment-requests/
GET    /api/appointment-requests/{id}/
PATCH  /api/appointment-requests/{id}/
POST   /api/appointment-requests/{id}/mark-contacted/
POST   /api/appointment-requests/{id}/confirm/
POST   /api/appointment-requests/{id}/reschedule/
POST   /api/appointment-requests/{id}/cancel/
POST   /api/appointment-requests/{id}/convert/
```

Request object:

```json
{
  "id": 1,
  "owner_name": "Usman Ali",
  "phone": "03215556677",
  "whatsapp": "03215556677",
  "email": "usman@example.com",
  "pet_name": "Milo",
  "species": "cat",
  "breed": "Persian",
  "service_id": 2,
  "service_name": "Vaccination",
  "branch_id": 1,
  "branch_name": "DHA Branch",
  "preferred_date": "2026-06-20",
  "preferred_time": "16:30",
  "complaint": "Annual vaccination required",
  "is_emergency": false,
  "status": "new_request",
  "created_at": "2026-06-18T10:15:00Z"
}
```

## 12. Appointments

```http
GET/POST  /api/appointments/
GET/PATCH /api/appointments/{id}/
POST      /api/appointments/{id}/check-in/
POST      /api/appointments/{id}/add-to-queue/
POST      /api/appointments/{id}/no-show/
POST      /api/appointments/{id}/cancel/
```

Appointment object:

```json
{
  "id": 1,
  "client_id": 1,
  "pet_id": 1,
  "doctor_id": 3,
  "branch_id": 1,
  "service_id": 1,
  "appointment_date": "2026-06-20",
  "start_time": "16:30",
  "end_time": "17:00",
  "status": "confirmed",
  "notes": "Vomiting for 2 days"
}
```

## 13. Queue

```http
GET/POST  /api/queue/
GET/PATCH /api/queue/{id}/
POST      /api/queue/{id}/move/
POST      /api/queue/{id}/complete/
```

Queue object:

```json
{
  "id": 1,
  "token_number": "Q-014",
  "appointment_id": 1,
  "client_id": 1,
  "pet_id": 1,
  "doctor_id": 3,
  "branch_id": 1,
  "service": "Consultation",
  "status": "waiting_doctor",
  "priority": "normal",
  "arrived_at": "2026-06-20T16:10:00Z",
  "waiting_minutes": 18,
  "notes": "Owner reports vomiting"
}
```

## 14. Emergency cases

```http
GET/POST  /api/emergency-cases/
GET/PATCH /api/emergency-cases/{id}/
POST      /api/emergency-cases/{id}/assign-doctor/
POST      /api/emergency-cases/{id}/update-triage/
POST      /api/emergency-cases/{id}/complete/
```

## 15. Visits and consultations

```http
GET/POST  /api/visits/
GET/PATCH /api/visits/{id}/
POST      /api/visits/{id}/complete/
GET       /api/visits/{id}/summary/
```

Visit object:

```json
{
  "id": 1,
  "pet_id": 1,
  "client_id": 1,
  "doctor_id": 3,
  "appointment_id": 1,
  "status": "in_progress",
  "subjective": "Owner reports vomiting for 2 days",
  "objective": "Temp 103F, mild dehydration",
  "assessment": "Suspected gastroenteritis, rule out parvo",
  "plan": "CBC, parvo test, antiemetic, fluids, follow-up in 3 days",
  "created_at": "2026-06-20T16:40:00Z"
}
```

## 16. Clinical templates

```http
GET/POST  /api/clinical-templates/
GET/PATCH /api/clinical-templates/{id}/
DELETE    /api/clinical-templates/{id}/
```

## 17. Prescriptions

```http
GET/POST  /api/prescriptions/
GET/PATCH /api/prescriptions/{id}/
POST      /api/prescriptions/{id}/send-to-pharmacy/
POST      /api/prescriptions/{id}/cancel/
```

Prescription item:

```json
{
  "medicine_id": 5,
  "medicine_name": "Amoxicillin",
  "strength": "250mg",
  "dose": "1 tablet",
  "frequency": "BID",
  "duration": "5 days",
  "route": "oral",
  "quantity": 10,
  "instructions": "Give after food"
}
```

## 18. Vaccination and deworming

```http
GET/POST /api/vaccination-records/
GET/POST /api/deworming-records/
GET      /api/pets/{id}/vaccination-card/
```

## 19. Lab

```http
GET/POST  /api/lab-tests/
GET/POST  /api/lab-orders/
GET/PATCH /api/lab-orders/{id}/
POST      /api/lab-orders/{id}/mark-sample-collected/
POST      /api/lab-orders/{id}/enter-result/
POST      /api/lab-orders/{id}/upload-report/
POST      /api/lab-orders/{id}/send-review/
POST      /api/lab-orders/{id}/complete/
```

## 20. Imaging

```http
GET/POST  /api/imaging-orders/
GET/PATCH /api/imaging-orders/{id}/
POST      /api/imaging-orders/{id}/upload-report/
POST      /api/imaging-orders/{id}/complete/
```

## 21. Surgery and dentistry

```http
GET/POST  /api/surgeries/
GET/PATCH /api/surgeries/{id}/
GET/POST  /api/dentistry-cases/
GET/PATCH /api/dentistry-cases/{id}/
```

## 22. Pharmacy

```http
GET      /api/pharmacy/queue/
GET      /api/pharmacy/prescriptions/{id}/
POST     /api/pharmacy/dispense/
POST     /api/pharmacy/partial-dispense/
POST     /api/pharmacy/mark-unavailable/
```

## 23. Inventory

```http
GET/POST  /api/inventory/items/
GET/PATCH /api/inventory/items/{id}/
GET       /api/inventory/alerts/
POST      /api/inventory/stock-in/
POST      /api/inventory/stock-out/
POST      /api/inventory/stock-adjustment/
POST      /api/inventory/stock-transfer/
GET/POST  /api/inventory/suppliers/
GET/POST  /api/inventory/purchase-orders/
```

## 24. Billing and POS handoff

```http
GET/POST  /api/billing/summaries/
GET/PATCH /api/billing/summaries/{id}/
POST      /api/billing/summaries/{id}/mark-sent-to-pos/
POST      /api/billing/summaries/{id}/mark-paid/
POST      /api/billing/summaries/{id}/mark-pending/
POST      /api/billing/summaries/{id}/export-csv/
```

## 25. Grooming and boarding

```http
GET/POST  /api/grooming/appointments/
GET/PATCH /api/grooming/appointments/{id}/
GET/POST  /api/boarding/bookings/
GET/PATCH /api/boarding/bookings/{id}/
POST      /api/boarding/bookings/{id}/daily-update/
```

## 26. Consent forms

```http
GET/POST  /api/consent-forms/
GET/PATCH /api/consent-forms/{id}/
POST      /api/consent-forms/{id}/mark-signed/
POST      /api/consent-forms/{id}/generate-pdf/
```

## 27. Communications

```http
GET/POST  /api/communication-logs/
GET/POST  /api/message-templates/
GET/PATCH /api/message-templates/{id}/
```

## 28. Reports

```http
GET /api/reports/dashboard/
GET /api/reports/revenue/
GET /api/reports/appointments/
GET /api/reports/medical/
GET /api/reports/inventory/
GET /api/reports/staff/
GET /api/reports/branches/
```

## 29. Audit logs

```http
GET /api/audit-logs/
GET /api/audit-logs/{id}/
```

## 30. Settings

```http
GET/PATCH /api/settings/clinic-profile/
GET/POST  /api/settings/services/
GET/POST  /api/settings/pricing/
GET/POST  /api/settings/categories/
GET/POST  /api/settings/templates/
```
