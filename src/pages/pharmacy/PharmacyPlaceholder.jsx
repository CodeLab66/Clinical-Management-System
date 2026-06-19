import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function PharmacyPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Pharmacy"
      title="Pharmacy Module"
      description="Pharmacy routes are reserved for prescription queues and dispensing workflows."
      {...props}
    />
  );
}
