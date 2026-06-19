# VetOS Pro UI Screen Inventory

This document maps every major functionality to a UI screen so the frontend does not miss anything from the project brief.

## 1. Auth and system access

| Function | UI screen/component |
|---|---|
| Staff login | Login page |
| Forgot password | Forgot password page |
| Role demo | Login role buttons / role switcher |
| View current user | Topbar user profile |
| Logout | Sidebar logout action |

## 2. Admin dashboard

| Function | UI screen/component |
|---|---|
| View revenue | Admin overview KPI + revenue chart |
| View appointments | Admin overview appointment card |
| View emergency cases | Admin overview emergency card + right panel |
| View active queue | Admin overview queue card |
| View pending lab reports | Admin overview lab card |
| View pharmacy pending | Admin overview pharmacy card |
| View low stock/expiry | Inventory alert card |
| View branch performance | Branch performance chart |
| View doctor performance | Top doctors panel |
| View recent activity | Recent activity feed |
| Filter by date/branch | Date filter + branch selector |

## 3. Branch management

| Function | UI screen/component |
|---|---|
| Add branch | Add branch form |
| Edit branch | Edit branch form |
| Disable branch | Branch actions menu |
| Assign doctors/staff | Branch profile staff tab |
| Enable services | Branch profile services tab |
| View branch calendar | Branch profile appointments tab |
| View branch inventory | Branch profile inventory tab |
| Compare branches | Reports/branch performance chart |

## 4. Staff, roles, permissions

| Function | UI screen/component |
|---|---|
| Add staff | Add staff form |
| Edit staff | Staff profile/edit form |
| Assign role | Staff form role selector |
| Assign branch | Staff form branch selector |
| Disable user | Staff action menu |
| View activity | Staff profile activity tab |
| Manage permissions | Roles permission matrix |

## 5. Doctor schedule

| Function | UI screen/component |
|---|---|
| Set availability | Doctor schedule weekly grid |
| Assign branch | Schedule branch selector |
| Mark leave | Leave/unavailable modal |
| Assign emergency duty | Emergency duty toggle |
| Assign surgery slots | Surgery slots calendar |

## 6. Reception dashboard

| Function | UI screen/component |
|---|---|
| View new requests | Reception dashboard request cards |
| View confirmed appointments | Reception dashboard appointment card |
| View checked-in pets | Reception dashboard checked-in card |
| View waiting queue | Queue preview card |
| Search client by phone | Reception search bar |
| Quick add client/pet | Quick creation modal |
| Call/WhatsApp client | Action buttons |

## 7. Appointment request inbox

| Function | UI screen/component |
|---|---|
| View website form requests | Request inbox table |
| Mark contacted | Row action |
| Confirm request | Confirm modal |
| Reschedule request | Reschedule modal |
| Cancel/reject request | Cancel/reject modal |
| Detect duplicate | Duplicate badge/alert |
| Convert to appointment | Convert modal |
| Create client/pet from request | Convert modal fields |

## 8. Appointment calendar

| Function | UI screen/component |
|---|---|
| Day/week/month view | Calendar page tabs |
| Doctor-wise view | Doctor filter/tab |
| Branch-wise view | Branch filter/tab |
| Create appointment | Add appointment modal |
| Edit appointment | Appointment detail modal |
| Assign doctor/room | Appointment form fields |
| Check in pet | Appointment action button |
| Add to queue | Appointment action button |
| Mark no-show | Appointment action button |
| Cancel appointment | Appointment action button |
| Print slip placeholder | Appointment action button |

## 9. Queue system

| Function | UI screen/component |
|---|---|
| View live queue | Queue board |
| Show status columns | Kanban columns |
| Show pet token | Queue card |
| Move queue status | Drag/drop later or action menu |
| Send to doctor | Queue action |
| Send to lab | Queue action |
| Send to imaging | Queue action |
| Send to pharmacy | Queue action |
| Send to billing | Queue action |
| Mark completed | Queue action |
| Show priority | Priority badge |
| Show waiting time | Queue card timer text |

## 10. Emergency management

| Function | UI screen/component |
|---|---|
| Fast check-in | Emergency check-in form |
| Assign triage | Triage button group |
| Assign doctor | Doctor selector |
| Add complaint | Emergency form field |
| Add vitals | Emergency detail vitals section |
| Add treatment note | Emergency detail notes section |
| Show active emergencies | Emergency dashboard |
| Mark emergency status | Emergency detail action |

