# Fleetmanagment WebUI Docker Image
FROM node:20-alpine

WORKDIR /app

# Install dependencies (skip dev)
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend code
COPY public/ ./public/
COPY src/ ./src/

# Build TypeScript backend
RUN npx tsc

# Expose port
EXPOSE 8081

# Start server (Node.js HTTP server for WebUI)
CMD ["node", "dist/server/index.js"]