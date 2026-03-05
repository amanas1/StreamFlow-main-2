
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const indexPath = path.join(process.cwd(), 'dist', 'index.html');
  let html = '';
  let error = null;

  try {
    if (fs.existsSync(indexPath)) {
      html = fs.readFileSync(indexPath, 'utf8');
    } else {
      error = 'File not found at ' + indexPath;
    }
  } catch (e) {
    error = e.message;
  }

  res.setHeader("Content-Type", "text/html");
  res.setHeader("x-seo-handler", "step-2");
  if (error) {
    res.setHeader("x-seo-error", error);
    return res.status(200).send(`Error: ${error}`);
  }

  res.setHeader("x-seo-file-size", html.length.toString());
  return res.status(200).send(html);
}
