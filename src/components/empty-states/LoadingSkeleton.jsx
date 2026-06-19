import { cn } from "@/lib/utils";

export function LoadingSkeleton({ variant = "card", className }) {
  const rows = variant === "table" ? 5 : variant === "profile" ? 3 : 4;

  return (
    <div className={cn("glass-card space-y-4 p-5 md:p-6", className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={cn("h-4 animate-pulse rounded-full bg-white/70", index === 0 ? "w-2/3" : "w-full", variant === "profile" && index === 0 && "h-16 w-16 rounded-[22px]")}
        />
      ))}
    </div>
  );
}
