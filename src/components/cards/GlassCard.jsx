import { cn } from "@/lib/utils";

export function GlassCard({
  as: Component = "section",
  className,
  children,
  padded = true,
}) {
  return (
    <Component className={cn("glass-card", padded && "p-5 md:p-6", className)}>
      {children}
    </Component>
  );
}