## 11. Client management

| Function | UI screen/component |
|---|---|
| Add client | Add client form |
| Edit client | Edit client form |
| Search by phone | Client list search |
| View profile | Client profile |
| Add pet under client | Client profile action |
| View appointments | Client profile appointments tab |
| View invoices | Client profile invoices tab |
| View visits | Client profile visits tab |
| Add communication log | Client communication tab |
| Call/WhatsApp | Client action buttons |

## 12. Pet management

| Function | UI screen/component |
|---|---|
| Add pet | Add pet form |
| Edit pet | Edit pet form |
| Upload photo placeholder | Pet photo upload card |
| Add allergy | Pet warning/allergy section |
| Add medical warning | Pet warning section |
| Add weight record | Weight entry modal |
| View medical history | Pet profile timeline/tabs |
| View prescriptions | Pet prescriptions tab |
| View labs | Pet lab reports tab |
| View imaging | Pet imaging tab |
| View vaccinations | Pet vaccination tab |
| View deworming | Pet deworming tab |
| View grooming | Pet grooming tab |
| View boarding | Pet boarding tab |
| View invoices | Pet billing tab |
| Start consultation | Pet quick action |
| Order lab | Pet quick action |
| Request imaging | Pet quick action |

## 13. Doctor dashboard

| Function | UI screen/component |
|---|---|
| View today's patients | Doctor dashboard list |
| View waiting patients | Doctor queue card |
| View emergency assigned | Doctor emergency card |
| View follow-ups due | Follow-up card |
| View lab review pending | Lab review panel |
| Start consultation | Patient row action |

## 14. EMR and SOAP

| Function | UI screen/component |
|---|---|
| View pet summary | Consultation left panel |
| View owner details | Consultation left panel |
| Add complaint | Subjective tab |
| Add vitals | Objective tab |
| Add diagnosis | Assessment tab |
| Add treatment plan | Plan tab |
| Add lab order | Bottom action/button/modal |
| Add imaging request | Bottom action/button/modal |
| Add follow-up | Follow-up modal |
| Save draft | Bottom action bar |
| Complete visit | Bottom action bar |
| View previous history | Right panel |

## 15. Clinical templates

| Function | UI screen/component |
|---|---|
| View templates | Template list |
| Use template | Template row action |
| Edit template | Template editor |
| Save custom template | Template editor save |
| Create branch template | Visibility selector |

## 16. Prescriptions

| Function | UI screen/component |
|---|---|
| Create prescription | Prescription create page |
| Add medicine | Medicine row form |
| Use template | Template button |
| Send to pharmacy | Action button |
| Print/export PDF placeholder | PDF preview/action |
| Track status | Prescription status badge |
| Partial/unavailable status | Pharmacy-driven status badge |

## 17. Vaccination and deworming

| Function | UI screen/component |
|---|---|
| Add vaccination record | Vaccination form |
| Track batch/expiry | Vaccination form fields |
| Set next due date | Date field |
| Generate card placeholder | Vaccination card preview |
| Add deworming record | Deworming form |
| Show history | Pet tab/history card |
| Reminder placeholder | Reminder action |

## 18. Lab and diagnostics

| Function | UI screen/component |
|---|---|
| View lab orders | Lab orders table |
| Mark sample collected | Row/detail action |
| Enter result | Lab result entry page |
| Add reference range | Result table fields |
| Highlight abnormal | Status badge/cell color |
| Upload report placeholder | File upload card |
| Send doctor review | Action button |
| Complete report | Action button |
| PDF preview | Lab report preview card |

## 19. Imaging

| Function | UI screen/component |
|---|---|
| View imaging orders | Imaging table |
| Add imaging report | Imaging report page |
| Upload image/report placeholder | File upload card |
| Add findings | Findings textarea |
| Add impression | Impression textarea |
| Send review | Action button |
| Attach to timeline | Completed state |

## 20. Surgery and procedures

| Function | UI screen/component |
|---|---|
| Book surgery | Surgery form |
| Assign surgeon/assistant | Surgery detail fields |
| Add pre-op checklist | Checklist component |
| Add anesthesia plan | Textarea/form section |
| Generate consent | Consent action |
| Add operation notes | Operation notes section |
| Add post-op monitoring | Monitoring table |
| Add discharge instruction | Discharge section |
| Schedule follow-up | Follow-up modal |

## 21. Dentistry

