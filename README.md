# Portfolio — React + Vite

## Requirements
- Node.js (LTS)

## Run locally
1. Extract the project folder.
2. Open the folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown in the terminal (usually http://localhost:5173).

## Build for Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## What's preserved
The existing portfolio sections, styling, profile photo, project descriptions, Netlify demo links, Credly certification links, contact email, and legacy interactions are retained. The hero headline now uses the supplied React Bits TechText component.

The page content is kept as a static HTML fragment for a low-risk migration, while React mounts and manages the interactive TechText components. This lets the design stay visually consistent while introducing React.
