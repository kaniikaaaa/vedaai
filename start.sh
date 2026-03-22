#!/bin/bash
set -e

# Use Railway's PORT or default to 8080
PORT="${PORT:-8080}"

# Start MongoDB
echo "Starting MongoDB..."
mkdir -p /data/db
mongod --dbpath /data/db --fork --logpath /var/log/mongod.log --bind_ip 127.0.0.1

# Start Redis
echo "Starting Redis..."
redis-server --daemonize yes --bind 127.0.0.1

# Wait for services
sleep 2

# Start Express backend
echo "Starting Express backend..."
cd /app/server
NODE_ENV=production node dist/server.js &

# Start Next.js frontend
echo "Starting Next.js frontend..."
cd /app/client
HOSTNAME="0.0.0.0" PORT=3000 node node_modules/.bin/next start &

# Wait for apps to boot
sleep 3

# Configure nginx with Railway's PORT
echo "Starting nginx on port $PORT..."
sed "s/PORT_PLACEHOLDER/$PORT/g" /app/nginx.conf > /etc/nginx/nginx.conf
nginx -g 'daemon off;'
