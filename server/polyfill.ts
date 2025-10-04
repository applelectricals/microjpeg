import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Polyfill __dirname for ES modules
(global as any).__dirname = dirname(fileURLToPath(import.meta.url));
(global as any).__filename = fileURLToPath(import.meta.url);