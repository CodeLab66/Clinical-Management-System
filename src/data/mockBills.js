export const mockBills = [
  {
    id: 1,
    visit_id: 1,
    client_id: 1,
    pet_id: 1,
    client_name: "Ayesha Khan",
    pet_name: "Max",
    status: "billing_pending",
    pos_status: "pending",
    subtotal: 8500,
    discount: 0,
    total: 8500,
    items: [
      { id: 1, type: "consultation", name: "General Consultation", amount: 1500 },
      { id: 2, type: "lab", name: "CBC", amount: 2500 },
      { id: 3, type: "medicine", name: "Medicines", amount: 4500 },
    ],
  },
];
