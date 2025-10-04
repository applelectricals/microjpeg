FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN chmod -R +x node_modules/.bin && npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/index.js"]