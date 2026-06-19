import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function SettingsPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Settings"
      title="Settings"
      description="Settings routes are reserved for clinic, branch, services, roles, and system configuration."
      {...props}
    />
  );
}
