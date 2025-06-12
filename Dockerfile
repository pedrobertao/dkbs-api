# Stage 1: Build TypeScript
FROM node:22-alpine AS builder

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY .env .env

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
