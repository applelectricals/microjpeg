# Exact Replit replication# Simple single-stage build like Replit

FROM node:20FROM node:20



WORKDIR /appWORKDIR /app



# Copy package files# Copy package files

COPY package*.json ./COPY package*.json ./



# Install dependencies# Install all dependencies (including dev dependencies for build)

RUN npm installRUN npm install



# Copy source code# Copy client package.json and install client dependencies

COPY . .COPY client/package*.json ./client/

RUN cd client && npm install

# Run the exact same build command as Replit

RUN npm run build# Copy all source code

COPY . .

# Expose port

EXPOSE 3000# Build exactly like Replit does

RUN npm run build

# Run the exact same start command as Replit

CMD ["npm", "start"]# Copy client build to expected location
RUN cp -r client/dist/* dist/

# Expose port
EXPOSE 3000

# Start exactly like Replit does
CMD ["npm", "start"]