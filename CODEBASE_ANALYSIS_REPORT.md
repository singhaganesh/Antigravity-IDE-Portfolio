# Codebase Analysis Report
## Antigravity IDE Portfolio

**Project:** Antigravity-IDE-Portfolio  
**Analysis Date:** 2026-04-04  
**Report Type:** Complete Codebase Analysis  
**Prepared For:** New Developer Onboarding  

---

## 1. Project Summary

**Antigravity IDE Portfolio** is a personal portfolio website for Ganesh Singha, a Full Stack Developer. The project stands out by mimicking the visual design and chrome of **Visual Studio Code (VS Code)** — the popular IDE — to create an immersive, developer-centric portfolio experience. The entire UI is wrapped in an IDE shell with sidebar, tabs, activity bar, terminal drawer, breadcrumb navigation, status bar, and an "Agent Panel" (AI assistant panel).

**Type:** Web Application (Next.js)  
**Primary Audience:** Recruiters, hiring managers, fellow developers  
**Goal:** Showcase skills, projects, and contact information through a unique IDE-themed interface

---

## 2. Tech Stack

### Core Framework & Runtime
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14.2.18 | React framework with App Router |
| **React** | 18.2.0 | UI component library |
| **TypeScript** | 5.4.5 | Type-safe JavaScript |
| **Node.js** | (environment) | JavaScript runtime |

### Styling & UI
| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | 3.4.3 | Utility-first CSS framework |
| **Framer Motion** | 11.2.10 | Animation library |
| **Lucide React** | 0.378.0 | Icon library |
| **clsx + tailwind-merge** | 2.1.1 / 2.3.0 | Conditional className utility |

### Fonts
| Font | Source | CSS Variable |
|---|---|---|
| **JetBrains Mono** | Google Fonts (next/font) | `--font-jetbrains-mono` |
| **Space Grotesk** | Google Fonts (next/font) | `--font-space-grotesk` |

### Development Tools
| Tool | Purpose |
|---|---|
| **ESLint** | Code linting |
| **PostCSS + Autoprefixer** | CSS processing |
| **TypeScript compiler** | Type checking |

---

## 3. Architecture Overview

### 3.1 Pattern: Single-Page App with App Router + IDE Chrome Shell

The application uses **Next.js 14 App Router** with a unique architectural pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                     TITLE BAR (35px)                       │
│  [traffic lights] [File Edit View ...]  [project-name] [⚙️] │
├──────────┬──────────────────────────────┬───────────────────┤
│ ACTIVITY │         TAB BAR (35px)       │                   │
│  BAR     ├──────────────────────────────┤   AGENT PANEL     │
│ (48px)   │      BREADCRUMB (22px)      │   (resizable)     │
│          ├──────────────────────────────┤                   │
│  Icons   │                              │  [AI Chat UI]     │
│  for:    │    EDITOR AREA               │                   │
│  - Files │    (flex-1)                  │                   │
│  - Search│    - Line numbers (left)     │                   │
│  - Git   │    - Page content (center)   │                   │
│  - Pkgs  │    - Minimap decoration      │                   │
│  - Extns │      (right, xl only)       │                   │
│  ─────── │                              │                   │
│ Settings │                              │                   │
├──────────┴──────────────────────────────┴───────────────────┤
│                  TERMINAL DRAWER (200px)                    │
│  [Problems] [Output] [Terminal ▾] [npm ▾] [×]              │
│  ganesh@ganesh:~$ npm run dev                               │
├─────────────────────────────────────────────────────────────┤
│                    STATUS BAR (22px, fixed bottom)          │
│  [git branch] [errors] [Ln Col] [UTF-8] [LF] [TSX] [AI]    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Routing Architecture

The App Router is used for navigation between portfolio sections:

