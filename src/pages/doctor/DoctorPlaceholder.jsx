import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function DoctorPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Doctor Workspace"
      title="Doctor Module"
      description="Doctor routes are reserved for dashboard, consultations, prescriptions, vaccination, and deworming."
      {...props}
    />
  );
}
