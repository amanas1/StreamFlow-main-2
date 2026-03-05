
export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("x-seo-handler", "running");

  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SEO Handler Test</title>
      <link rel="canonical" href="https://auradiochat.com/test-seo">
    </head>
    <body>
      SEO HANDLER WORKING
    </body>
    </html>
  `);
}
