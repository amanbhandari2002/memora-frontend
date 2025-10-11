# Build stage
FROM node:20.11.1-alpine3.19 AS builder

# Add labels for better maintainability
LABEL maintainer="Memora Frontend Team"
LABEL description="Frontend application for Memora"

# Set working directory
WORKDIR /app

# Add node user for security
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup && \
    chown -R nodeuser:nodegroup /app

# Switch to non-root user
USER nodeuser

# Install dependencies
COPY --chown=nodeuser:nodegroup package*.json ./
RUN npm ci --only=production

# Copy source code
COPY --chown=nodeuser:nodegroup . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.25.4-alpine

# Add labels
LABEL maintainer="Memora Frontend Team"
LABEL description="Frontend application for Memora - Production"

# Create nginx user and set permissions
RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxgroup /var/run/nginx.pid

# Copy custom nginx configuration
COPY --chown=nginxuser:nginxgroup nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder --chown=nginxuser:nginxgroup /app/build /usr/share/nginx/html

# Set correct permissions
RUN chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginxuser

# Expose port
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]