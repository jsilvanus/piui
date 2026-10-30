export type DivisionDirection = "horizontal" | "vertical" | "grid";

export interface DivisionSlot {
  id: string;
  label?: string | undefined;
  colSpan?: 1 | 2 | 3 | 4 | undefined;
  content: string;
  className?: string | undefined;
}

export interface DivisionProps {
  id: string;
  direction?: DivisionDirection | undefined;
  columns?: 1 | 2 | 3 | 4 | undefined;
  gap?: "xs" | "sm" | "md" | "lg" | undefined;
  divided?: boolean | undefined;
  slots: DivisionSlot[];
  className?: string | undefined;
}

export function renderDivision(props: DivisionProps): string {
  const direction = props.direction ?? "grid";
  const cols = props.columns ?? 2;

  const gapMap: Record<NonNullable<DivisionProps["gap"]>, string> = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };
  const gapClass = gapMap[props.gap ?? "md"];

  let layoutClass = "";
  if (direction === "vertical") {
    layoutClass = `flex flex-col ${gapClass} ${props.divided ? "divide-y divide-outline-variant/30" : ""}`;
  } else if (direction === "horizontal") {
    layoutClass = `flex flex-col lg:flex-row items-stretch ${gapClass} ${props.divided ? "lg:divide-x divide-outline-variant/30" : ""}`;
  } else {
    const colClass =
      cols === 1
        ? "grid-cols-1"
        : cols === 3
          ? "grid-cols-1 md:grid-cols-3"
          : cols === 4
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2";
    layoutClass = `grid ${colClass} ${gapClass}`;
  }

  const spanMap: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  };

  const slotsHtml = props.slots
    .map((slot) => {
      const spanClass =
        direction === "grid" && slot.colSpan ? spanMap[slot.colSpan] ?? "" : direction === "horizontal" ? "flex-1 min-w-0" : "";
      const labelHtml = slot.label
        ? `<div class="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/70 mb-1.5">${slot.label}</div>`
        : "";
      return `<div id="division-slot-${slot.id}" data-slot-id="${slot.id}" class="piui-division-slot ${spanClass} ${slot.className ?? ""}">${labelHtml}${slot.content}</div>`;
    })
    .join("\n");

  return `<div id="division-${props.id}" data-division-id="${props.id}" data-division-direction="${direction}" class="piui-division ${layoutClass} ${props.className ?? ""}">
    ${slotsHtml}
  </div>`;
}
