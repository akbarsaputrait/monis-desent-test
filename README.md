# monis.rent — Workspace Configurator

Interactive 3D workspace configurator for renting office equipment in Bali. Users pick a desk, chair, monitors, and accessories, preview the setup in real-time 3D, and see a live pricing summary in IDR.

## Features

- **3D Live Preview** — React Three Fiber scene with orbit controls, contact shadows, and environment lighting. Models are normalized and positioned automatically.
- **Item Picker** — Tabbed picker for desks, chairs, and accessories (monitors, lamp, plant) with quantity controls.
- **Setup Summary** — Sidebar showing selected items, quantities, and monthly total formatted in IDR.
- **Dual Monitor Support** — Place up to 2 monitors with preset positions per monitor type (27" 4K, Ultrawide).
- **Asset Preloading** — All `.glb` models are preloaded with a progress screen before the configurator renders.

## Tech Stack

| Layer      | Technology                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)                                                                     |
| UI         | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)      |
| 3D         | [React Three Fiber](https://r3f.docs.pmnd.rs), [Drei](https://drei.docs.pmnd.rs), [Three.js](https://threejs.org) |
| Runtime    | [Bun](https://bun.sh)                                                                                             |
| Linting    | [OxLint](https://oxc.rs/docs/guide/usage/linter)                                                                  |
| Formatting | [OxFmt](https://oxc.rs/docs/guide/usage/formatter)                                                                |
| Git Hooks  | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged)             |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `bun dev`           | Start development server         |
| `bun run build`     | Production build                 |
| `bun start`         | Serve production build           |
| `bun run lint`      | Run OxLint                       |
| `bun run lint:fix`  | Auto-fix lint issues             |
| `bun run fmt`       | Format code with OxFmt           |
| `bun run fmt:check` | Check formatting without writing |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Home page with header/footer
│   └── globals.css         # Tailwind + custom styles
├── components/
│   ├── ui/                 # shadcn/ui primitives (badge, button, card, etc.)
│   └── workspace/
│       ├── workspace-builder.tsx   # Orchestrator: loading, state, layout
│       ├── workspace-preview.tsx   # 3D canvas with model placement
│       ├── item-picker.tsx         # Tabbed product selector
│       └── setup-summary.tsx       # Pricing sidebar
├── lib/
│   ├── catalog.ts          # Product catalog (desks, chairs, accessories)
│   ├── configurator.ts     # Selection state, pricing, summary logic
│   └── utils.ts            # cn() helper
public/
└── 3d/                     # GLB 3D models (desks, chairs, monitors, etc.)
```

## Credits

3D models sourced from [Sketchfab](https://sketchfab.com/).
