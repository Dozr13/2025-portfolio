# 🚀 Deployment Guide for Wade's Portfolio

This comprehensive guide covers all deployment options for your portfolio, from local development to production hosting.

## 📋 Quick Reference

### Local Development
```bash
yarn dev                    # Start development server
yarn db:studio             # Open database browser
yarn db:seed               # Seed database with sample data
```

### Production Deployment
```bash
./scripts/deploy-production.sh     # Docker deployment
DEPLOY_TARGET=vercel ./scripts/deploy-production.sh  # Vercel deployment
```

### Admin Access
- **URL:** `http://localhost:3000/admin`
- **Default credentials:** admin / admin123 (change in production!)

## 🌐 Deployment Options

### 1. Vercel (Recommended for Simplicity)

**Perfect for:** Quick deployment, automatic scaling, minimal configuration

#### Prerequisites
```bash
npm install -g vercel
```

#### Setup Steps

1. **Prepare Environment Variables**
```bash
# Copy and configure
cp env.example .env.local

# Required variables:
DATABASE_URL="postgresql://user:password@host:5432/database"
ADMIN_USERNAME="your_admin_username"
ADMIN_PASSWORD="your_secure_password"
JWT_SECRET="your_jwt_secret_at_least_32_characters"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_emailjs_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_emailjs_public_key"
```

2. **Deploy to Vercel**
```bash
# Build and deploy
yarn build
vercel --prod

# Or use the deployment script
DEPLOY_TARGET=vercel ./scripts/deploy-production.sh
```

3. **Configure Database (Choose one):**

   **Option A: Vercel Postgres**
   ```bash
   # In Vercel Dashboard:
   # 1. Go to Storage tab
   # 2. Create Postgres database
   # 3. Copy connection string to DATABASE_URL
   ```

   **Option B: Supabase**
   ```bash
   # 1. Create project at supabase.com
   # 2. Go to Settings → Database
   # 3. Copy connection string
   ```

4. **Initialize Database**
```bash
# Run migrations
yarn pnpify prisma db push

# Seed with data
yarn db:seed
```

#### Pros & Cons
✅ **Pros:**
- Zero-config deployment
- Automatic scaling
- Built-in CDN
- Great developer experience
- Excellent free tier

❌ **Cons:**
- Vendor lock-in
- Limited server-side customization
- Cold starts on free tier

---

### 2. Docker Self-Hosted (Recommended for Control)

**Perfect for:** Full control, self-hosting, enterprise environments

#### Prerequisites
```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

#### Setup Steps

1. **Configure Environment**
```bash
# Copy environment template
cp env.example .env.production

# Edit with your production values
nano .env.production
```

2. **Deploy with Docker Compose**
```bash
# Full production deployment
./scripts/deploy-production.sh

# Or manually
docker-compose -f docker-compose.production.yml up --build -d
```

3. **Verify Deployment**
```bash
# Check service health
docker-compose -f docker-compose.production.yml ps

# View logs
docker-compose -f docker-compose.production.yml logs -f app

# Test application
curl http://localhost:3000/api/health
```

#### Production Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │   Next.js App   │    │   PostgreSQL    │
│   (Optional)    │────│   (Port 3000)   │────│   (Port 5432)   │
│   Port 80/443   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                 │
                       ┌─────────────────┐
                       │     Redis       │
                       │  (Port 6379)    │
                       │   (Optional)    │
                       └─────────────────┘
```

#### Pros & Cons
✅ **Pros:**
- Full control over infrastructure
- Can run anywhere
- Easy scaling
- No vendor lock-in
- Production-ready with monitoring

❌ **Cons:**
- Requires server management
- More complex setup
- Manual scaling

---

### 3. Railway

**Perfect for:** Simple hosting with databases included

#### Setup Steps

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Choose "Deploy from GitHub repo"

2. **Configure Environment Variables**
   ```
   DATABASE_URL → (Railway will provide PostgreSQL)
   ADMIN_USERNAME → your_admin_username
   ADMIN_PASSWORD → your_secure_password
   JWT_SECRET → your_jwt_secret_32_chars_plus
   NODE_ENV → production
   ```

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Copy connection string to DATABASE_URL

4. **Deploy**
   - Railway automatically deploys on git push
   - Monitor deployment in dashboard

#### Pros & Cons
✅ **Pros:**
- Very simple setup
- Built-in database
- Automatic deployments
- Good free tier

❌ **Cons:**
- Less control than self-hosted
- Limited customization options

---

### 4. DigitalOcean App Platform

**Perfect for:** Managed hosting with more control than PaaS

#### Setup Steps

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect GitHub repository
   - Configure build settings

2. **Add Database**
   - Add PostgreSQL database component
   - Configure connection string

3. **Environment Variables**
   ```
   DATABASE_URL → ${db.DATABASE_URL}
   ADMIN_USERNAME → your_admin
   ADMIN_PASSWORD → secure_password
   JWT_SECRET → your_jwt_secret
   ```

4. **Deploy**
   - Review and deploy
   - Monitor deployment status

---

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# Database (Required)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Admin Authentication (Required)
ADMIN_USERNAME="your_admin_username"
ADMIN_PASSWORD="your_secure_password"  # Use strong password!
JWT_SECRET="your_jwt_secret_minimum_32_characters"

