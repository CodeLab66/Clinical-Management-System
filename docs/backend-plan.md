# VetOS Pro Backend Plan

## 1. Goal

The backend will be built after the frontend UI prototype. It must support a complete veterinary clinic management workflow using Django, Django REST Framework, and PostgreSQL.

## 2. Backend stack

```text
Python
Django
Django REST Framework
PostgreSQL
JWT Authentication
Django Admin
Celery later if background tasks are needed
Redis later if queues/cache are needed
```

## 3. Backend folder structure

```text
backend/
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── apps/
│   ├── accounts/
│   ├── branches/
│   ├── staff/
│   ├── clients/
│   ├── pets/
│   ├── appointments/
│   ├── queue/
│   ├── emergency/
│   ├── consultations/
│   ├── prescriptions/
│   ├── vaccination/
│   ├── lab/
│   ├── imaging/
│   ├── surgery/
│   ├── dentistry/
│   ├── pharmacy/
│   ├── inventory/
│   ├── billing/
│   ├── grooming/
│   ├── boarding/
│   ├── consent/
│   ├── communications/
│   ├── reports/
│   └── audit/
├── media/
├── static/
├── requirements.txt
└── manage.py
```

## 4. Django apps

### accounts
Handles:

- Users.
- Roles.
- Permissions.
- Authentication.
- Session/JWT management.

### branches
Handles:

- Branches.
- Branch services.
- Branch timings.
- Rooms.
- Branch-level configuration.

### staff
Handles:

- Staff profiles.
- Doctor schedules.
- Staff activity.
- Branch assignment.

### clients
Handles:

- Pet owners.
- Contact details.
- Tags.
- Communication preferences.

### pets
Handles:

- Pet profiles.
- Pet warnings.
- Allergies.
- Weight history.
- Pet timeline.

### appointments
Handles:

- Public appointment requests.
- Confirmed appointments.
- Rescheduling.
- No-shows.
- Check-in.

### queue
Handles:

- Live queue.
- Token numbers.
- Queue movement.
- Waiting time.

### emergency
Handles:

- Emergency fast check-in.
- Triage.
- Emergency notes.

### consultations
Handles:

- Visits.
- SOAP notes.
- Diagnosis.
- Follow-ups.
- Clinical templates.

### prescriptions
Handles:

- Prescriptions.
- Prescription items.
- Pharmacy handoff.

### vaccination
Handles:

- Vaccines.
- Vaccination records.
- Deworming records.
- Next due dates.

### lab
Handles:

- Lab tests.
- Lab orders.
- Result entry.
- Report upload.
- Doctor review.

### imaging
Handles:

- X-ray.
- Ultrasound.
- Endoscopy.
- Imaging reports.

### surgery
Handles:

- Procedure booking.
- Pre-op checklist.
- Operation notes.
- Post-op monitoring.
- Discharge instructions.

### dentistry
Handles:

- Dental cases.
- Dental exam.
- Scaling/extraction notes.
- Dental images.

### pharmacy
Handles:

- Pharmacy queue.
- Dispensing.
- Partial dispensing.
- Medicine substitution.

### inventory
Handles:

- Items.
- Batches.
- Expiry.
- Stock movement.
- Suppliers.
- Purchase orders.

### billing
Handles:

- Bill summaries.
- Bill items.
- Payment status.
- POS handoff status.

### grooming
Handles:

- Grooming appointments.
- Before/after photos.
- Grooming notes.

### boarding
Handles:

- Boarding bookings.
- Kennel rooms.
- Feeding.
- Medication.
- Daily updates.

### consent
Handles:

- Consent forms.
- Templates.
- PDF generation.
- Signature later.

### communications
Handles:

- Communication logs.
- Message templates.
- WhatsApp/call action logs.

### reports
Handles:

- Dashboard metrics.
- Revenue reports.
- Medical reports.
- Inventory reports.
- Staff reports.

### audit
Handles:

- Audit logs.
- Sensitive action tracking.

