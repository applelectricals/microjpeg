FROM node:20

WORKDIR /app

# Install dependencies (including devDeps for build)
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# [Debug Step] Make sure your server/index.ts is present
RUN ls -l server

# Build the frontend (Vite)
RUN npx vite build

# Clean and build the server bundle
RUN rm -rf dist && npx esbuild server/index.ts --platform=node --bundle --outfile=dist/index.js

EXPOSE 3000

CMD ["node", "dist/index.js"]