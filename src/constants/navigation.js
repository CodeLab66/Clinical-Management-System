import {
  Ambulance,
  BarChart3,
  BellRing,
  Bone,
  Boxes,
  BriefcaseMedical,
  Building2,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileClock,
  FlaskConical,
  HelpCircle,
  Home,
  Image,
  Layers3,
  LogOut,
  MessageSquareText,
  PawPrint,
  Pill,
  Scissors,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { routes } from "@/constants/routes";

export const sidebarSections = [
  {
    label: "MAIN MENU",
    items: [
      { label: "Overview", href: routes.overview, icon: Home },
      { label: "Appointments", href: routes.appointments, icon: CalendarDays },
      { label: "Requests", href: routes.appointmentRequests, icon: BellRing },
      { label: "Queue", href: routes.queue, icon: ClipboardList },
      { label: "Clients", href: routes.clients, icon: Users },
      { label: "Pets", href: routes.pets, icon: PawPrint },
      { label: "Consultations", href: routes.consultations, icon: Stethoscope },
    ],
  },
  {
    label: "CLINIC OPERATIONS",
    items: [
      { label: "Lab & Diagnostics", href: routes.labDashboard, icon: FlaskConical },
      { label: "Imaging", href: routes.imaging, icon: Image },
      { label: "Pharmacy", href: routes.pharmacyQueue, icon: Pill },
      { label: "Inventory", href: routes.inventory, icon: Boxes },
      { label: "Billing / POS Handoff", href: routes.billing, icon: CreditCard },
    ],
  },
  {
    label: "SERVICES",
    items: [
      { label: "Emergency", href: routes.emergencyCheckin, icon: Ambulance },
      { label: "Surgery & Procedures", href: "/app/surgery", icon: BriefcaseMedical },
      { label: "Dentistry", href: "/app/dentistry", icon: Bone },
      { label: "Grooming", href: "/app/grooming", icon: Scissors },
      { label: "Boarding", href: "/app/boarding", icon: ShieldCheck },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Branches", href: "/app/branches", icon: Building2 },
      { label: "Staff", href: "/app/staff", icon: Users },
      { label: "Doctor Schedules", href: "/app/doctor-schedules", icon: FileClock },
      { label: "Reports & Analytics", href: "/app/reports", icon: BarChart3 },
      { label: "Communication Logs", href: "/app/communications", icon: MessageSquareText },
      { label: "Audit Logs", href: "/app/audit-logs", icon: ClipboardCheck },
      { label: "Settings", href: routes.settings, icon: Settings },
    ],
  },
  {
    label: "OTHERS",
    items: [
      { label: "Design System", href: routes.designSystem, icon: Layers3 },
      { label: "Help & Support", href: "/app/help", icon: HelpCircle },
      { label: "Log Out", href: routes.login, icon: LogOut },
    ],
  },
];
