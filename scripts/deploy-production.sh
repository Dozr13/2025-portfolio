#!/bin/bash

# Production Deployment Script for Wade's Portfolio
# This script handles the complete deployment process

set -e

echo "🚀 Starting production deployment for Wade's Portfolio..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."
    
    required_vars=(
        "DATABASE_URL"
        "ADMIN_USERNAME"
        "ADMIN_PASSWORD"
        "JWT_SECRET"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        print_error "Please set these variables and try again."
        exit 1
    fi
    
    print_success "All required environment variables are set"
}

# Build and test the application
build_application() {
    print_status "Building application..."
    
    # Install dependencies
    print_status "Installing dependencies..."
    yarn install --immutable
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    yarn db:generate
    
    # Run database migrations
    print_status "Running database migrations..."
    yarn pnpify prisma db push
    
    # Build the application
    print_status "Building Next.js application..."
    yarn build
    
    print_success "Application built successfully"
}

# Deploy with Docker Compose
deploy_docker() {
    print_status "Deploying with Docker Compose..."
    
    # Build and start containers
    docker-compose -f docker-compose.production.yml up --build -d
    
    # Wait for services to be healthy
    print_status "Waiting for services to be healthy..."
    timeout=300
    elapsed=0
    
    while [ $elapsed -lt $timeout ]; do
        if docker-compose -f docker-compose.production.yml ps | grep -q "healthy"; then
            print_success "All services are healthy"
            break
        fi
        
        sleep 5
        elapsed=$((elapsed + 5))
        echo -n "."
    done
    
    if [ $elapsed -ge $timeout ]; then
        print_error "Services failed to become healthy within $timeout seconds"
        exit 1
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it with: npm i -g vercel"
        exit 1
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    print_success "Deployed to Vercel successfully"
}

# Seed database if empty
seed_database() {
    print_status "Checking if database needs seeding..."
    
    # Check if blog posts exist
    blog_count=$(yarn pnpify prisma db execute --stdin <<EOF 2>/dev/null || echo "0"
SELECT COUNT(*) FROM blog_posts;
EOF
)
    
    if [ "$blog_count" = "0" ] || [ -z "$blog_count" ]; then
        print_status "Database appears empty, seeding with initial data..."
        yarn db:seed
        print_success "Database seeded successfully"
    else
        print_success "Database already contains data, skipping seeding"
    fi
}

# Run health checks
health_check() {
    print_status "Running health checks..."
    
    # Check if the application is responding
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Application health check passed"
    else
        print_warning "Health check failed - application may still be starting"
    fi
}

# Cleanup old containers and images
cleanup() {
    print_status "Cleaning up old Docker resources..."
    
    # Remove unused containers
    docker container prune -f
    
    # Remove unused images
    docker image prune -f
    
    print_success "Cleanup completed"
}

# Main deployment function
main() {
    echo "Deployment Target: ${DEPLOY_TARGET:-docker}"
    echo "🌍 Environment: ${NODE_ENV:-production}"
    echo ""
    
    # Check environment variables
    check_env_vars
    
    # Build application
    build_application
    
    # Deploy based on target
    case "${DEPLOY_TARGET:-docker}" in
        "docker")
            deploy_docker
            seed_database
            health_check
            cleanup
            ;;
        "vercel")
            deploy_vercel
            ;;
        *)
            print_error "Unknown deployment target: ${DEPLOY_TARGET}"
            exit 1
            ;;
    esac
    
    print_success "Deployment completed successfully!"
    
    if [ "${DEPLOY_TARGET:-docker}" = "docker" ]; then
        echo ""
        echo "📊 Application URLs:"
        echo "  • Portfolio: http://localhost:3000"
        echo "  • Admin: http://localhost:3000/admin"
        echo "  • Health Check: http://localhost:3000/api/health"
        echo "  • Database: postgresql://localhost:5432/portfolio"
        echo ""
        echo "🔧 Management Commands:"
        echo "  • View logs: docker-compose -f docker-compose.production.yml logs -f"
        echo "  • Stop services: docker-compose -f docker-compose.production.yml down"
        echo "  • Restart: docker-compose -f docker-compose.production.yml restart"
    fi
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "cleanup")
        cleanup
        ;;
    "health")
        health_check
        ;;
    "seed")
        seed_database
        ;;
    *)
        echo "Usage: $0 [deploy|cleanup|health|seed]"
        echo ""
        echo "Commands:"
        echo "  deploy  - Full deployment (default)"
        echo "  cleanup - Clean up Docker resources"
        echo "  health  - Run health checks"
        echo "  seed    - Seed database with initial data"
        echo ""
        echo "Environment Variables:"
        echo "  DEPLOY_TARGET - 'docker' or 'vercel' (default: docker)"
        echo "  NODE_ENV      - 'production' (default)"
        exit 1
        ;;
esac