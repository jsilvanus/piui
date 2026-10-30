import { renderBadge } from "../atoms/badge.js";
import { renderButton } from "../atoms/button.js";
import { renderIcon } from "../atoms/icon.js";

export type HoverPlacement =
  | "top-right"
  | "bottom-right"
  | "bottom-bar"
  | "top-bar"
  | "center-modal"
  | "inline-popover";

export type HoverTone = "neutral" | "advisory" | "directing" | "warning" | "urgent";

export interface HoverProps {
  id: string;
  title: string;
  subtitle?: string | undefined;
  icon?: string | undefined;
  placement?: HoverPlacement | undefined;
  tone?: HoverTone | undefined;
  badgeLabel?: string | undefined;
  dismissible?: boolean | undefined;
  pinned?: boolean | undefined;
  autoHideSec?: number | undefined;
  actionsHtml?: string | undefined;
  content: string;
  className?: string | undefined;
}

export function renderHover(props: HoverProps): string {
  const placement = props.placement ?? "bottom-right";
  const tone = props.tone ?? "advisory";

  const toneStyles: Record<HoverTone, string> = {
    neutral: "bg-surface-container-highest/95 border-outline-variant/50",
    advisory: "bg-amber-950/90 dark:bg-amber-950/90 border-amber-400/60 ring-2 ring-amber-400/30",
    directing: "bg-emerald-950/90 border-emerald-400/60 ring-1 ring-emerald-400/30",
    warning: "bg-orange-950/90 border-orange-400/60 ring-1 ring-orange-400/30",
    urgent: "bg-rose-950/95 border-rose-500/80 ring-2 ring-rose-500/40",
  };

  const badgeVariants: Record<HoverTone, "neutral" | "warning" | "success" | "error"> = {
    neutral: "neutral",
    advisory: "warning",
    directing: "success",
    warning: "warning",
    urgent: "error",
  };

  const dismissBtn =
    props.dismissible !== false
      ? renderButton({
          label: "Dismiss",
          variant: "ghost",
          size: "xs",
          dataAttributes: { action: "dismiss-hover", hoverId: props.id },
        })
      : "";

  const badgeHtml = props.badgeLabel
    ? renderBadge({
        label: props.badgeLabel,
        variant: badgeVariants[tone],
        pulse: tone === "advisory" || tone === "urgent",
      })
    : "";

  const autoHideAttr =
    typeof props.autoHideSec === "number" ? ` data-auto-hide-sec="${props.autoHideSec}"` : "";

  return `<aside id="hover-${props.id}" data-hover-id="${props.id}" data-hover-placement="${placement}" data-hover-tone="${tone}"${autoHideAttr} class="piui-hover rounded-2xl border p-3.5 shadow-xl backdrop-blur-md space-y-2.5 transition-all ${toneStyles[tone]} ${props.className ?? ""}">
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2 min-w-0">
        ${props.icon ? `<div class="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">${renderIcon({ name: props.icon, size: 16 })}</div>` : ""}
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="font-headline-sm text-[14px] font-bold text-on-surface leading-tight truncate">${props.title}</h4>
            ${badgeHtml}
          </div>
          ${props.subtitle ? `<p class="font-label-sm text-[10px] text-on-surface-variant truncate mt-0.5">${props.subtitle}</p>` : ""}
        </div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        ${props.actionsHtml ?? ""}
        ${dismissBtn}
      </div>
    </div>
    <div class="piui-hover-body text-xs text-on-surface space-y-2">
      ${props.content}
    </div>
  </aside>`;
}
