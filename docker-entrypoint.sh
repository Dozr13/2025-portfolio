#!/bin/sh
set -e

echo "🚀 Starting Portfolio Application..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
yarn db:generate

# Push database schema (creates tables if they don't exist)
echo "📊 Pushing database schema..."
yarn db:push

# Build the application if not in development mode
if [ "$NODE_ENV" != "development" ]; then
  echo "🏭 Building application for production..."
  yarn build
fi

echo "Application ready! Starting server..."

# Execute the main command
exec "$@"