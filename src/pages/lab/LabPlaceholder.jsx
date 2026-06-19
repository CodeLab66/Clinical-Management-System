import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function LabPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Lab"
      title="Lab Module"
      description="Lab routes are reserved for diagnostics queues, orders, and result entry."
      {...props}
    />
  );
}
