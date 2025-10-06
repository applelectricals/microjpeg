import express, { type Express } from "express";
import path from "path";
import fs from "fs";

// This is ONLY for production. NO Vite imports here!

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), 'dist'); // Vite builds to 'dist' not 'dist/client'
  
  console.log(`🏗️  Setting up static file serving from: ${distPath}`);
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error(`❌ Static files directory not found: ${distPath}`);
  } else {
    console.log(`✅ Static files directory found: ${distPath}`);
    // List contents for debugging
    const files = fs.readdirSync(distPath);
    console.log(`📁 Files in dist: ${files.join(', ')}`);
  }

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - ONLY for GET requests to non-API, non-file routes
  app.get('*', (req, res, next) => {
    // Skip API routes entirely
    if (req.path.startsWith('/api/')) return next();
    // Skip files with extensions (already handled by express.static)
    if (path.extname(req.path)) return next();
    
    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      console.error(`❌ index.html not found at: ${indexPath}`);
      return res.status(404).send('index.html not found');
    }
    
    res.sendFile(indexPath);
  });
}