import { cn } from "@/lib/utils";

export function ContentGrid({ children, columns = "auto", className }) {
  const minWidth = columns === 2 ? "22rem" : columns === 3 ? "18rem" : columns === 4 ? "15rem" : "14rem";

  return (
    <div
      className={cn("grid gap-5", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))` }}
    >
      {children}
    </div>
  );
}
