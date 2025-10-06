FROM node:20

WORKDIR /app

# Copy package files and install only production dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Clean and build the server bundle
RUN rm -rf dist \
  && npx esbuild server/index.ts --platform=node --bundle --outfile=dist/index.js

# Build the frontend (Vite)
RUN npx vite build

# Expose your backend port (adjust if needed)
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]