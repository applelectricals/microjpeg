// No polyfill needed for CommonJS build
import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import session from 'express-session';
import cors from 'cors';
import { registerRoutes } from "./routes";
import { serveStatic } from "./viteStatic"; // Only prod static serving here!
import { TestPremiumExpiryManager } from "./testPremiumExpiry";
import { initializeQueueService, shutdownQueueService } from "./queueService";

const app = express();

app.set('trust proxy', 1);
app.set('etag', false);

app.use(cors({
  origin: 'https://microjpeg.com',
  credentials: true,
}));

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: false, limit: '200mb' }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: 'none',
    },
  })
);

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

(async () => {
  // Initialize services
  await initializeQueueService();

  // Register API routes - this returns the HTTP server
  const httpServer = await registerRoutes(app);

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Production static serving - NO Vite imports!
  console.log('🚀 Starting in production mode - serving static files');
  serveStatic(app);

  const port = parseInt(process.env.PORT || '3000', 10);
  const hostname = '0.0.0.0';

  const server = httpServer.listen(port, hostname, () => {
    console.log(`🌟 Production server running on port ${port} on ${hostname}`);
    TestPremiumExpiryManager.startExpiryChecker();
  });

  process.on('SIGTERM', async () => {
    console.log('🔄 Received SIGTERM, shutting down gracefully...');
    await shutdownQueueService();
    server.close(() => {
      console.log('✅ Server shut down gracefully');
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    console.log('🔄 Received SIGINT, shutting down gracefully...');
    await shutdownQueueService();
    server.close(() => {
      console.log('✅ Server shut down gracefully');
      process.exit(0);
    });
  });
})();