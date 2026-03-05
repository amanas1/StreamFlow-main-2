
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const info = {
    cwd: process.cwd(),
    dirname: __dirname,
    rootFiles: fs.readdirSync(process.cwd()),
  };

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json(info);
}
