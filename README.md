# Eirini Portfolio (React + Vite + Tailwind)

## 1) Install prerequisites
- Install **Node.js LTS** from https://nodejs.org
- (Optional) Install **Git** from https://git-scm.com
- Install **VS Code** from https://code.visualstudio.com

## 2) Run locally
```bash
cd eirini-portfolio
npm install
npm run dev
```
Open the local address shown in the terminal (usually http://localhost:5173).

## 3) Edit content
Open `src/App.jsx`. At the top, change fields inside the **QUICK EDIT PANEL**.

## 4) Deploy to Vercel (easiest)
1. Create a new GitHub repo (e.g., `eirini-portfolio`) and push this folder.
2. Go to https://vercel.com → **Add New… Project** → Import your repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. Your site will get a URL like `https://eirini-portfolio.vercel.app`.

## 5) Deploy to GitHub Pages (static alternative)
- Add to `vite.config.js` if your repo name is `eirini-portfolio`:
  ```js
  export default defineConfig({
    plugins: [react()],
    base: "/eirini-portfolio/",
  })
  ```
- Use a GitHub Action like `peaceiris/actions-gh-pages` to publish the `dist/` folder.

## Troubleshooting
- If `npm` is not found, reopen your terminal after installing Node.js.
- If the page looks unstyled, confirm Tailwind is configured and `index.css` is imported.
- If deployment fails on Vercel, ensure the build command is `npm run build` and output is `dist`.
