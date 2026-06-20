import { mockBranches } from "@/data/mockBranches";

export async function getBranches() {
  return Promise.resolve(mockBranches);
}

export async function getBranchById(id) {
  return Promise.resolve(mockBranches.find((branch) => String(branch.id) === String(id)) || null);
}

export async function createBranch(payload) {
  return Promise.resolve({ id: `br-${Date.now()}`, ...payload });
}

export async function updateBranch(id, payload) {
  return Promise.resolve({ id, ...payload });
}

export async function deleteBranch(id) {
  return Promise.resolve({ id, deleted: true });
}

export const branchService = {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
