import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export function TablePagination({ page = 1, totalPages = 1, onPrevious, onNext }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-3">
      <span className="text-sm font-semibold text-text-muted">Page {page} of {totalPages}</span>
      <IconButton icon={ChevronLeft} label="Previous page" onClick={onPrevious} />
      <IconButton icon={ChevronRight} label="Next page" onClick={onNext} />
    </div>
  );
}
