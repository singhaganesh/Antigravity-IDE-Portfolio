# Exact Antigravity IDE Implementation Plan

Based on the observation of the reference screenshot (Antigravity IDE UI), this plan outlines the necessary changes to transition from the current "VS Code-like" shell to the authentic **Antigravity IDE** experience.

## 1. Visual Audit & Current Gaps
- **Sidebar:** Currently a flat list; needs a recursive file tree with folder nesting and Git status indicators (`U` for Untracked, `M` for Modified).
- **Editor Area:** Needs a vertical gutter with line numbers and a decorative minimap.
- **Secondary Sidebar:** Missing the right-side "Agent" panel and "Open Agent Manager" header.
- **Status Bar:** Background should be dark (`#181818`) instead of the default blue, with more technical segments (Ln/Col, Spaces, LF).
- **Title Bar:** Needs more precise spacing and the project name formatted as "Antigravity-IDE-Portfolio - Antigravity - page.tsx".

## 2. Technical Roadmap

### Phase A: Core Shell Refactoring
- [ ] **Recursive Sidebar:** Refactor `Sidebar.tsx` to handle nested `FileNode` objects. Add `Folder` and `FolderOpen` icons.
- [ ] **Secondary Sidebar:** Update `layout.tsx` to a three-column grid (Sidebar | Editor | Agent Panel).
- [ ] **Gutter & Line Numbers:** Create a `Gutter` component to render line numbers (1–100+) alongside the `{children}` in the editor area.

### Phase B: Component Polishing
- [ ] **Status Bar Update:** Change background to `#181818`. Add "Ln 123, Col 1", "Spaces: 2", "UTF-8", and "LF" segments.
- [ ] **Title Bar Update:** Centralize the project/file name. Update the "Traffic Lights" and search pill to match the screenshot's scale.
- [ ] **Icon Fixes:** Replace invalid Lucide icons (like `FileCss`) with generic `File` icons or custom SVG badges as seen in the screenshot.

### Phase C: Context & Terminal Realism
- [ ] **Terminal Simulation:** Update `TerminalDrawer.tsx` to display the "ganesh@ganesh" prompt and the specific dependency/import errors seen in the screenshot.
- [ ] **Git Status:** Add logic to `ActiveFileContext` to track which "files" should show `U` or `M` markers in the sidebar.

### Phase D: Agent Panel (Right Sidebar)
- [ ] **Agent UI:** Build the `AgentPanel.tsx` with:
    - "Open Agent Manager" header.
    - Chat input field: "Ask anything, @ to mention, / for workflows".
    - Control icons (Planning, Gemini 3 Flash, Microphone).

## 3. Implementation Priority
1. **Sidebar & Icons:** Fix the broken imports and implement the tree view first.
2. **Layout & Agent Panel:** Establish the three-column workspace.
3. **Editor Gutter:** Add line numbers to reinforce the "IDE" feel.
4. **Final Styling:** Apply the dark status bar and title bar refinements.
