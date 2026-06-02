import express from 'express';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const faviconB64 = readFileSync(path.join(__dirname, 'favicon.png')).toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs><clipPath id="c"><circle cx="50" cy="50" r="50"/></clipPath></defs>
  <image href="data:image/png;base64,${faviconB64}" width="100" height="100" clip-path="url(#c)"/>
</svg>`;

const app = express();
const PORT = process.env.PORT || 3000;

const GITHUB_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
</svg>`;

const NPM_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="var(--npm)">
  <path d="M0 0h16v16H0V0zm1.5 1.5v13h13v-13h-13zM3 3h10v10H8.5V5.5h-2V13H3V3z"/>
</svg>`;

const GLOBE_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 0111.04-4.65c-.42.28-.9.52-1.43.7A13.6 13.6 0 009.5 3.6V2.07A6.47 6.47 0 018 1.5c-.52 0-1.03.07-1.5.2v1.9a13.6 13.6 0 00-1.61.45c-.53-.18-1.01-.42-1.43-.7A6.47 6.47 0 001.5 8zm.46 1.5h2.1c.06.7.2 1.37.4 1.98-.6.26-1.14.58-1.6.95A6.52 6.52 0 011.96 9.5zm1.5 3.9c.37-.3.8-.56 1.27-.77.37.73.82 1.32 1.32 1.72a6.53 6.53 0 01-2.59-.95zm3.04.55c-.6-.3-1.14-.9-1.56-1.73.49-.14 1-.22 1.56-.24v1.97zm0-3.45c-.66.02-1.3.13-1.89.3a10.8 10.8 0 01-.36-1.8H6.5v1.5zm0-3H4.25c.06-.64.18-1.25.36-1.8.59.17 1.23.28 1.89.3V7.5zm0-3c-.56-.02-1.07-.1-1.56-.24.42-.83.96-1.43 1.56-1.73V4.5zm1.5-1.97c.6.3 1.14.9 1.56 1.73-.49.14-1 .22-1.56.24V2.53zm0 3c.66-.02 1.3-.13 1.89-.3.18.55.3 1.16.36 1.8H9.5V5.5zm0 3h2.25c-.06.64-.18 1.25-.36 1.8-.59-.17-1.23-.28-1.89-.3V8.5zm0 3c.56.02 1.07.1 1.56.24-.42.83-.96 1.43-1.56 1.73V11.5zm1.5 1.87c.5-.4.95-.99 1.32-1.72.47.21.9.47 1.27.77a6.53 6.53 0 01-2.59.95zm3.04-1.87c-.46-.37-1-.69-1.6-.95.2-.61.34-1.28.4-1.98h2.1a6.52 6.52 0 01-.9 2.93zm.9-4.43h-2.1a12.1 12.1 0 00-.4-1.98c.6-.26 1.14-.58 1.6-.95A6.52 6.52 0 0114.04 7.07z"/>
</svg>`;

function renderPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>uekichinos</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
      --text: #e6edf3;
      --muted: #8b949e;
      --accent: #58a6ff;
      --npm: #cb3837;
      --radius: 8px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }

    .container { max-width: 820px; margin: 0 auto; }

    header { text-align: center; }
    .avatar {
      width: 88px; height: 88px; border-radius: 50%;
      border: 2px solid var(--border);
      margin-bottom: 1rem;
    }
    header h1 { font-size: 1.75rem; font-weight: 600; letter-spacing: -0.5px; }
    header p { color: var(--muted); margin-top: 0.4rem; font-size: 0.95rem; }

    .profile-links {
      display: flex; gap: 0.75rem; justify-content: center;
      margin-top: 1.25rem; flex-wrap: wrap;
    }
    .pill {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.4rem 0.9rem; border-radius: 20px;
      border: 1px solid var(--border); font-size: 0.85rem;
      color: var(--text); background: var(--surface);
      transition: border-color 0.15s;
    }
    .pill:hover { border-color: var(--accent); text-decoration: none; }
    .pill svg { flex-shrink: 0; }

  </style>
</head>
<body>
<div class="container">

  <header>
    <img class="avatar"
         src="https://github.com/uekichinos.png"
         alt="uekichinos avatar" />
    <h1>uekichinos</h1>
    <p>Building lightweight browser utilities &amp; open-source tools.</p>
    <div class="profile-links">
      <a class="pill" href="https://github.com/uekichinos" target="_blank" rel="noopener">
        ${GITHUB_SVG} GitHub
      </a>
      <a class="pill" href="https://www.npmjs.com/~uekichinos" target="_blank" rel="noopener">
        ${NPM_SVG} npm
      </a>
      <a class="pill" href="https://satuatap.app" target="_blank" rel="noopener">
        ${GLOBE_SVG} satuatap.app
      </a>
    </div>
  </header>

</div>
</body>
</html>`;
}

app.get('/favicon.svg', (_req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(faviconSvg);
});

app.get('/', (_req, res) => {
  res.send(renderPage());
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
