
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const url = req.url || '/';
  // Vercel path mapping often means process.cwd() is the root of the deployment
  // If vercel.json is in frontend/, process.cwd() might be frontend/ or equivalent
  const indexPath = path.join(process.cwd(), 'dist', 'index.html');
  
  let html = '';
  try {
    if (fs.existsSync(indexPath)) {
      html = fs.readFileSync(indexPath, 'utf8');
    } else {
      // Try fallback for subfolder structure
      const fallbackPath = path.join(process.cwd(), 'frontend', 'dist', 'index.html');
      if (fs.existsSync(fallbackPath)) {
        html = fs.readFileSync(fallbackPath, 'utf8');
      }
    }
  } catch (e) {
    return res.status(500).send(`Error reading file: ${e.message}`);
  }

  if (!html) {
    return res.status(500).send(`index.html not found. CWD: ${process.cwd()}`);
  }

  // Minimal meta injection logic
  const meta = '<title>Dynamic SEO Working | AU Radio</title>';
  html = html.replace('</head>', `${meta}</head>`);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("x-seo-handler", "step-3-optimized");
  return res.status(200).send(html);
}