## 5. Core models overview

### User and role models

```text
User
Role
Permission
StaffProfile
```

### Branch models

```text
Branch
Room
Service
ServicePricing
BranchService
```

### Client and pet models

```text
Client
Pet
PetWeightHistory
PetAllergy
PetWarning
PetTimelineEvent
```

### Appointment models

```text
AppointmentRequest
Appointment
QueueEntry
EmergencyCase
```

### Medical models

```text
Visit
ConsultationNote
Diagnosis
ClinicalTemplate
Prescription
PrescriptionItem
FollowUp
```

### Vaccination models

```text
Vaccine
VaccinationRecord
DewormingRecord
```

### Lab/imaging models

```text
LabTest
LabOrder
LabResult
ImagingOrder
ImagingReport
```

### Procedure models

```text
SurgeryProcedure
SurgeryNote
DentistryCase
ConsentForm
```

### Pharmacy/inventory models

```text
InventoryItem
MedicineBatch
StockMovement
Supplier
PurchaseOrder
PharmacyDispense
```

### Billing models

```text
BillSummary
BillItem
Payment
POSHandoffLog
```

### Extra service models

```text
GroomingAppointment
BoardingBooking
KennelRoom
BoardingDailyUpdate
```

### Logs

```text
CommunicationLog
MessageTemplate
AuditLog
StaffActivityLog
```

## 6. Authentication and permissions

Use JWT or session-based auth.

Required access rules:

- Reception can manage appointment requests, check-in, queue, clients, pets.
- Doctor can manage consultations, prescriptions, lab orders, imaging requests, vaccination, deworming.
- Lab staff can only manage lab workflow.
- Pharmacy can manage pharmacy queue and dispensing.
- Inventory manager can manage stock.
- Accountant can manage billing/POS handoff.
- Admin can access everything.

## 7. Media and file handling

MVP:

```text
Django local media files
```

Production:

```text
Cloudflare R2 or AWS S3
```

Files to support:

- Pet photos.
- Lab reports.
- Imaging reports/images.
- Consent forms.
- Grooming photos.
- Boarding updates.
- Prescription PDFs.

## 8. PDF generation

Generate PDFs for:

- Prescription.
- Lab report.
- Vaccination card.
- Billing summary.
- Consent form.
- Discharge summary.

Recommended libraries:

```text
WeasyPrint
ReportLab
wkhtmltopdf
```

Use one after testing layout quality.

## 9. Backend build phases

### Phase B1: Foundation

- Setup Django.
- Setup PostgreSQL.
- Setup DRF.
- Setup authentication.
- Setup admin.
- Setup base models.

### Phase B2: Core business data

- Branches.
- Staff.
- Clients.
- Pets.
- Services/pricing.

### Phase B3: Appointment and queue

- Appointment request.
- Appointment confirmation.
- Calendar.
- Queue.
- Emergency.

### Phase B4: Medical workflow

- Visits.
- SOAP.
- Prescription.
- Vaccination.
- Deworming.
- Follow-ups.

### Phase B5: Lab/imaging/pharmacy/inventory

- Lab orders.
- Lab results.
- Imaging reports.
- Pharmacy queue.
- Stock movement.

### Phase B6: Billing and reports

- Billing summary.
- POS handoff.
- Reports.
- Audit logs.

### Phase B7: Media, PDFs, deployment

- File uploads.
- PDF generation.
- Production settings.
- Deployment.

## 10. Deployment plan

Suggested production deployment:

```text
Frontend: Vercel
Backend: VPS / Render / Railway
Database: PostgreSQL
Media: Cloudflare R2 or AWS S3
```

Domain example:

```text
app.clinicdomain.com
api.clinicdomain.com
```

## 11. Backend quality checklist

- Models use clean relationships.
- APIs match frontend contract.
- Permissions tested.
- Filtering/searching implemented.
- Pagination enabled.
- Audit logs for sensitive actions.
- File uploads secure.
- Backups configured.
- Error handling consistent.
