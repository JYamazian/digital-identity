# 1. Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies and build app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2. Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app from builder
COPY --from=builder /app/.output .output

# Expose the port your app listens on (default 3000)
EXPOSE 3000

# Use the built-in Nitro server to start the app
CMD ["node", ".output/server/index.mjs"]
