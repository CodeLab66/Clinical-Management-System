export const statusMetadata = {
  new_request: {
    label: "New request",
    color: "primary",
    description: "New appointment request awaiting contact.",
  },
  active: { label: "Active", color: "info" },
  critical: { label: "Critical", color: "danger" },
  contacted: { label: "Contacted", color: "info" },
  confirmed: { label: "Confirmed", color: "info" },
  rescheduled: { label: "Rescheduled", color: "warning" },
  checked_in: { label: "Checked in", color: "success" },
  waiting: { label: "Waiting", color: "warning" },
  waiting_for_doctor: { label: "Waiting for doctor", color: "warning" },
  waiting_doctor: { label: "Waiting for doctor", color: "warning" },
  waiting_reception: { label: "Waiting at reception", color: "warning" },
  in_consultation: { label: "In consultation", color: "info" },
  lab_pending: { label: "Lab pending", color: "warning" },
  imaging_pending: { label: "Imaging pending", color: "warning" },
  pharmacy_pending: { label: "Pharmacy pending", color: "warning" },
  billing_pending: { label: "Billing pending", color: "warning" },
  doctor_review_pending: { label: "Doctor review pending", color: "warning" },
  completed: { label: "Completed", color: "success" },
  cancelled: { label: "Cancelled", color: "danger" },
  no_show: { label: "No show", color: "danger" },
  rejected: { label: "Rejected", color: "danger" },
  duplicate: { label: "Duplicate", color: "neutral" },
  draft: { label: "Draft", color: "neutral" },
  sent_to_pharmacy: { label: "Sent to pharmacy", color: "info" },
  partially_dispensed: { label: "Partially dispensed", color: "warning" },
  dispensed: { label: "Dispensed", color: "success" },
  out_of_stock: { label: "Out of stock", color: "danger" },
  low_stock: { label: "Low stock", color: "warning" },
  near_expiry: { label: "Near expiry", color: "warning" },
  expired: { label: "Expired", color: "danger" },
  paid: { label: "Paid", color: "success" },
  recorded: { label: "Recorded", color: "info" },
  pending: { label: "Pending", color: "warning" },
  partial: { label: "Partial", color: "warning" },
  refunded: { label: "Refunded", color: "info" },
  sent_to_pos: { label: "Sent to POS", color: "info" },
  manually_billed: { label: "Manually billed", color: "neutral" },
};

export const STATUS = Object.fromEntries(
  Object.keys(statusMetadata).map((status) => [status.toUpperCase(), status]),
);

export const getStatusMeta = (status) =>
  statusMetadata[status] || {
    label: String(status || "Unknown").replaceAll("_", " "),
    color: "neutral",
  };
