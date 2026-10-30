import { renderBadge } from "../atoms/badge.js";

export interface ScreenFrameProps {
  screenId: string;
  screenName: string;
  role: "copilot" | "operator" | "preflight" | "custom";
  broadcastPhase: "preflight" | "live" | "post";
  directorMode: "autonomous" | "advisory" | "manual";
  placeInEvent?: string | null | undefined;
  activeSection?: string | null | undefined;
  standingRulesActiveCount?: number | undefined;
  bodyHtml: string;
  hoversHtml?: string | undefined;
  className?: string | undefined;
}

export function renderScreenFrame(props: ScreenFrameProps): string {
  const phaseVariant =
    props.broadcastPhase === "live"
      ? "error"
      : props.broadcastPhase === "preflight"
        ? "warning"
        : "neutral";

  const modeVariant =
    props.directorMode === "autonomous"
      ? "success"
      : props.directorMode === "advisory"
        ? "warning"
        : "neutral";

  const rulesBadge =
    props.standingRulesActiveCount && props.standingRulesActiveCount > 0
      ? renderBadge({
          label: `${props.standingRulesActiveCount} Standing UI Rule${props.standingRulesActiveCount > 1 ? "s" : ""}`,
          variant: "accent",
        })
      : "";

  return `<div id="screen-${props.screenId}" data-screen-id="${props.screenId}" data-screen-role="${props.role}" data-broadcast-phase="${props.broadcastPhase}" class="piui-screen-frame relative rounded-2xl border border-outline-variant/40 bg-surface p-4 space-y-4 ${props.className ?? ""}">
    <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-outline-variant/30">
      <div class="flex items-center gap-2">
        <span class="font-headline-sm text-[15px] font-bold text-on-surface">${props.screenName}</span>
        <span class="text-[11px] font-mono text-on-surface-variant">#${props.screenId}</span>
        ${renderBadge({ label: props.broadcastPhase.toUpperCase(), variant: phaseVariant, dot: props.broadcastPhase === "live" ? "live" : "standby", pulse: props.broadcastPhase === "live" })}
        ${renderBadge({ label: `DIRECTOR: ${props.directorMode.toUpperCase()}`, variant: modeVariant })}
        ${rulesBadge}
      </div>
      <div class="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
        ${props.placeInEvent ? `<span>Cue: ${props.placeInEvent}</span>` : ""}
        ${props.activeSection ? `<span>| Section: ${props.activeSection}</span>` : ""}
      </div>
    </div>
    <div class="piui-screen-body space-y-4">
      ${props.bodyHtml}
    </div>
    ${props.hoversHtml ? `<div class="piui-screen-hovers space-y-2 pt-2">${props.hoversHtml}</div>` : ""}
  </div>`;
}
