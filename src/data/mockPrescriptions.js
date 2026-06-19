export const mockPrescriptions = [
  {
    id: 1,
    visit_id: 1,
    pet_id: 1,
    client_id: 1,
    doctor_id: 1,
    status: "pharmacy_pending",
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
        refill_allowed: false,
      },
    ],
    owner_instructions: "Keep pet hydrated and return if vomiting continues.",
  },
];