| Route | Page | "File" |
|---|---|---|
| `/` | Home/Hero | `home.tsx` (React) |
| `/about` | About Me | `about.html` (HTML) |
| `/projects` | Projects Showcase | `projects.js` (JavaScript) |
| `/skills` | Skills & Experience | `skills.json` (JSON) |
| `/contact` | Contact Form | `contact.css` (CSS) |

### 3.3 Component Hierarchy

```
RootLayout (layout.tsx)
└── ActiveFileProvider (context)
    └── WorkspaceLayout
        ├── TitleBar
        ├── ActivityBar
        ├── Sidebar (file tree)
        ├── Editor Area
        │   ├── TabBar (open tabs)
        │   ├── Breadcrumb (navigation path)
        │   ├── Line Numbers gutter
        │   ├── Page Content (children / route page)
        │   └── Minimap decoration
        ├── AgentPanel (resizable right panel)
        ├── TerminalDrawer (collapsible bottom)
        └── StatusBar
```

---

## 4. Module / Component Breakdown

### 4.1 Global Layout Shell

| Component | File | Responsibility |
|---|---|---|
| `RootLayout` | `src/app/layout.tsx` | Root HTML shell, fonts, providers |
| `WorkspaceLayout` | `src/app/layout.tsx` | IDE chrome wrapper, panel resizing |
| `ActiveFileContext` | `src/context/ActiveFileContext.tsx` | Global state for tabs, panels, active file |

### 4.2 IDE Chrome Components (in `src/components/ide/`)

| Component | File | Purpose |
|---|---|---|
| `TitleBar` | `TitleBar.tsx` | Top bar with traffic lights, menus, file name, window controls |
| `ActivityBar` | `ActivityBar.tsx` | Left icon strip (Explorer, Search, Git, Projects, Extensions) |
| `Sidebar` | `Sidebar.tsx` | File tree list, mobile overlay, PORTFOLIO section |
| `TabBar` | `TabBar.tsx` | Open tabs with close buttons, active indicator |
| `Breadcrumb` | `Breadcrumb.tsx` | File path trail: ganesh-singha > src > filename |
| `StatusBar` | `StatusBar.tsx` | Bottom bar: git, errors, cursor position, encoding, AI |
| `TerminalDrawer` | `TerminalDrawer.tsx` | Collapsible terminal panel with mock output |
| `MenuBar` | `MenuBar.tsx` | File/Edit/View... menu strip |
| `AgentPanel` | `AgentPanel.tsx` | Right AI chat panel (responsive layout) |

### 4.3 Page Components (in `src/app/`)

| Page | File | Content |
|---|---|---|
| Home | `page.tsx` | Hero section with typewriter, particles, CTA buttons |
| About | `about/page.tsx` | Profile card, bio, stats |
| Projects | `projects/page.tsx` | Project cards grid |
| Skills | `skills/page.tsx` | Skill clusters, experience timeline |
| Contact | `contact/page.tsx` | Social links + contact form |

### 4.4 Configuration Files

| File | Purpose |
|---|---|
| `tailwind.config.ts` | Custom VS Code dark theme colors, animations, fonts |
| `next.config.mjs` | Next.js configuration |
| `tsconfig.json` | TypeScript path aliases (`@/*` → `src/*`) |
| `.eslintrc.json` | Next.js + TypeScript ESLint rules |
| `postcss.config.js` | Tailwind CSS processing |
| `package.json` | Dependencies and scripts |

---

## 5. File-by-File Reference

### `src/app/layout.tsx`
**Purpose:** Root layout — wraps entire app in IDE chrome  
**Key Contents:**
- Google Fonts setup (JetBrains Mono, Space Grotesk via `next/font/google`)
- `ActiveFileProvider` context wrapper
- `WorkspaceLayout` component rendering the full IDE shell
- Mouse event handlers for panel resizing (agent panel width)
- Line number gutter (50 lines) and minimap decoration (100 lines)
- Custom scrollbar styling via `globals.css`

**Notable:** Contains complex layout logic for the resizable agent panel divider.

---

