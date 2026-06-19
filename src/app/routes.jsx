import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import OverviewPlaceholder from "@/pages/admin/OverviewPlaceholder";
import DesignSystemPreview from "@/pages/admin/DesignSystemPreview";
import ReceptionPlaceholder from "@/pages/reception/ReceptionPlaceholder";
import DoctorPlaceholder from "@/pages/doctor/DoctorPlaceholder";
import LabPlaceholder from "@/pages/lab/LabPlaceholder";
import PharmacyPlaceholder from "@/pages/pharmacy/PharmacyPlaceholder";
import InventoryPlaceholder from "@/pages/inventory/InventoryPlaceholder";
import BillingPlaceholder from "@/pages/billing/BillingPlaceholder";
import SettingsPlaceholder from "@/pages/settings/SettingsPlaceholder";
import PublicPlaceholder from "@/pages/public-site/PublicPlaceholder";

const page = (Component, title, section, description) => ({
  element: <Component title={title} section={section} description={description} />,
  handle: { title },
});

const internalRoutes = [
  {
    index: true,
    element: <Navigate to="/app/overview" replace />,
    handle: { title: "Overview" },
  },
  {
    path: "overview",
    ...page(
      OverviewPlaceholder,
      "Overview",
      "Admin Dashboard",
      "Operational overview placeholder for clinic KPIs, charts, tables, and activity.",
    ),
  },
  {
    path: "design-system",
    element: <DesignSystemPreview />,
    handle: { title: "Design System" },
  },
  {
    path: "appointments",
    ...page(ReceptionPlaceholder, "Appointments", "Reception"),
  },
  {
    path: "appointment-requests",
    ...page(ReceptionPlaceholder, "Appointment Requests", "Reception"),
  },
  { path: "queue", ...page(ReceptionPlaceholder, "Queue", "Reception") },
  {
    path: "emergency-checkin",
    ...page(ReceptionPlaceholder, "Emergency Check-in", "Reception"),
  },
  { path: "clients", ...page(ReceptionPlaceholder, "Clients", "Reception") },
  {
    path: "clients/new",
    ...page(ReceptionPlaceholder, "New Client", "Reception"),
  },
  {
    path: "clients/:clientId",
    ...page(ReceptionPlaceholder, "Client Detail", "Reception"),
  },
  { path: "pets", ...page(ReceptionPlaceholder, "Pets", "Reception") },
  { path: "pets/new", ...page(ReceptionPlaceholder, "New Pet", "Reception") },
  {
    path: "pets/:petId",
    ...page(ReceptionPlaceholder, "Pet Profile", "Reception"),
  },
  {
    path: "doctor/dashboard",
    ...page(DoctorPlaceholder, "Doctor Dashboard", "Doctor Workspace"),
  },
  {
    path: "consultations",
    ...page(DoctorPlaceholder, "Consultations", "Doctor Workspace"),
  },
  {
    path: "consultations/:visitId",
    ...page(DoctorPlaceholder, "Consultation Detail", "Doctor Workspace"),
  },
  {
    path: "prescriptions",
    ...page(DoctorPlaceholder, "Prescriptions", "Doctor Workspace"),
  },
  {
    path: "prescriptions/:prescriptionId",
    ...page(DoctorPlaceholder, "Prescription Detail", "Doctor Workspace"),
  },
  {
    path: "vaccinations/:petId",
    ...page(DoctorPlaceholder, "Vaccination Record", "Doctor Workspace"),
  },
  {
    path: "deworming/:petId",
    ...page(DoctorPlaceholder, "Deworming Record", "Doctor Workspace"),
  },
  {
    path: "lab/dashboard",
    ...page(LabPlaceholder, "Lab Dashboard", "Lab"),
  },
  { path: "lab/orders", ...page(LabPlaceholder, "Lab Orders", "Lab") },
  {
    path: "lab/orders/:orderId",
    ...page(LabPlaceholder, "Lab Order Detail", "Lab"),
  },
  { path: "imaging", ...page(LabPlaceholder, "Imaging", "Imaging") },
  {
    path: "imaging/:orderId",
    ...page(LabPlaceholder, "Imaging Order Detail", "Imaging"),
  },
  {
    path: "pharmacy/queue",
    ...page(PharmacyPlaceholder, "Pharmacy Queue", "Pharmacy"),
  },
  {
    path: "pharmacy/dispense/:prescriptionId",
    ...page(PharmacyPlaceholder, "Dispense Prescription", "Pharmacy"),
  },
  {
    path: "inventory",
    ...page(InventoryPlaceholder, "Inventory", "Inventory"),
  },
  {
    path: "inventory/new",
    ...page(InventoryPlaceholder, "New Inventory Item", "Inventory"),
  },
  {
    path: "inventory/alerts",
    ...page(InventoryPlaceholder, "Inventory Alerts", "Inventory"),
  },
  {
    path: "inventory/suppliers",
    ...page(InventoryPlaceholder, "Suppliers", "Inventory"),
  },
  {
    path: "inventory/purchase-orders",
    ...page(InventoryPlaceholder, "Purchase Orders", "Inventory"),
  },
  { path: "billing", ...page(BillingPlaceholder, "Billing", "Billing") },
  {
    path: "billing/:billId",
    ...page(BillingPlaceholder, "Bill Detail", "Billing"),
  },
  {
    path: "pos-handoff",
    ...page(BillingPlaceholder, "POS Handoff", "Billing"),
  },
  {
    path: "surgery",
    ...page(DoctorPlaceholder, "Surgery & Procedures", "Services"),
  },
  {
    path: "surgery/:procedureId",
    ...page(DoctorPlaceholder, "Surgery Detail", "Services"),
  },
  { path: "dentistry", ...page(DoctorPlaceholder, "Dentistry", "Services") },
  {
    path: "dentistry/:caseId",
    ...page(DoctorPlaceholder, "Dentistry Case", "Services"),
  },
  { path: "grooming", ...page(ReceptionPlaceholder, "Grooming", "Services") },
  {
    path: "grooming/:appointmentId",
    ...page(ReceptionPlaceholder, "Grooming Appointment", "Services"),
  },
  { path: "boarding", ...page(ReceptionPlaceholder, "Boarding", "Services") },
  {
    path: "boarding/:bookingId",
    ...page(ReceptionPlaceholder, "Boarding Booking", "Services"),
  },
  {
    path: "consent-forms",
    ...page(ReceptionPlaceholder, "Consent Forms", "Services"),
  },
  {
    path: "consent-forms/:formId",
    ...page(ReceptionPlaceholder, "Consent Form Detail", "Services"),
  },
  {
    path: "branches",
    ...page(SettingsPlaceholder, "Branches", "Management"),
  },
  { path: "staff", ...page(SettingsPlaceholder, "Staff", "Management") },
  {
    path: "doctor-schedules",
    ...page(SettingsPlaceholder, "Doctor Schedules", "Management"),
  },
  { path: "reports", ...page(OverviewPlaceholder, "Reports", "Management") },
  {
    path: "communications",
    ...page(SettingsPlaceholder, "Communication Logs", "Management"),
  },
  {
    path: "audit-logs",
    ...page(SettingsPlaceholder, "Audit Logs", "Management"),
  },
  { path: "settings", ...page(SettingsPlaceholder, "Settings", "Management") },
  { path: "help", ...page(SettingsPlaceholder, "Help & Support", "Others") },
];

const publicRoutes = [
  { path: "public", title: "Public Home" },
  { path: "public/services", title: "Public Services" },
  { path: "public/branches", title: "Public Branches" },
  { path: "public/doctors", title: "Public Doctors" },
  { path: "public/appointment", title: "Public Appointment" },
  { path: "public/emergency", title: "Public Emergency" },
  { path: "public/contact", title: "Public Contact" },
].map((route) => ({
  path: route.path,
  element: (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <PublicPlaceholder title={route.title} />
    </div>
  ),
  handle: { title: route.title },
}));

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login />, handle: { title: "Login" } },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    handle: { title: "Forgot Password" },
  },
  {
    path: "/app",
    element: <AppShell />,
    children: internalRoutes,
  },
  ...publicRoutes,
  { path: "*", element: <Navigate to="/app/overview" replace /> },
]);
