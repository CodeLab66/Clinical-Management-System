import { mockRoles, permissionActions, permissionModules } from "@/data/mockRoles";

export async function getRoles() {
  return Promise.resolve(mockRoles);
}

export async function getPermissions() {
  return Promise.resolve({ modules: permissionModules, actions: permissionActions });
}

export async function updateRolePermissions(roleId, permissions) {
  return Promise.resolve({ roleId, permissions, updated: true });
}

export const roleService = {
  getRoles,
  getPermissions,
  updateRolePermissions,
};