### `src/app/globals.css`
**Purpose:** Global styles and Tailwind imports  
**Key Contents:**
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom scrollbar (webkit + Firefox `scrollbar-width`)
- `no-scrollbar` utility class
- `:root` CSS variables for `--bg-editor`

---

### `src/app/page.tsx`
**Purpose:** Home/Hero page — main landing view  
**Key Contents:**
- `Typewriter` component: cycles through 4 phrases, typewriter + delete effect
- `useMemo` for particle positions (20 animated stars)
- Role pills: Full Stack Dev, React/Next.js, Node.js, Open to Work
- CTA buttons with `next/navigation` `useRouter` for page transitions
- Floating decorative element with `animate-float` keyframe
- `animate-fadeUp` on mount

**Notable:** Particle positions are randomized only on client (`isClient` state) to avoid hydration mismatch.

---

### `src/app/about/page.tsx`
**Purpose:** About me section  
**Key Contents:**
- Profile card with avatar ("GS" initials), "Open to Work" badge
- Info rows: Location, Availability, Languages, Experience
- 3-column stat cards: 3+ Years, 20+ Projects, 10+ Clients
- Two-column grid layout (profile + bio)

---

### `src/app/projects/page.tsx`
**Purpose:** Projects showcase  
**Key Contents:**
- 3 hardcoded projects: OrbitCart, NebulaChat, GravityDash
- Each card shows: tag (colored), name, description, tech stack pills, demo/github links
- Hover effect: border turns cyan
- Links to GitHub profile at bottom

---

### `src/app/skills/page.tsx`
**Purpose:** Skills and experience  
**Key Contents:**
- 3 skill clusters: Frontend, Backend, Tools & Infra
- Each skill has hover color-change effect (inline styles + `onMouseEnter/Leave`)
- "Currently Learning" section (Rust, Web3, Go) with dashed border
- Experience timeline with left border + glowing dot markers

**Notable:** Uses inline style object for animation delay to avoid Tailwind JIT limitations.

---

### `src/app/contact/page.tsx`
**Purpose:** Contact information and form  
**Key Contents:**
- Social links: Email, LinkedIn, GitHub, Medium (Lucide icons)
- Contact form with 4 fields: name, email, subject, message
- Simulated form submission (`submitted` state → success message)
- All placeholder text is "string" to maintain code aesthetic

---

### `src/context/ActiveFileContext.tsx`
**Purpose:** Global state management for the entire IDE shell  
**Key Exports:**
- `FILE_MAP`: Static mapping of route → file metadata (name, lang, color, icon letter)
- `ActiveFileProvider`: Wraps app, provides state
- `useActiveFile`: Hook to consume context
- `FileMetadata` interface

**State Managed:**
- `activeFile`: Currently active file metadata
- `openTabs`: Array of open tab paths
- `isTerminalOpen`: Terminal visibility
- `isSidebarOpen`: Sidebar visibility
- `isAgentPanelOpen`: Right panel visibility
- `agentPanelWidth`: Resizable panel width (250–500px)
- `isMobileMenuOpen`: Mobile overlay state

**Notable Logic:**
- `useEffect` on `pathname` auto-opens new tabs when navigating
- `closeTab` navigates to the last remaining tab or home `/`

---

### `src/components/ide/TitleBar.tsx`
**Purpose:** Top chrome bar  
**Key Contents:**
- macOS traffic light buttons (decorative)
- Top menu items: File, Edit, Selection, View, Go, Run, Terminal, Help
- Center: Project name and active file name
- Layout toggle buttons (sidebar/terminal/agent panel)
- User avatar circle with "G"
- Window controls: Minimize, Maximize, Close

**Notable:** Custom SVG icons for sidebar, terminal, and agent panel toggles.

---

### `src/components/ide/ActivityBar.tsx`
**Purpose:** Left icon strip  
**Key Contents:**
- 5 icon links: Files, Search, GitBranch, Package, Blocks
- Active indicator: white left border bar
- Settings icon at bottom
- Uses `usePathname` to highlight active icon

