import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconButton({ icon: Icon, label, loading = false, className, type = "button", ...props }) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-text-secondary transition hover:bg-white/80 hover:text-text-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", className)}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
