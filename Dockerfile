# Simple single-stage build like Replit
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy source code
COPY . .

# Run the exact same build command as Replit
RUN npm run build

# Remove node_modules and reinstall only production dependencies
RUN rm -rf node_modules && npm ci --production

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]