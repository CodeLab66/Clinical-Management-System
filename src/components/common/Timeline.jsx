import { TimelineItem } from "@/components/common/TimelineItem";

export function Timeline({ items = [] }) {
  return (
    <ol className="relative before:absolute before:left-5 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/70">
      {items.map((item) => <TimelineItem key={item.id} {...item} />)}
    </ol>
  );
}