# EmailJS for Contact Form (Required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_xxxxxxx"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_xxxxxxx"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxxx"
```

### Optional Environment Variables

```bash
# NextAuth (if implementing OAuth)
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your_nextauth_secret"

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-portfolio-bucket"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
VERCEL_ANALYTICS_ID="your_vercel_analytics_id"

# Monitoring
SENTRY_DSN="your_sentry_dsn"

# Redis (for caching)
REDIS_URL="redis://localhost:6379"
```

## 🗄️ Database Setup by Provider

### Vercel Postgres
```bash
# 1. Create in Vercel Dashboard
# 2. Copy connection string
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# 3. Run migrations
yarn pnpify prisma db push
yarn db:seed
```

### Supabase
```bash
# 1. Create project at supabase.com
# 2. Settings → Database → Connection string
DATABASE_URL="postgresql://postgres:password@db.host.supabase.co:5432/postgres"

# 3. Setup
yarn pnpify prisma db push
yarn db:seed
```

### Railway
```bash
# 1. Add PostgreSQL plugin in Railway
# 2. Copy DATABASE_URL from dashboard
# 3. Setup
yarn pnpify prisma db push
yarn db:seed
```

### Self-hosted PostgreSQL
```bash
# Using Docker Compose (included in project)
docker-compose -f docker-compose.production.yml up -d db

# Or install PostgreSQL manually
# Then:
createdb portfolio
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
yarn pnpify prisma db push
yarn db:seed
```

## 🔍 Monitoring & Health Checks

### Application Health
```bash
# Health check endpoint
curl https://your-domain.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-12-16T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "database": "connected",
  "version": "1.0.0"
}
```

### Database Health
```bash
# Check database connectivity
yarn pnpify prisma db execute --stdin <<< "SELECT NOW();"

# Check table sizes
yarn pnpify prisma db execute --stdin <<< "
SELECT 
  table_name,
  (SELECT COUNT(*) FROM contacts) as contacts,
  (SELECT COUNT(*) FROM blog_posts) as blog_posts,
  (SELECT COUNT(*) FROM skills) as skills
FROM information_schema.tables 
WHERE table_schema = 'public' 
LIMIT 1;
"
```

### Docker Monitoring
```bash
# Service status
docker-compose -f docker-compose.production.yml ps

# Application logs
docker-compose -f docker-compose.production.yml logs -f app

# Database logs
docker-compose -f docker-compose.production.yml logs -f db

# Resource usage
docker stats
```

## 🛡️ Security Checklist

### Before Deployment
- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable database SSL in production
- [ ] Set up proper CORS headers
- [ ] Configure environment variables securely
- [ ] Review and update dependencies

### After Deployment
- [ ] Test admin login functionality
- [ ] Verify contact form works
- [ ] Check all API endpoints
- [ ] Test database connectivity
- [ ] Verify SSL certificate (if applicable)
- [ ] Set up monitoring alerts

## 🚨 Troubleshooting

### Common Issues

#### "Database connection failed"
```bash
# Check connection string format
echo $DATABASE_URL

# Test connectivity
yarn pnpify prisma db execute --stdin <<< "SELECT 1;"

# Verify SSL requirements
# Some providers require sslmode=require
```

#### "Admin login not working"
```bash
# Check admin credentials in environment
echo $ADMIN_USERNAME
echo $ADMIN_PASSWORD

# Verify JWT secret is set
echo $JWT_SECRET | wc -c  # Should be 32+ characters
```

#### "Contact form not sending emails"
```bash
# Check EmailJS configuration
echo $NEXT_PUBLIC_EMAILJS_SERVICE_ID
echo $NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
echo $NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

# Test from browser console:
# Check network tab for 200 response to EmailJS
```

#### "Build failures"
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
yarn install

# Check for TypeScript errors
yarn type-check
```

### Debug Commands
```bash
# View environment variables (be careful with secrets!)
env | grep -E "(DATABASE|ADMIN|JWT|EMAILJS)"

# Check application logs
tail -f logs/application.log

# Test database queries
yarn db:studio

# Check network connectivity
curl -I https://your-domain.com
```

## 📈 Performance Optimization

### Production Optimizations
- Enable gzip compression
- Use CDN for static assets
- Implement Redis caching
- Optimize images
- Enable database query optimization
- Set up monitoring and alerting

### Scaling Considerations
- Database connection pooling
- Load balancing (multiple app instances)
- Caching layer (Redis)
- Database read replicas
- CDN for global distribution

---

## 🎯 Deployment Summary

| Platform | Complexity | Cost | Control | Best For |
|----------|------------|------|---------|----------|
| **Vercel** | Low | Free tier generous | Low | Quick deployment, prototypes |
| **Railway** | Low | $5/month | Medium | Simple production apps |
| **DigitalOcean** | Medium | $12/month | High | Scalable applications |
| **Self-hosted Docker** | High | Variable | Full | Enterprise, custom requirements |

Choose based on your needs:
- **Just want it to work?** → Vercel
- **Need more control?** → Railway or DigitalOcean  
- **Full control required?** → Self-hosted Docker

---

**🚀 Ready to deploy?** Run `./scripts/deploy-production.sh` and follow the prompts!