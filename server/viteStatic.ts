import express, { type Express } from "express";
import path from "path";

// This is ONLY for production. NO Vite imports here!

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), 'dist', 'client'); // adjust if your built frontend is elsewhere

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - ONLY for GET requests to non-API, non-file routes
  app.get('*', (req, res, next) => {
    // Skip API routes entirely
    if (req.path.startsWith('/api/')) return next();
    // Skip files with extensions (already handled by express.static)
    if (path.extname(req.path)) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}