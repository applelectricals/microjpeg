FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy all source files and config
COPY . .

# Ensure node_modules binaries are executable
RUN chmod -R +x node_modules/.bin || true

# Build with verbose output to see errors
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/index.js"]