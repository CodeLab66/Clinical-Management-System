import { chartPalette } from "@/constants/theme";
import { cn } from "@/lib/utils";

const variantColors = {
  appointments: chartPalette.primary,
  revenue: chartPalette.primary,
  activity: chartPalette.success,
  inventory: chartPalette.warning,
};

const variantPalettes = {
  appointments: [chartPalette.primaryDark, chartPalette.primary, "#F49A63", "#F3B28B"],
  revenue: [chartPalette.primaryDark, chartPalette.primary, "#F49A63", "#F3B28B"],
  activity: [chartPalette.success, chartPalette.primary, chartPalette.primaryDark],
  inventory: [chartPalette.warning, chartPalette.primary, "#F3B28B", chartPalette.success],
};

const stripeImage =
  "repeating-linear-gradient(135deg, rgba(98,98,98,0.18) 0, rgba(98,98,98,0.18) 2px, transparent 2px, transparent 7px)";

export function RoundedBarChart({
  title,
  subtitle,
  data = [],
  activeIndex = 0,
  valueKey = "value",
  labelKey = "label",
  height = 220,
  showValueBubble = true,
  variant = "appointments",
  compact = false,
  className,
}) {
  const chartHeight = compact ? `clamp(120px, 16vw, ${height}px)` : height;
  const activeColor = variantColors[variant] || chartPalette.primary;
  const solidPalette = variantPalettes[variant] || variantPalettes.appointments;

  return (
    <div className={cn("chart-wrapper min-w-0 w-full max-w-full overflow-hidden", className)}>
      {(title || subtitle) && (
        <div className="mb-5">
          {title ? <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3> : null}
          {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
        </div>
      )}
      <div
        className={cn("weekly-bars grid min-w-0 items-stretch", compact ? "gap-1.5 min-[900px]:gap-2 xl:gap-3" : "gap-5")}
        style={{
          height: chartHeight,
          gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))`,
        }}
      >
        {data.map((item, index) => {
          const value = Number(item[valueKey] || 0);
          const percent = Math.min(Math.max(value, 0), 100);
          const displayValue = item.valueLabel || `${Math.round(value)}%`;
          const isActive = index === activeIndex || item.active;
          const isStriped = item.pattern || item.status === "pending" || item.status === "inactive";
          const fillColor =
            item.color ||
            (isActive
              ? activeColor
              : isStriped
                ? "rgba(233,120,58,0.32)"
                : solidPalette[index % solidPalette.length]);

          return (
            <div key={item.id || item[labelKey] || index} className={cn("weekly-bar-item flex h-full min-w-0 flex-col items-center overflow-hidden", compact ? "gap-1.5 xl:gap-2" : "gap-3")}>
              <div className={cn("relative flex min-h-0 w-full flex-1 items-end justify-center", compact ? "pt-7" : "pt-9")}>
                {showValueBubble ? (
                  <span
                    className={cn(
                      "absolute z-20 whitespace-nowrap rounded-full border border-white/70 font-bold shadow-soft",
                      compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
                      isActive ? "bg-primary-soft text-primary-dark" : "bg-white/85 text-text-secondary",
                    )}
                    style={{
                      bottom: `calc(${percent}% + ${compact ? 6 : 10}px)`,
                      transform: percent > 88 ? `translateY(${compact ? 20 : 26}px)` : undefined,
                    }}
                  >
                    {displayValue}
                  </span>
                ) : null}
                <div
                  className={cn(
                    "chart-bar-pill relative h-full w-full overflow-hidden bg-white/55 transition",
                    compact ? "min-w-7 max-w-10" : "min-w-9 max-w-14",
                  )}
                  aria-label={`${item[labelKey]} ${displayValue}`}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-full"
                    style={{
                      height: `${percent}%`,
                      backgroundColor: fillColor,
                      backgroundImage: isStriped ? stripeImage : undefined,
                    }}
                  />
                </div>
              </div>
              <span className={cn("weekly-bar-label max-w-full truncate whitespace-nowrap font-bold text-text-muted", compact ? "text-[10px] xl:text-[11px]" : "text-xs")}>{item[labelKey]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