---

### `src/components/ide/Sidebar.tsx`
**Purpose:** File tree list representing portfolio sections  
**Key Contents:**
- 8 file entries with colored letter badges (R=React, H=HTML, J=JS, C=CSS, etc.)
- Active state highlights the current page
- Decorative files (experience.ts, README.md, resume.pdf) are non-navigable
- Mobile: overlay with backdrop blur + slide-in animation
- Desktop: fixed 240px width sidebar

---

### `src/components/ide/TabBar.tsx`
**Purpose:** Tab strip for open files  
**Key Contents:**
- Maps `openTabs` array to tab buttons
- Each tab shows colored file icon, filename, and close button
- Active tab has top blue border (`#007acc`)
- Close button only visible on hover (for inactive tabs)
- Clicking tab navigates via `openTab()`

---

### `src/components/ide/Breadcrumb.tsx`
**Purpose:** Navigation path display  
**Key Contents:**
- Static: `ganesh-singha > src > [activeFile.name]`
- Uses `useActiveFile` hook for file name

---

### `src/components/ide/StatusBar.tsx`
**Purpose:** Bottom information bar  
**Key Contents:**
- Git branch: `main*` with rotate icon
- Error/warning counts: 0/0
- Cursor position: `Ln 123, Col 1` (hardcoded)
- Encoding: UTF-8
- Line endings: LF
- Language: `{ } TypeScript JSX`
- AI indicator: "Autocomplete (0)" with Sparkles icon
- Fixed to bottom (`fixed bottom-0`)

---

### `src/components/ide/TerminalDrawer.tsx`
**Purpose:** Collapsible terminal at bottom  
**Key Contents:**
- Toolbar: Problems, Output, Terminal tabs
- npm command dropdown
- Mock terminal output lines (including simulated import error)
- Blinking cursor at end
- `slide-in-from-bottom` animation

---

### `src/components/ide/MenuBar.tsx`
**Purpose:** Secondary menu strip (minimal)  
**Key Contents:**
- Menu items: File, Edit, View, Go, Run, Terminal, Help, Copilot
- Clicking "Terminal" opens the terminal drawer

---

### `src/components/ide/AgentPanel.tsx`
**Purpose:** Right-side AI chat panel (like VS Code Copilot)  
**Key Contents:**
- Header: "Open Agent Manager"
- Chat input placeholder: "Ask anything, @ to mention, / for workflows"
- Model selector: "Gemini 3 Flash"
- Planning toggle button
- Mic and Send icons
- Responsive layout based on `agentPanelWidth` prop
- Footer disclaimer about AI mistakes

---

## 6. Data Flow

### 6.1 Page Navigation Flow

```
User clicks sidebar file OR CTA button
         ↓
useRouter.push('/path')  OR  <Link href='/path'>
         ↓
URL changes → Next.js App Router triggers
         ↓
ActiveFileContext.useEffect fires (pathname dependency)
         ↓
Updates activeFile state from FILE_MAP
         ↓
Opens new tab if not already open
         ↓
React re-renders:
  - TabBar highlights new tab
  - Breadcrumb updates filename
  - TitleBar shows new file name
  - Editor area renders page component
```

### 6.2 Panel Resizing Flow

```
User mousedown on resizer handle (layout.tsx)
         ↓
Sets isResizing = true
         ↓
Window mousemove listener fires
         ↓
Calculates new width: window.innerWidth - clientX
         ↓
Clamps to 250–500px range
         ↓
Updates agentPanelWidth state
         ↓
AgentPanel re-renders with new width
         ↓
Mouseup → removes listeners, isResizing = false
```

### 6.3 Terminal Toggle Flow

```
User clicks Terminal menu OR toggle button
         ↓
setIsTerminalOpen(!isTerminalOpen)
         ↓
Conditional render: {isTerminalOpen && <TerminalDrawer />}
         ↓
Terminal slides in/out with animation
```

