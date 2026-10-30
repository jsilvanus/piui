import { renderBadge } from "../atoms/badge.js";
import { renderIcon } from "../atoms/icon.js";

export type PanelTone = "default" | "advisory" | "directing" | "manual" | "preflight" | "standing-rule";

export interface PanelProps {
  id: string;
  title: string;
  subtitle?: string | undefined;
  icon?: string | undefined;
  tone?: PanelTone | undefined;
  sourceLabel?: string | undefined;
  zone?: string | undefined;
  collapsible?: boolean | undefined;
  collapsed?: boolean | undefined;
  pinned?: boolean | undefined;
  actionsHtml?: string | undefined;
  content: string;
  footerHtml?: string | undefined;
  className?: string | undefined;
}

export function renderPanel(props: PanelProps): string {
  const tone = props.tone ?? "default";

  let containerStyle = "bg-surface-container-low border-outline-variant/30";
  let badgeVariant: "neutral" | "primary" | "warning" | "error" | "success" | "accent" = "neutral";

  switch (tone) {
    case "advisory":
      containerStyle = "bg-amber-500/5 border-amber-500/40 ring-1 ring-amber-500/20";
      badgeVariant = "warning";
      break;
    case "directing":
      containerStyle = "bg-emerald-500/5 border-emerald-500/40 ring-1 ring-emerald-500/20";
      badgeVariant = "success";
      break;
    case "manual":
      containerStyle = "bg-rose-500/5 border-rose-500/40";
      badgeVariant = "error";
      break;
    case "preflight":
      containerStyle = "bg-primary/5 border-primary/30";
      badgeVariant = "primary";
      break;
    case "standing-rule":
      containerStyle = "bg-surface-container border-primary/40 border-dashed";
      badgeVariant = "accent";
      break;
    default:
      containerStyle = "bg-surface-container-low border-outline-variant/30";
      break;
  }

  const sourceBadge = props.sourceLabel
    ? renderBadge({
        label: props.sourceLabel,
        variant: badgeVariant,
        pulse: tone === "advisory" || tone === "directing",
      })
    : "";

  const pinIndicator = props.pinned
    ? `<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant" title="Pinned panel">PINNED</span>`
    : "";

  const collapseAttr = props.collapsible ? ` data-collapsible="true" data-collapsed="${Boolean(props.collapsed)}"` : "";
  const zoneAttr = props.zone ? ` data-panel-zone="${props.zone}"` : "";

  return `<section id="panel-${props.id}" data-panel-id="${props.id}" data-panel-tone="${tone}"${zoneAttr}${collapseAttr} class="piui-panel rounded-xl border p-3.5 shadow-sm flex flex-col gap-3 transition-all ${containerStyle} ${props.className ?? ""}">
    <header class="flex items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
      <div class="flex items-center gap-2 min-w-0">
        ${props.icon ? `<div class="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">${renderIcon({ name: props.icon, size: 16 })}</div>` : ""}
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-headline-sm text-[14px] font-bold text-on-surface leading-tight truncate">${props.title}</h3>
            ${sourceBadge}
            ${pinIndicator}
          </div>
          ${props.subtitle ? `<p class="font-label-sm text-[10px] text-on-surface-variant truncate mt-0.5">${props.subtitle}</p>` : ""}
        </div>
      </div>
      ${props.actionsHtml ? `<div class="flex items-center gap-1.5 flex-shrink-0">${props.actionsHtml}</div>` : ""}
    </header>
    ${props.collapsed ? "" : `<div class="piui-panel-body flex-1 space-y-2.5">${props.content}</div>`}
    ${props.footerHtml && !props.collapsed ? `<footer class="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">${props.footerHtml}</footer>` : ""}
  </section>`;
}
