# Multi-stage build for production optimization
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the frontend using npm script
RUN npm run build:client

# Build the server using npm script  
RUN npm run build:server

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built assets from builder stage
COPY --from=builder /app/client/dist ./public
COPY --from=builder /app/dist ./dist

# Copy static assets needed by the application
COPY --from=builder /app/attached_assets ./attached_assets

EXPOSE 3000

# Set production environment (this will be overridden by Coolify at runtime)
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]