import express, { type Express } from "express";
import path from "path";

// No imports from 'vite' here!

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), 'dist');

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - ONLY for GET requests to non-API, non-file routes
  app.get('*', (req, res, next) => {
    // Skip API routes entirely
    if (req.path.startsWith('/api/')) {
      return next();
    }

    // Skip files with extensions (already handled by express.static)
    if (path.extname(req.path)) {
      return next();
    }

    res.sendFile(path.join(distPath, 'index.html'));
  });
}