# Portfolio (Vite + React)

This is a simple, responsive portfolio scaffold built with React and Vite. Use it as a starting point to showcase your skills and projects.

Local dev

```powershell
npm install
npm run dev
```

Build (vercel will run this):

```powershell
npm run build
```

Notes for Vercel

- Framework: React (Vite) — if Vercel doesn't detect it, select "Vite" or "Create React App" and set build/output accordingly.
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Add any required environment variables in Vercel dashboard.

Deploy steps (summary):
1. Push this repository to GitHub (create a repo named `portfolio` or similar).
2. On Vercel: New Project → Import Git Repository → choose GitHub provider → select repo → confirm build settings → Deploy.

If you want I can generate the GitHub `repo` using the `gh` CLI (you must authorize it locally).
