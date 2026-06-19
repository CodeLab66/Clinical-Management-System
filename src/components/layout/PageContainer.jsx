import { cn } from "@/lib/utils";

export function PageContainer({ children, className }) {
  return <div className={cn("page-shell", className)}>{children}</div>;
}
