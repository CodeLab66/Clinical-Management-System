import { mockDoctorSchedules } from "@/data/mockSchedules";

export async function getDoctorSchedules() {
  return Promise.resolve(mockDoctorSchedules);
}

export async function createSchedule(payload) {
  return Promise.resolve({ id: `sch-${Date.now()}`, ...payload });
}

export async function updateSchedule(id, payload) {
  return Promise.resolve({ id, ...payload });
}

export async function deleteSchedule(id) {
  return Promise.resolve({ id, deleted: true });
}

export const scheduleService = {
  getDoctorSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