### 6.4 Contact Form Flow

```
User fills form → setFormData updates state
         ↓
User clicks "transmit_message( )"
         ↓
handleSubmit prevents default
         ↓
setSubmitted(true)
         ↓
Form replaced with success message
         ↓
"send_another()" resets submitted state
```

---

## 7. Key Patterns & Design Decisions

### 7.1 IDE Metaphor Pattern
The entire portfolio is wrapped in a VS Code-like shell. Each portfolio section is represented as a different "file type" (home.tsx, about.html, projects.js, skills.json, contact.css), reinforcing the developer/IDE theme.

### 7.2 Context-Driven State Management
Instead of a state library (Redux, Zustand), React Context API is used via `ActiveFileContext` to manage:
- Tab state
- Panel visibility
- Active file tracking
- Resizable panel dimensions

### 7.3 Dual-Column Route Mapping
The `FILE_MAP` constant in `ActiveFileContext.tsx` creates a bidirectional mapping between routes and IDE file metadata. This allows the same data structure to drive both routing and UI display (tab names, icons, breadcrumbs).

### 7.4 Resizable Panel Pattern
The agent panel uses a native mouse event pattern for resizing:
- `mousedown` → start resize mode
- `window.mousemove` → update width (on window, not element, for reliability)
- `window.mouseup` → stop resize
- Width clamped between 250–500px

### 7.5 CSS Custom Theme
Tailwind is extended with a custom VS Code dark theme via `tailwind.config.ts`, defining:
- `bg-editor: #1e1e1e`
- `bg-sidebar: #252526`
- Syntax highlighting colors (`text-cyan`, `text-blue`, `text-orange`, etc.)
- Custom animations: `blink`, `float`, `fadeUp`

### 7.6 Google Fonts via `next/font`
Fonts are loaded server-side with `next/font/google`, eliminating layout shift and providing optimized font files.

### 7.7 Typewriter Animation
The home page uses a custom typewriter component with:
- Phrase cycling (4 phrases)
- Type-forward + pause + delete-back effect
- Configurable speeds (100ms type, 50ms delete, 2000ms pause)

---

## 8. Things to Watch Out For

### ⚠️ Potential Issues

1. **`FileCss` Import Error** — The `prompts/phase4.txt` and `TerminalDrawer.tsx` mock output reference a broken import: `'FileCss' is not exported from 'lucide-react'`. This should be verified in `Sidebar.tsx` or elsewhere. The `Sidebar.tsx` currently uses `X` icon for the close button but may have had a planned `FileCss` import.

2. **Hardcoded Mock Data** — Projects, skills, experience, and contact info are all hardcoded in page components. No CMS, database, or external data source. Any updates require code changes.

3. **No Backend/API Routes** — This is a purely static frontend application. The contact form does not actually send emails; it simulates submission with `setSubmitted(true)`.

4. **Contact Form `placeholder="string"`** — While this is an intentional design choice for the code aesthetic, it provides no accessibility hint to users.

5. **StatusBar Cursor Position** — `Ln 123, Col 1` is hardcoded in `StatusBar.tsx`. It doesn't track actual cursor position.

6. **Terminal Output is Static Mock** — `TerminalDrawer.tsx` renders hardcoded strings, not actual terminal output.

7. **Inline `style` Props with `as any`** — In `skills/page.tsx`, animation is applied via inline style + `as any` cast to bypass TypeScript/ESLint issues with the Tailwind animation property.

8. **No Error Boundaries** — The application has no error boundaries. If any component throws, the entire app will crash.

9. **Activity Bar Links to Non-existent Routes** — Activity bar links to `/search`, `/git`, `/extensions` which have no corresponding page files. These will render Next.js 404 pages.

10. **No Mobile Optimization for Editor Area** — The line number gutter and minimap are hidden on smaller screens (`hidden xl:block`), but the editor content itself may not be fully optimized for touch/mobile.

