import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  LockKeyhole,
  Plus,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { RoleBadge } from "@/components/badges/RoleBadge";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { PermissionMatrix } from "@/components/tables/PermissionMatrix";
import { ActionButton } from "@/components/ui/ActionButton";
import { roleKpis } from "@/data/mockRoles";
import { roleService } from "@/services/roleService";
import { cn } from "@/lib/utils";

const iconMap = { Ban, LockKeyhole, ShieldCheck, SlidersHorizontal, UsersRound };

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    Promise.all([roleService.getRoles(), roleService.getPermissions()]).then(([roleData, permissionData]) => {
      setRoles(roleData);
      setModules(permissionData.modules);
      setActions(permissionData.actions);
      setSelectedRoleId(roleData[0]?.id || "");
      setLoading(false);
    });
  }, []);

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId),
    [roles, selectedRoleId],
  );

  const togglePermission = (module, action) => {
    setRoles((current) => current.map((role) => {
      if (role.id !== selectedRoleId) return role;
      const currentActions = role.permissions[module] || [];
      const nextActions = currentActions.includes(action)
        ? currentActions.filter((item) => item !== action)
        : [...currentActions, action];
      return {
        ...role,
        permissions: {
          ...role.permissions,
          [module]: nextActions,
        },
      };
    }));
  };

  const saveChanges = async () => {
    if (!selectedRole) return;
    await roleService.updateRolePermissions(selectedRole.id, selectedRole.permissions);
    setNotice(`${selectedRole.name} permissions saved locally.`);
  };

  if (loading) {
    return (
      <PageContainer className="space-y-4">
        <LoadingSkeleton className="min-h-[116px]" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {roleKpis.map((item) => <LoadingSkeleton key={item.label} />)}
        </div>
        <LoadingSkeleton variant="table" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control module access for each clinic role."
        actions={(
          <>
            <ActionButton icon={Plus}>Add Role</ActionButton>
            <ActionButton icon={Save} onClick={saveChanges}>Save Changes</ActionButton>
          </>
        )}
      />

      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {roleKpis.map((item) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <div className="grid items-start gap-4 min-[900px]:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_280px]">
        <GlassCard className="space-y-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Clinic Roles</h2>
            <p className="mt-1 text-sm text-text-secondary">Select a role to edit access.</p>
          </div>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition",
                  selectedRoleId === role.id ? "bg-primary text-white shadow-soft" : "bg-white/45 text-text-secondary hover:bg-white/75",
                )}
              >
                <span>
                  <span className="block text-sm font-black">{role.name}</span>
                  <span className={cn("mt-1 block text-xs font-semibold", selectedRoleId === role.id ? "text-white/80" : "text-text-muted")}>
                    {role.assignedUsers} users assigned
                  </span>
                </span>
                <span className={cn("rounded-full px-2 py-1 text-[10px] font-black", selectedRoleId === role.id ? "bg-white/20 text-white" : "bg-black/5 text-text-muted")}>
                  {role.type}
                </span>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Permission Matrix</h2>
            <p className="mt-1 text-sm text-text-secondary">Toggle module actions for {selectedRole?.name}.</p>
          </div>
          <PermissionMatrix
            modules={modules}
            actions={actions}
            permissions={selectedRole?.permissions}
            onToggle={togglePermission}
          />
        </GlassCard>

        <GlassCard className="space-y-4 min-[900px]:col-span-2 xl:col-span-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">Role details</p>
            <h2 className="mt-2 font-heading text-xl font-bold text-text-main">{selectedRole?.name}</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{selectedRole?.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <RoleBadge role={selectedRole?.name} />
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-text-secondary">{selectedRole?.type}</span>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="rounded-[18px] bg-white/45 p-3">
              <p className="font-bold text-text-muted">Assigned users</p>
              <p className="mt-1 font-heading text-2xl font-bold text-text-main">{selectedRole?.assignedUsers}</p>
            </div>
            <div className="rounded-[18px] bg-white/45 p-3">
              <p className="font-bold text-text-muted">Risk level</p>
              <p className="mt-1 font-bold text-text-main">{selectedRole?.riskLevel}</p>
            </div>
            <div className="rounded-[18px] bg-white/45 p-3">
              <p className="font-bold text-text-muted">Last updated</p>
              <p className="mt-1 font-bold text-text-main">{selectedRole?.lastUpdated}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
