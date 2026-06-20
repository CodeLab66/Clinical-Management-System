import { useId } from "react";
import { chartPalette } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { MiniLegend } from "@/components/charts/MiniLegend";

function polarToCartesian(center, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
}

function describeArc(center, radius, startAngle, endAngle) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export function DonutProgressChart({
  title,
  value = 0,
  label,
  segments,
  completedColor = chartPalette.success,
  progressColor = chartPalette.primary,
  pendingPattern = true,
  size = 220,
  strokeWidth = 24,
  legend,
  compact = false,
  className,
}) {
  const resolvedSize = compact ? Math.min(size, 176) : size;
  const resolvedStroke = compact ? Math.min(strokeWidth, 20) : strokeWidth;
  const patternId = useId().replaceAll(":", "");
  const center = resolvedSize / 2;
  const radius = (resolvedSize - resolvedStroke) / 2;
  const safeValue = Math.min(Math.max(Number(value), 0), 100);
  const chartSegments = segments?.length
    ? segments
    : [
        { key: "completed", value: safeValue, color: progressColor || completedColor },
        { key: "pending", value: 100 - safeValue, pattern: pendingPattern },
      ];

  let cursor = -130;
  const gap = 4;

  return (
    <div className={cn("flex min-w-0 flex-col items-center", className)}>
      {(title || label) && (
        <div className="mb-4 w-full text-center">
          {title ? <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3> : null}
        </div>
      )}
      <div className="relative max-w-full" style={{ height: resolvedSize, width: resolvedSize }}>
        <svg viewBox={`0 0 ${resolvedSize} ${resolvedSize}`} className="h-full w-full">
          <defs>
            <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
              <rect width="8" height="8" fill={chartPalette.stripeBase} opacity="0.75" />
              <rect width="2" height="8" fill={chartPalette.stripeLine} opacity="0.35" />
            </pattern>
          </defs>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={chartPalette.muted}
            strokeWidth={resolvedStroke}
            opacity="0.45"
          />
          {chartSegments.map((segment) => {
            const degrees = Math.max((Number(segment.value || 0) / 100) * 360 - gap, 0);
            const start = cursor;
            const end = cursor + degrees;
            cursor = end + gap;

            if (degrees <= 0) return null;

            return (
              <path
                key={segment.key || segment.label || start}
                d={describeArc(center, radius, start, end)}
                fill="none"
                stroke={segment.pattern ? `url(#${patternId})` : segment.color || progressColor}
                strokeWidth={resolvedStroke}
                className="progress-arc-rounded"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn("font-heading font-bold text-text-main", compact ? "text-3xl" : "text-4xl")}>{safeValue}%</span>
          {label ? <span className={cn("mt-1 font-semibold text-text-muted", compact ? "text-xs" : "text-sm")}>{label}</span> : null}
        </div>
      </div>
      {legend?.length ? <MiniLegend items={legend} compact={compact} className="mt-4 justify-center" /> : null}
    </div>
  );
}
