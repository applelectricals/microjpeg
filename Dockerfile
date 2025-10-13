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

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

RUN npm run build# Copy all source code

COPY . .

# Expose port

EXPOSE 3000# Build exactly like Replit does

RUN npm run build

# Run the exact same start command as Replit

CMD ["npm", "start"]# Copy client build to expected location
=======
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
>>>>>>> 9f0acb64a2469d439f396712e96d5c55d2ff7cd7
RUN cp -r client/dist/* dist/

# Expose port
EXPOSE 3000

# Start exactly like Replit does
CMD ["npm", "start"]