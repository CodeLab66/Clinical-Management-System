import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function ReceptionPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Reception"
      title="Reception Workflow"
      description="Reception routes are reserved for requests, appointments, queue, and check-in workflows."
      {...props}
    />
  );
}
