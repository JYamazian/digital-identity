# 1. Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Build Version Argument
ARG BUILD_VERSION
ARG BUILD_FLAVOR

# Expose some build arguments as Env variables
ENV BUILD_VERSION=$BUILD_VERSION
ENV BUILD_FLAVOR=$BUILD_FLAVOR
RUN echo "Version is: $BUILD_FLAVOR-$BUILD_VERSION"

# Install dependencies and build app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2. Production stage
FROM node:24-alpine

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
