# Simple single-stage build like Replit
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy client package.json and install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy all source code
COPY . .

# Build exactly like Replit does
RUN npm run build

# Copy client build to expected location
RUN cp -r client/dist/* dist/

# Expose port
EXPOSE 3000

# Start exactly like Replit does
CMD ["npm", "start"]