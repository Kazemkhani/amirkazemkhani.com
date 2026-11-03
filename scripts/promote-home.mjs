// After the Vite build, make the hand-built landing page the site's front door.
// The React app (articles, privacy, terms, work-with-me) moves to app.html and
// keeps serving every other route through the catch-all rewrite in vercel.json.
import { copyFile, rename, rm, access } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const spa = new URL("index.html", dist);
const home = new URL("home/index.html", dist);

await access(home);
await rename(spa, new URL("app.html", dist));
await copyFile(home, spa);
await rm(new URL("home/", dist), { recursive: true });
console.log("promote-home: / now serves the landing page; the React app serves the rest via app.html");
