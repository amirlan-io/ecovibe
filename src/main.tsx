
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Not hydrateRoot: createBrowserRouter's lazy routes always render a blank
  // "hydrate fallback" on the very first pass (no server loader data to skip
  // it), which mismatches the fully-rendered static markup from
  // scripts/render-full-html.mjs and duplicates the tree. A plain client
  // render replaces the static markup with an identical client render —
  // crawlers still see full content in the initial HTML either way.
  createRoot(document.getElementById("root")!).render(<App />);
  