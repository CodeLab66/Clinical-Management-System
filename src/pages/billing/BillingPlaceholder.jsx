import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function BillingPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Billing"
      title="Billing Module"
      description="Billing routes are reserved for bill summaries and POS handoff workflows."
      {...props}
    />
  );
}
