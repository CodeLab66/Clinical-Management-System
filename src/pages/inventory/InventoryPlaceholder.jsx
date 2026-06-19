import { PlaceholderPage } from "@/pages/PlaceholderPage";

export default function InventoryPlaceholder(props) {
  return (
    <PlaceholderPage
      section="Inventory"
      title="Inventory Module"
      description="Inventory routes are reserved for stock, alerts, suppliers, and purchase orders."
      {...props}
    />
  );
}
