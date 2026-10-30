import { renderBadge } from "../atoms/badge.js";

export interface DocumentSectionItem {
  id: string;
  title: string;
  subtitle?: string | undefined;
  badgeLabel?: string | undefined;
  content: string;
}

export interface DocumentLayoutProps {
  id: string;
  title: string;
  subtitle?: string | undefined;
  showToc?: boolean | undefined;
  maxHeightClass?: string | undefined;
  sections: DocumentSectionItem[];
  className?: string | undefined;
}

/**
 * Long-form scrolling document layout for operator runbooks, scrollable control sheets,
 * and liturgical broadcast documents.
 */
export function renderDocumentLayout(props: DocumentLayoutProps): string {
  const tocHtml =
    props.showToc !== false && props.sections.length > 1
      ? `<nav aria-label="Document sections" class="sticky top-0 z-10 flex flex-wrap items-center gap-1.5 py-2 px-3 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
          <span class="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mr-1">Jump:</span>
          ${props.sections
            .map(
              (sec, idx) =>
                `<a href="#doc-sec-${sec.id}" class="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high hover:bg-primary/15 text-on-surface transition-colors">${idx + 1}. ${sec.title}</a>`
            )
            .join("")}
        </nav>`
      : "";

  const sectionsHtml = props.sections
    .map(
      (sec, idx) => `
      <article id="doc-sec-${sec.id}" data-doc-section-id="${sec.id}" class="piui-document-section py-4 first:pt-2 last:pb-2 border-b last:border-b-0 border-outline-variant/25 space-y-3">
        <header class="flex items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-primary font-bold">§${idx + 1}</span>
              <h3 class="font-headline-sm text-[16px] font-bold text-on-surface">${sec.title}</h3>
              ${sec.badgeLabel ? renderBadge({ label: sec.badgeLabel, variant: "neutral" }) : ""}
            </div>
            ${sec.subtitle ? `<p class="text-xs text-on-surface-variant mt-0.5">${sec.subtitle}</p>` : ""}
          </div>
        </header>
        <div class="piui-document-section-body space-y-3">
          ${sec.content}
        </div>
      </article>`
    )
    .join("\n");

  const scrollClass = props.maxHeightClass ?? "max-h-[82vh] overflow-y-auto";

  return `<div id="document-${props.id}" data-document-id="${props.id}" class="piui-document rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm ${scrollClass} ${props.className ?? ""}">
    <div class="p-4 border-b border-outline-variant/30 bg-surface-container-low">
      <h2 class="font-headline-md text-[18px] font-bold text-on-surface">${props.title}</h2>
      ${props.subtitle ? `<p class="text-xs text-on-surface-variant mt-0.5">${props.subtitle}</p>` : ""}
    </div>
    ${tocHtml}
    <div class="p-4 space-y-2">
      ${sectionsHtml}
    </div>
  </div>`;
}