11. **AgentPanel Model Name** — Shows "Gemini 3 Flash" which appears to be a placeholder/reference to a potential AI integration (no actual AI backend connected).

12. **No Tests** — No test files exist in the project (`__tests__`, `.test.tsx`, `.spec.ts`, etc.).

13. **`.env.example` Missing** — No environment variables file exists. Any future API keys would need a template.

14. **Next.js Version 14.2.18** — Not the latest (14.2.x is stable, but newer versions exist). AGENTS.md note mentions breaking changes, so check `node_modules/next/dist/docs/` before modifying.

15. **Git Ignores Most Build Artifacts** — `.next`, `node_modules`, etc. are gitignored. The `src/` directory is the primary source.

---

## 9. Recommended Starting Points for a New Developer

### Day 1: Read These Files First (in order)
1. **`src/app/layout.tsx`** — Understand the overall shell structure
2. **`src/context/ActiveFileContext.tsx`** — Understand how state flows
3. **`tailwind.config.ts`** — Understand the custom theme tokens
4. **`src/components/ide/TitleBar.tsx`** — Understand the chrome layout

### Day 2: Pick a Feature to Modify
| If you want to... | Start with... |
|---|---|
| Add a new portfolio page | Create `src/app/newpage/page.tsx` + add to `FILE_MAP` |
| Change the color theme | Edit `tailwind.config.ts` colors object |
| Modify the sidebar | `src/components/ide/Sidebar.tsx` |
| Change the terminal content | `src/components/ide/TerminalDrawer.tsx` |
| Add real contact form backend | Add Next.js API route + form handler |
| Add Git status indicators | Update `ActiveFileContext.tsx` + `Sidebar.tsx` |

### Running the Project
```bash
cd /home/ganesh/Work/Projects/Antigravity-IDE-Portfolio
npm run dev      # Development server on http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

### Key Directory Structure to Remember
```
src/
├── app/                    # Pages (App Router)
│   ├── layout.tsx          # Root layout + IDE shell
│   ├── page.tsx            # Home page
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── skills/page.tsx
│   ├── contact/page.tsx
│   └── globals.css
├── components/ide/         # IDE chrome components
│   ├── TitleBar.tsx
│   ├── ActivityBar.tsx
│   ├── Sidebar.tsx
│   ├── TabBar.tsx
│   ├── Breadcrumb.tsx
│   ├── StatusBar.tsx
│   ├── TerminalDrawer.tsx
│   ├── MenuBar.tsx
│   └── AgentPanel.tsx
└── context/
    └── ActiveFileContext.tsx  # Global state
```

### Understanding the "File as Page" Concept
Each route corresponds to a "file" in the IDE metaphor. The `FILE_MAP` in `ActiveFileContext.tsx` is the single source of truth that links:
- Routes ↔ File names
- Routes ↔ File type colors
- Routes ↔ File type icons (letter badges)
- Routes ↔ Syntax highlighting colors

To add a new page, you must:
1. Create the page file under `src/app/[route]/page.tsx`
2. Add the route → metadata mapping to `FILE_MAP`
3. Add the file to the sidebar's `files` array

---

## Appendix: Color Reference

The project uses a VS Code-inspired dark palette:

| Token | Hex | Usage |
|---|---|---|
| `bg-editor` | `#1e1e1e` | Main editor background |
| `bg-sidebar` | `#252526` | Sidebar and chrome background |
| `bg-tab-bar` | `#2d2d2d` | Tab bar background |
| `bg-hover` | `#2a2d2e` | Hover state background |
| `bg-selected` | `#37373d` | Selected item background |
| `border-color` | `#3d3d3d` | All borders |
| `text-primary` | `#d4d4d4` | Primary text |
| `text-muted` | `#858585` | Secondary/muted text |
| `statusbar-bg` | `#007acc` | Active indicators |
| Accent (cyan) | `#00e5cc` | Primary accent color |

---

*Report generated from comprehensive analysis of all source files.*
*Last updated: 2026-04-04*
