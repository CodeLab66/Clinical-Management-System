export const roleMetadata = {
  super_admin: { label: "Super Admin", color: "primary" },
  "Super Admin": { label: "Super Admin", color: "primary" },
  branch_admin: { label: "Branch Admin", color: "info" },
  "Branch Manager": { label: "Branch Manager", color: "info" },
  receptionist: { label: "Receptionist", color: "success" },
  Receptionist: { label: "Receptionist", color: "success" },
  veterinarian: { label: "Veterinarian", color: "primary" },
  Veterinarian: { label: "Veterinarian", color: "primary" },
  lab_staff: { label: "Lab Staff", color: "info" },
  "Lab Technician": { label: "Lab Technician", color: "info" },
  imaging_staff: { label: "Imaging Staff", color: "info" },
  pharmacy_staff: { label: "Pharmacy Staff", color: "warning" },
  "Pharmacy Staff": { label: "Pharmacy Staff", color: "warning" },
  inventory_manager: { label: "Inventory Manager", color: "warning" },
  grooming_staff: { label: "Grooming Staff", color: "success" },
  Groomer: { label: "Groomer", color: "success" },
  boarding_staff: { label: "Boarding Staff", color: "success" },
  "Boarding Staff": { label: "Boarding Staff", color: "success" },
  accountant: { label: "Accountant", color: "neutral" },
  "Finance Staff": { label: "Finance Staff", color: "neutral" },
  viewer: { label: "Viewer", color: "neutral" },
};

export const getRoleMeta = (role) =>
  roleMetadata[role] || {
    label: String(role || "viewer").replaceAll("_", " "),
    color: "neutral",
  };