| Function | UI screen/component |
|---|---|
| Dental exam | Dentistry detail form |
| Gum/teeth notes | Form sections |
| Upload dental images placeholder | File upload card |
| Scaling/extraction notes | Procedure notes section |
| Add billing item | Billing action |
| Follow-up reminder | Follow-up action |

## 22. Pharmacy

| Function | UI screen/component |
|---|---|
| View prescription queue | Pharmacy queue |
| Check stock | Dispense page |
| Select batch | Batch selector |
| Dispense medicine | Dispense action |
| Partial dispense | Partial action/modal |
| Mark unavailable | Action button |
| Request substitute | Substitute action |
| Billing item preview | Dispense page billing card |

## 23. Inventory

| Function | UI screen/component |
|---|---|
| Add inventory item | Add item form |
| Edit item | Edit item form |
| Stock in/out | Stock movement modal |
| Adjust stock | Adjustment modal |
| Transfer stock | Transfer modal |
| Track batch | Inventory table/detail |
| Track expiry | Expiry column/badge |
| Low-stock alert | Stock alerts page |
| Supplier management | Suppliers page |
| Purchase order | Purchase order page |
| Remove expired/damaged | Action modal |

## 24. Billing and POS handoff

| Function | UI screen/component |
|---|---|
| Generate bill summary | Bill detail page |
| Add billable items | Bill item table/form |
| Mark sent to POS | POS handoff action |
| Mark paid/pending/partial | Payment status action |
| Export CSV placeholder | Export button |
| Print summary placeholder | Print button |

## 25. Grooming

| Function | UI screen/component |
|---|---|
| Grooming appointment | Grooming form |
| Assign groomer | Groomer selector |
| Select package/service | Service selector |
| Add behavior notes | Notes field |
| Upload before/after placeholder | Upload cards |
| Mark completed | Action button |
| Add billing item | Billing action |

## 26. Boarding

| Function | UI screen/component |
|---|---|
| Create booking | Boarding form |
| Check in/out | Boarding actions |
| Assign kennel/room | Kennel selector |
| Feeding schedule | Schedule form |
| Medication schedule | Schedule form |
| Walk schedule | Schedule form |
| Cleaning status | Checklist |
| Daily update | Daily update form |
| Owner update placeholder | Message preview |
| Add billing item | Billing action |

## 27. Consent forms

| Function | UI screen/component |
|---|---|
| Create consent form | Consent form creation page |
| Select template | Template selector |
| Add procedure/risk/cost | Form fields |
| Signature placeholder | Signature box |
| PDF preview | PDF preview card |
| Mark signed | Action button |
| Attach to pet record | Action button |

## 28. Communications

| Function | UI screen/component |
|---|---|
| Call button | Client/pet actions |
| WhatsApp button | Client/pet actions |
| Copy message | Message template action |
| Log communication | Communication log form |
| Manage templates | Message templates page |

## 29. Reports

| Function | UI screen/component |
|---|---|
| Business reports | Reports dashboard/business tabs |
| Medical reports | Reports dashboard/medical tabs |
| Inventory reports | Reports dashboard/inventory tabs |
| Staff reports | Reports dashboard/staff tabs |
| Branch reports | Reports dashboard/branch tabs |
| Filter by date/branch/doctor | Filters |
| Export placeholder | Export buttons |
| Charts | Chart cards |

## 30. Audit and security

| Function | UI screen/component |
|---|---|
| View audit logs | Audit log table |
| Filter logs | Audit filters |
| View log detail | Log detail modal |
| Export logs placeholder | Export action |
| Security settings | Security settings tab |

## 31. Settings

| Function | UI screen/component |
|---|---|
| Clinic profile | Settings general tab |
| Logo upload placeholder | Upload card |
| Services/pricing | Services/pricing tab |
| Medicine categories | Medical settings tab |
| Lab categories | Medical settings tab |
| Appointment statuses | Appointment settings tab |
| Prescription templates | Templates tab |
| Invoice template | Billing settings tab |
| Report template | Reports settings tab |
| Message templates | Notification settings tab |
| Currency/tax | Billing settings tab |
| Theme settings | Theme tab |

## 32. Public website, built last

| Function | UI screen/component |
|---|---|
| Public home | Home page |
| Services display | Services page |
| Branch display | Branches page |
| Doctor display | Doctors page |
| Appointment request form | Appointment page |
| Call CTA | CTA button |
| WhatsApp CTA | CTA button |
| Emergency CTA | Emergency page/button |
| Contact | Contact page |
