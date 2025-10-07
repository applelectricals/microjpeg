# Multi-stage build for production optimization
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the frontend (Vite) - outputs to dist/
RUN npx vite build

# Build the server - bundle but exclude problematic packages
RUN npx esbuild server/index.prod.ts --platform=node --bundle --outfile=server-dist/index.cjs --format=cjs --packages=external

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server-dist ./server-dist

# Copy static assets needed by the application
COPY --from=builder /app/attached_assets ./attached_assets

EXPOSE 5000

# Set production environment (this will be overridden by Coolify at runtime)
ENV NODE_ENV=production

CMD ["node", "server-dist/index.cjs"]