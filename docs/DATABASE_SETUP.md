# 📊 Database Setup & Management Guide

This guide covers everything you need to know about setting up and managing the database for Wade's Portfolio.

## 🗃️ Database Structure Overview

Your portfolio uses a comprehensive PostgreSQL database with the following key entities:

### Core Portfolio Data
- **Skills** - Technical skills with proficiency levels
- **Experience** - Work history and achievements  
- **Projects** - Portfolio projects with details and metrics
- **Education** - Academic background
- **Certifications** - Professional certifications
- **Services** - Services you offer clients

### Content Management
- **BlogPost** - Blog articles with SEO and analytics
- **Comments** - Blog post comments (moderated)
- **FAQ** - Frequently asked questions
- **Testimonials** - Client testimonials and reviews

### Business Operations
- **Contact** - Contact form submissions and status tracking
- **Subscriber** - Newsletter subscribers
- **Waitlist** - Service waitlist management

### Analytics & Tracking
- **PageView** - Page view analytics
- **Visitor** - Visitor session tracking
- **ProjectView** - Project-specific analytics
- **ResumeDownload** - Resume download tracking

## 🚀 Quick Start

### 1. Local Development (SQLite)

```bash
# Clone and setup
git clone <your-repo>
cd portfolio

# Install dependencies
yarn install

# Setup database
yarn db:generate
yarn db:push
yarn db:seed

# Start development
yarn dev
```

### 2. Production Setup (PostgreSQL)

```bash
# Set environment variables
export DATABASE_URL="postgresql://user:password@host:port/database"
export ADMIN_USERNAME="your_admin"
export ADMIN_PASSWORD="secure_password"
export JWT_SECRET="your_jwt_secret_32_chars_plus"

# Deploy with Docker
./scripts/deploy-production.sh

# Or deploy to Vercel
DEPLOY_TARGET=vercel ./scripts/deploy-production.sh
```

## 🔧 Database Commands

### Development Commands
```bash
# Generate Prisma client
yarn db:generate

# Apply schema changes (development)
yarn db:push

# Create and apply migrations (production)
yarn db:migrate

# Reset database (DESTRUCTIVE)
yarn pnpify prisma db push --force-reset

# Open database browser
yarn db:studio
```

### Seeding Commands
```bash
# Seed all data (comprehensive)
yarn db:seed

# Seed only blog posts
yarn db:seed-blog

# Custom seeding (run specific functions)
yarn tsx prisma/seed.ts
```

### Production Commands
```bash
# Deploy migrations (production)
yarn pnpify prisma migrate deploy

# Generate client for production
yarn pnpify prisma generate

# Check database status
yarn pnpify prisma db execute --stdin <<< "SELECT COUNT(*) FROM blog_posts;"
```

## 🗄️ Database Providers

### Local Development (SQLite)
```env
DATABASE_URL="file:./prisma/dev.db"
```

**Pros:**
- Zero setup required
- Perfect for development
- Fast local queries
- No external dependencies

**Cons:**
- Not suitable for production
- Single connection only
- Limited concurrent access

### Production Options

#### 1. Vercel Postgres (Recommended for Vercel deployment)
```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

**Pros:**
- Seamless Vercel integration
- Automatic scaling
- Built-in connection pooling
- Generous free tier

**Setup:**
1. Go to Vercel Dashboard → Storage → Create Database
2. Choose Postgres
3. Copy connection string to environment variables

#### 2. Supabase (Great free tier)
```env
DATABASE_URL="postgresql://postgres:password@db.host.supabase.co:5432/postgres"
```

**Pros:**
- Excellent free tier (500MB)
- Real-time capabilities
- Built-in auth (if needed)
- Great dashboard

**Setup:**
1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy connection string

#### 3. Railway (Simple and reliable)
```env
DATABASE_URL="postgresql://postgres:password@containers-us-west-xx.railway.app:port/railway"
```

**Pros:**
- Simple deployment
- Good free tier
- Automatic backups
- Easy monitoring

#### 4. Self-hosted (Docker)
```env
DATABASE_URL="postgresql://portfolio:password@localhost:5432/portfolio"
```

Use the included `docker-compose.production.yml` for a complete self-hosted setup.

## 📈 Database Schema Evolution

### Adding New Models

1. **Update `schema.prisma`:**
```prisma
model NewEntity {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("new_entities")
}
```

2. **Generate migration:**
```bash
yarn pnpify prisma db push
# or for production
yarn pnpify prisma migrate dev --name add_new_entity
```

3. **Update seed file:**
```typescript
// Add to prisma/seed.ts
const newEntities = [
  { name: "Example Entity" }
]

async function seedNewEntities() {
  for (const entity of newEntities) {
    await prisma.newEntity.upsert({
      where: { name: entity.name },
      update: entity,
      create: entity
    })
  }
}
```

### Modifying Existing Models

1. **Update schema**
2. **Create migration:**
```bash
yarn pnpify prisma migrate dev --name modify_existing_model
```

3. **Update seed data if needed**
4. **Update any affected API routes**

## 🔍 Database Monitoring

### Health Checks
```bash
# Check database connectivity
curl http://localhost:3000/api/health

# Check specific tables
yarn pnpify prisma db execute --stdin <<< "
  SELECT 
    table_name,
    (SELECT COUNT(*) FROM blog_posts) as blog_posts,
    (SELECT COUNT(*) FROM contacts) as contacts,
    (SELECT COUNT(*) FROM skills) as skills
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  LIMIT 1;
"
```

### Performance Monitoring
```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check query performance
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

## 🛡️ Security Best Practices

### Database Security
- Use strong passwords (32+ characters)
- Enable SSL/TLS for connections
- Restrict database access by IP
- Regular security updates
- Use environment variables for credentials

### Application Security
- Validate all inputs
- Use parameterized queries (Prisma handles this)
- Implement rate limiting
- Sanitize user content
- Regular dependency updates

## 🔄 Backup & Recovery

### Automated Backups (Production)
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql $DATABASE_URL < backup_file.sql
```

### Manual Backups
```bash
# Export data
yarn pnpify prisma db execute --stdin <<< "COPY (SELECT * FROM blog_posts) TO STDOUT WITH CSV HEADER;" > blog_posts.csv

# Import data
yarn pnpify prisma db execute --stdin <<< "\COPY blog_posts FROM 'blog_posts.csv' WITH CSV HEADER;"
```

## 🚨 Troubleshooting

### Common Issues

#### "Database does not exist"
```bash
# Create database manually
createdb portfolio
yarn db:push
```

#### "Prisma client not generated"
```bash
yarn db:generate
```

#### "Migration failed"
```bash
# Reset and reapply
yarn pnpify prisma migrate reset
yarn db:seed
```

#### "Connection timeout"
- Check DATABASE_URL format
- Verify network connectivity
- Check SSL requirements
- Verify credentials

### Debug Commands
```bash
# Check Prisma configuration
yarn pnpify prisma validate

# Check database connection
yarn pnpify prisma db execute --stdin <<< "SELECT NOW();"

# View migration status
yarn pnpify prisma migrate status

# View current schema
yarn pnpify prisma db pull --print
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Database Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)

---

**💡 Pro Tip:** Always test database changes in development before applying to production. Use migrations for production deployments to ensure consistency.