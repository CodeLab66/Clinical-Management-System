export const queueKpis = [
  { label: "Waiting", value: "3", subtitle: "Ready for doctor", icon: "Clock3", trend: "Avg 18m", trendType: "neutral" },
  { label: "In Consultation", value: "2", subtitle: "With doctors", icon: "Stethoscope", trend: "Active", trendType: "up" },
  { label: "Lab Pending", value: "2", subtitle: "Diagnostics lane", icon: "FlaskConical", trend: "1 urgent", trendType: "down" },
  { label: "Pharmacy Pending", value: "2", subtitle: "Medication handoff", icon: "Pill", trend: "Queue clear soon", trendType: "neutral" },
  { label: "Billing Pending", value: "1", subtitle: "Payment collection", icon: "WalletCards", trend: "PKR 12,500", trendType: "neutral" },
  { label: "Completed Today", value: "2", subtitle: "Closed visits", icon: "CheckCircle2", trend: "+2", trendType: "up" },
];

export const queueStages = [
  { key: "checked_in", label: "Checked In" },
  { key: "waiting", label: "Waiting" },
  { key: "consultation", label: "In Consultation" },
  { key: "lab", label: "Lab / Diagnostics" },
  { key: "pharmacy", label: "Pharmacy" },
  { key: "billing", label: "Billing" },
  { key: "completed", label: "Completed" },
];

export const mockQueue = [
  { id: "queue-001", queueNo: "Q-021", petName: "Nala", ownerName: "Zainab Tariq", service: "Ultrasound Review", doctor: "Dr. Sara Malik", branch: "DHA Branch", priority: "urgent", severity: "High", waitTime: "14m", stage: "checked_in", status: "checked_in", alerts: ["Female doctor preferred", "Pending balance PKR 7,000"], paymentStatus: "pending" },
  { id: "queue-002", queueNo: "Q-022", petName: "Chotu", ownerName: "Mehwish Iqbal", service: "Emergency Triage", doctor: "Dr. Usman Tariq", branch: "Johar Town Branch", priority: "critical", severity: "Critical", waitTime: "4m", stage: "checked_in", status: "checked_in", alerts: ["Bleeding paw", "Emergency"], paymentStatus: "deposit" },
  { id: "queue-003", queueNo: "Q-023", petName: "Tiger", ownerName: "Usman Butt", service: "Grooming", doctor: "Grooming Team", branch: "Bahria Branch", priority: "normal", severity: "Stable", waitTime: "21m", stage: "waiting", status: "waiting", alerts: [], paymentStatus: "unpaid" },
  { id: "queue-004", queueNo: "Q-024", petName: "Misty", ownerName: "Fatima Noor", service: "Eye Recheck", doctor: "Dr. Hina Farooq", branch: "Cantt Branch", priority: "urgent", severity: "High", waitTime: "18m", stage: "waiting", status: "waiting", alerts: ["Eye redness returned"], paymentStatus: "unpaid" },
  { id: "queue-005", queueNo: "Q-025", petName: "Biscuit", ownerName: "Noman Siddiqui", service: "Exotic Nail Trim", doctor: "Dr. Hina Farooq", branch: "Gulberg Branch", priority: "normal", severity: "Stable", waitTime: "9m", stage: "waiting", status: "waiting", alerts: ["Exotic handling"], paymentStatus: "unpaid" },
  { id: "queue-006", queueNo: "Q-026", petName: "Sheru", ownerName: "Hassan Raza", service: "Post-op Follow-up", doctor: "Dr. Ahmed Khan", branch: "Model Town Branch", priority: "normal", severity: "Stable", waitTime: "34m", stage: "consultation", status: "in_consultation", alerts: ["Post-op case"], paymentStatus: "pending" },
  { id: "queue-007", queueNo: "Q-027", petName: "Rocky", ownerName: "Ali Hamza", service: "Behavior Consultation", doctor: "Dr. Nadia Shah", branch: "Johar Town Branch", priority: "normal", severity: "Stable", waitTime: "11m", stage: "consultation", status: "in_consultation", alerts: ["Handling alert", "Quiet room"], paymentStatus: "unpaid" },
  { id: "queue-008", queueNo: "Q-028", petName: "Luna", ownerName: "Maham Sheikh", service: "Renal Panel Review", doctor: "Dr. Nadia Shah", branch: "Johar Town Branch", priority: "urgent", severity: "High", waitTime: "47m", stage: "lab", status: "lab_pending", alerts: ["Senior cat", "Renal panel"], paymentStatus: "partial" },
  { id: "queue-009", queueNo: "Q-029", petName: "Max", ownerName: "Ayesha Khan", service: "Dermatology Consultation", doctor: "Dr. Sara Malik", branch: "DHA Branch", priority: "urgent", severity: "Medium", waitTime: "23m", stage: "lab", status: "lab_pending", alerts: ["Chicken allergy"], paymentStatus: "unpaid" },
  { id: "queue-010", queueNo: "Q-030", petName: "Rex", ownerName: "Taimoor Shah", service: "Skin Scraping", doctor: "Dr. Sara Malik", branch: "DHA Branch", priority: "normal", severity: "Stable", waitTime: "39m", stage: "pharmacy", status: "pharmacy_pending", alerts: ["Muzzle for blood draw"], paymentStatus: "partial" },
  { id: "queue-011", queueNo: "Q-031", petName: "Snow", ownerName: "Saad Mir", service: "Diabetes Review", doctor: "Dr. Sara Malik", branch: "DHA Branch", priority: "urgent", severity: "Medium", waitTime: "42m", stage: "pharmacy", status: "pharmacy_pending", alerts: ["Insulin refill"], paymentStatus: "pending" },
  { id: "queue-012", queueNo: "Q-032", petName: "Bella", ownerName: "Sana Malik", service: "Dental Recheck", doctor: "Dr. Hina Farooq", branch: "Gulberg Branch", priority: "normal", severity: "Stable", waitTime: "58m", stage: "billing", status: "billing_pending", alerts: [], paymentStatus: "pending" },
  { id: "queue-013", queueNo: "Q-033", petName: "Milo", ownerName: "Ayesha Khan", service: "Vaccine Booster", doctor: "Dr. Sara Malik", branch: "DHA Branch", priority: "normal", severity: "Stable", waitTime: "0m", stage: "completed", status: "completed", alerts: [], paymentStatus: "paid" },
  { id: "queue-014", queueNo: "Q-034", petName: "Peanut", ownerName: "Hira Qureshi", service: "Exotic Wellness", doctor: "Dr. Ahmed Khan", branch: "Model Town Branch", priority: "normal", severity: "Stable", waitTime: "0m", stage: "completed", status: "completed", alerts: [], paymentStatus: "paid" },
];
