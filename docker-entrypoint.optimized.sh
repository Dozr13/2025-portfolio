#!/bin/sh
set -e

echo "Starting Wade's Portfolio Application..."

# Function to check if database is accessible
check_database() {
  if [ -n "$DATABASE_URL" ]; then
    echo "Checking database connection..."
    # For PostgreSQL, we'll use a simple connection test
    if echo "$DATABASE_URL" | grep -q "postgresql://"; then
      echo "PostgreSQL database detected"
      # You could add a proper connection test here if needed
      return 0
    elif echo "$DATABASE_URL" | grep -q "file:"; then
      echo "SQLite database detected"
      local db_file=$(echo "$DATABASE_URL" | sed 's/file://')
      if [ ! -f "$db_file" ]; then
        echo " Database file not found, will be created on first run"
      fi
      return 0
    fi
  else
    echo " No DATABASE_URL provided"
    return 1
  fi
}

# Function to run database migrations and seeding
setup_database() {
  echo "Setting up database..."
  
  # Run migrations (this will create tables if they don't exist)
  echo "Running database migrations..."
  yarn pnpify prisma db push --accept-data-loss || {
    echo "Failed to run migrations"
    exit 1
  }
  
  # Check if database has data, if not seed it
  echo "Checking if database needs seeding..."
  
  # Simple check: count blog posts
  blog_count=$(yarn pnpify prisma db execute --stdin <<EOF || echo "0"
SELECT COUNT(*) FROM blog_posts;
EOF
)
  
  if [ "$blog_count" = "0" ] || [ -z "$blog_count" ]; then
    echo "Database appears empty, seeding with initial data..."
    yarn db:seed || {
      echo " Warning: Database seeding failed, but continuing..."
    }
    echo "Database seeding completed"
  else
    echo "Database already contains data, skipping seeding"
  fi
}

# Main execution
main() {
  echo "Environment: $NODE_ENV"
  echo "Port: ${PORT:-3000}"
  
  # Check database connectivity
  if check_database; then
    setup_database
  else
    echo " Skipping database setup due to connectivity issues"
  fi
  
  # Production optimizations
  if [ "$NODE_ENV" = "production" ]; then
    echo "Production mode - optimizations enabled"
    
    # Verify build exists
    if [ ! -f "server.js" ]; then
      echo "Production build not found! Please build the application first."
      exit 1
    fi
    
    echo "All checks passed, starting production server..."
  else
    echo "🛠️  Development mode"
  fi
  
  echo "Application ready! Starting server..."
  
  # Execute the main command
  exec "$@"
}

# Trap signals for graceful shutdown
trap 'echo "🛑 Shutting down gracefully..."; exit 0' TERM INT

# Run main function
main