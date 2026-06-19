import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-white shadow-[0_12px_25px_rgba(233,120,58,0.25)] hover:bg-primary-dark",
  danger: "bg-danger text-white shadow-[0_12px_25px_rgba(214,69,69,0.20)] hover:bg-danger/90",
  ghost: "bg-white/55 text-text-secondary hover:bg-white/80 hover:text-text-main",
  neutral: "bg-text-main text-white hover:bg-black",
};

export function ActionButton({
  children,
  icon: Icon,
  loading = false,
  variant = "primary",
  className,
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] || variants.primary,
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
