import { cn } from "@/lib/utils";

const paddingClasses = {
  none: "",
  compact: "p-3.5 xl:p-4",
  default: "p-4 xl:p-6",
  spacious: "p-5 xl:p-7",
};

const variantClasses = {
  default: "bg-white/70",
  soft: "bg-white/52",
  solid: "bg-white/85",
};

export function GlassCard({
  as: Component = "section",
  className,
  children,
  padded = true,
  padding = "default",
  variant = "default",
}) {
  const resolvedPadding = padded ? paddingClasses[padding] || paddingClasses.default : "";

  return (
    <Component
      className={cn(
        "glass-card min-w-0 overflow-hidden rounded-[20px] md:rounded-[22px] xl:rounded-[24px]",
        variantClasses[variant] || variantClasses.default,
        resolvedPadding,
        className,
      )}
    >
      {children}
    </Component>
  );
}
