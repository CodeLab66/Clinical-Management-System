import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUploadCard({ title = "Upload file", description, accept, onChange, className }) {
  return (
    <label className={cn("orange-focus flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/70 bg-white/45 p-6 text-center transition hover:bg-white/65", className)} tabIndex={0}>
      <UploadCloud className="h-8 w-8 text-primary" aria-hidden="true" />
      <span className="mt-3 text-sm font-bold text-text-main">{title}</span>
      {description ? <span className="mt-1 max-w-sm text-xs leading-5 text-text-muted">{description}</span> : null}
      <input className="sr-only" type="file" accept={accept} onChange={onChange} />
    </label>
  );
}
