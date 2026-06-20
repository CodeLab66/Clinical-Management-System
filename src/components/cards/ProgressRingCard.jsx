import { ChartCard } from "@/components/cards/ChartCard";
import { DonutProgressChart } from "@/components/charts/DonutProgressChart";
import { cn } from "@/lib/utils";

export function ProgressRingCard({
  title,
  subtitle,
  filterText,
  value,
  label,
  legend,
  compact = false,
  className,
  ...chartProps
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} filterText={filterText} compact={compact} className={cn("text-center", className)}>
      <DonutProgressChart value={value} label={label} legend={legend} compact={compact} {...chartProps} />
    </ChartCard>
  );
}
