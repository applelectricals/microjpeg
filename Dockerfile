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

# Install production dependencies fresh after build
RUN rm -rf node_modules package-lock.json && npm install --production

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]