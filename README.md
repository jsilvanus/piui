# piui (`@piecosystem/piui`)

Unified atomic and molecular UI component primitives for the **Raspberry Pi Production Ecosystem** (`piecosystem`) at Riihimäen Keskuskirkko.

Powering operator consoles, telemetry cards, broadcast monitors, and generative AI agent interfaces in [`picontrol`](file:///d:/picontrol), [`piagent`](file:///d:/piagent), and [`pirundown-designer`](file:///d:/pirundown-designer).

---

## Component Architecture

Organized according to Atomic Design principles:

### Atoms (`src/atoms/`)
Lightweight, framework-agnostic UI primitives emitting standard Tailwind CSS markup:
- **`renderBadge`**: Status and metadata badges (neutral, success, warning, error, primary).
- **`renderButton`**: Multi-variant interactive buttons (primary, secondary, danger, ghost, surface).
- **`renderCard`**: Surface container card with headers and borders.
- **`renderIcon`**: Inline SVG icons (camera, PTZ, volume, stream, stop, play).
- **`renderMeter`**: Audio level and telemetry VU meters.
- **`renderSlider`**: Visual level controls.
- **`renderStatusDot`**: Live/standby/error dot with optional pulse animation.
- **`renderTextInput`**: Form inputs and search bars.
- **`renderToggleSwitch`**: Binary feature toggles.
- **`renderSpeakerBadge`**: Pseudonymized liturgical speaker chips.
- **`renderAgentStatusBadge`**: Agent state indicator (`IDLE`, `RUNNING`, `INTERRUPTED`, `ERROR`).
- **`renderAgentPriorityPill`**: Concurrency priority indicator (`REALTIME`, `INTERACTIVE`, `BACKGROUND`).
- **`renderModelBadge`**: Local LLM model tags (`llama3.2:latest`, `qwen2.5:7b`).

### Molecules (`src/molecules/`)
Composed functional widgets for live broadcasting:
- **AV & Switching**: `renderAtemBusSelector`, `renderMatrixRouteRow`, `renderRoutingOutputCard`, `renderTallyFacetWidget`.
- **PTZ & Framing**: `renderPtzPad`, `renderPtzPresetCard`.
- **Audio & Speech**: `renderAudioFader`, `renderCaptionItem`, `renderLiveCaptionsFeed`, `renderRadioPlayerCard`.
- **Rundown & Orchestration**: `renderCueButtonGroup`, `renderCueTriggerBadge`, `renderRundownItemCard`.
- **Monitoring**: `renderEncoderMonitor`, `renderStreamStatusCard`, `renderEcosystemHealthCard`, `renderSlideFeedCard`.
- **AI Agents**:
  - `renderAgentCard`: Comprehensive agent status card with model, priority, and stop/chat actions.
  - `renderAgentChatBubble`: Chat message & thought trace bubble with streaming cursor.
  - `renderAgentToolInvocationCard`: Interactive card showing executed tool calls and results.
  - `renderAgentControlToolbar`: Global agent switcher and emergency preemption toolbar.

---

## Installation & Usage

```bash
pnpm add @piecosystem/piui
```

```typescript
import { renderAgentCard, renderAgentStatusBadge } from "@piecosystem/piui";

// Render agent card into HTML / DOM
const cardHtml = renderAgentCard({
  id: "copilot",
  name: "Broadcast Operator Copilot",
  model: "llama3.2:latest",
  priority: "interactive",
  status: "running",
  toolsCount: 5,
});
```

---

## Component Catalog

`piui` includes an interactive component catalog showcasing all 14 atoms and 21 molecules across all ecosystem services (`pitube`, `pivoice`, `pilight`, `pisound`, `pimatrix`, `piswitch`, `piprogram`, `picanva`, `pigateway`, `piagent`, `pirundown`).

Generate the standalone catalog:
```bash
pnpm run catalog
# Generates catalog.html and dist/catalog.html
```
Open `catalog.html` directly in any web browser to explore visual variants, interactive state toggles, and live previews.

---

## Development

```bash
pnpm install
pnpm run build     # Compiles TypeScript and generates catalog.html
pnpm run catalog   # Generates the standalone component catalog
pnpm run typecheck # Validates type integrity
```
