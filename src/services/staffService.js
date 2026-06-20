import { mockStaff } from "@/data/mockStaff";

export async function getStaff() {
  return Promise.resolve(mockStaff);
}

export async function getStaffById(id) {
  return Promise.resolve(mockStaff.find((staff) => String(staff.id) === String(id)) || null);
}

export async function createStaff(payload) {
  return Promise.resolve({ id: `stf-${Date.now()}`, ...payload });
}

export async function updateStaff(id, payload) {
  return Promise.resolve({ id, ...payload });
}

export async function disableStaff(id) {
  return Promise.resolve({ id, accountStatus: "Inactive" });
}

export const staffService = {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  disableStaff,
};
