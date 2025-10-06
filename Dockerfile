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

# Build the server bundle - output to server-dist/ using production entry point
RUN npx esbuild server/index.prod.ts --platform=node --bundle --outfile=server-dist/index.js --format=esm

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

# Copy any other necessary files (like static assets from server)
COPY --from=builder /app/server/public ./server/public

EXPOSE 3000

# Set production environment (this will be overridden by Coolify at runtime)
ENV NODE_ENV=production

CMD ["node", "server-dist/index.js"]