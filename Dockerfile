FROM node:20-slim

# Install system dependencies: MongoDB, Redis, nginx
RUN apt-get update && apt-get install -y \
    gnupg curl wget \
    nginx \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

# Install MongoDB 7
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg \
    && echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" > /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-org \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ── Build client ──
COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && NEXT_PUBLIC_API_BASE="" npm run build

# ── Build server ──
COPY server/package*.json ./server/
RUN cd server && npm ci

COPY server/ ./server/
RUN cd server && npm run build

# ── Copy nginx config and start script ──
COPY nginx.conf ./nginx.conf
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Create MongoDB data directory
RUN mkdir -p /data/db

EXPOSE 8080

CMD ["./start.sh"]
