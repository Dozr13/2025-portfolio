import { PostStatus } from '@/generated/client'
import { prisma } from '@/lib/prisma'

const blogPosts = [
  {
    title: 'Building Scalable React Applications with Modern Architecture',
    slug: 'scalable-react-applications-modern-architecture',
    excerpt:
      'Deep dive into component composition, state management patterns, and performance optimization techniques that scale with your team and codebase.',
    content: `# Building Scalable React Applications with Modern Architecture

React applications can quickly become unwieldy as they grow. In this comprehensive guide, we'll explore proven patterns and techniques for building applications that scale with your team and requirements.

## Component Composition Patterns

### Higher-Order Components (HOCs)
\`\`\`typescript
function withLoading<T extends object>(Component: React.ComponentType<T>) {
  return (props: T & { isLoading?: boolean }) => {
    if (props.isLoading) {
      return <LoadingSpinner />
    }
    return <Component {...props} />
  }
}
\`\`\`

### Render Props Pattern
The render props pattern provides maximum flexibility for component reuse:

\`\`\`typescript
interface DataFetcherProps {
  url: string
  children: (data: any, loading: boolean, error: Error | null) => React.ReactNode
}

function DataFetcher({ url, children }: DataFetcherProps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return children(data, loading, error)
}
\`\`\`

## State Management Architecture

For large applications, consider these state management patterns:

1. **Context + useReducer** for complex local state
2. **Zustand** for global state management
3. **React Query** for server state
4. **Custom hooks** for business logic

## Performance Optimization

### Memoization Strategies
\`\`\`typescript
// Expensive calculations
const expensiveValue = useMemo(() => {
  return heavyComputation(data)
}, [data])

// Component memoization
const MemoizedComponent = React.memo(({ items }) => {
  return (
    <div>
      {items.map(item => <Item key={item.id} {...item} />)}
    </div>
  )
})
\`\`\`

### Code Splitting
Implement route-based and component-based code splitting:

\`\`\`typescript
// Route-based splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

// Component-based splitting
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
\`\`\`

## Testing Strategy

A scalable React app needs comprehensive testing:

1. **Unit tests** for individual components
2. **Integration tests** for component interactions
3. **E2E tests** for critical user flows

\`\`\`typescript
// Example unit test
import { render, screen } from '@testing-library/react'
import { UserCard } from './UserCard'

test('displays user information correctly', () => {
  const user = { name: 'John Doe', email: 'john@example.com' }
  render(<UserCard user={user} />)
  
  expect(screen.getByText('John Doe')).toBeInTheDocument()
  expect(screen.getByText('john@example.com')).toBeInTheDocument()
})
\`\`\`

## Conclusion

Building scalable React applications requires thoughtful architecture decisions from the start. By implementing these patterns and practices, you'll create applications that are maintainable, performant, and ready to grow with your business needs.`,
    category: 'Frontend',
    tags: 'React,TypeScript,Performance,Architecture',
    readingTime: 8,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date('2024-12-15'),
    views: 2847,
    author: 'Wade Pate'
  },
  {
    title: 'Microservices with Next.js: Event-Driven Architecture',
    slug: 'microservices-nextjs-event-driven-architecture',
    excerpt:
      'How to design and implement event-driven microservices using Next.js API routes, message queues, and distributed patterns for enterprise applications.',
    content: `# Microservices with Next.js: Event-Driven Architecture

Next.js isn't just for frontend applications. With its powerful API routes and serverless capabilities, it's an excellent choice for building microservices architectures.

## Event-Driven Design Principles

Event-driven architecture enables loose coupling between services, improved scalability, and better fault tolerance.

### Event Types
\`\`\`typescript
interface UserCreatedEvent {
  type: 'USER_CREATED'
  userId: string
  email: string
  timestamp: Date
}

interface OrderProcessedEvent {
  type: 'ORDER_PROCESSED'
  orderId: string
  userId: string
  amount: number
  timestamp: Date
}
\`\`\`

## Implementing Message Queues

### Redis Pub/Sub
\`\`\`typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function publishEvent(channel: string, event: any) {
  await redis.publish(channel, JSON.stringify(event))
}

export function subscribeToEvents(channel: string, handler: (event: any) => void) {
  const subscriber = new Redis(process.env.REDIS_URL)
  subscriber.subscribe(channel)
  subscriber.on('message', (channel, message) => {
    const event = JSON.parse(message)
    handler(event)
  })
}
\`\`\`

### Next.js API Route Example
\`\`\`typescript
// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { publishEvent } from '@/lib/events'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = await createUser(req.body)
    
    // Publish event to notify other services
    await publishEvent('users', {
      type: 'USER_CREATED',
      userId: user.id,
      email: user.email,
      timestamp: new Date()
    })
    
    res.status(201).json(user)
  }
}
\`\`\`

## Service Communication Patterns

### Saga Pattern for Distributed Transactions
\`\`\`typescript
class OrderSaga {
  async processOrder(order: Order) {
    try {
      await this.reserveInventory(order.items)
      await this.processPayment(order.payment)
      await this.scheduleShipping(order.shipping)
      await this.sendConfirmation(order.userId)
    } catch (error) {
      await this.compensate(order)
      throw error
    }
  }

  private async compensate(order: Order) {
    // Implement compensation logic
    await this.releaseInventory(order.items)
    await this.refundPayment(order.payment)
  }
}
\`\`\`

## Monitoring and Observability

### Distributed Tracing
\`\`\`typescript
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('user-service')

export async function createUser(userData: UserData) {
  const span = tracer.startSpan('create-user')
  
  try {
    span.setAttributes({
      'user.email': userData.email,
      'service.name': 'user-service'
    })
    
    const user = await database.users.create(userData)
    span.setStatus({ code: SpanStatusCode.OK })
    return user
  } catch (error) {
    span.recordException(error)
    span.setStatus({ code: SpanStatusCode.ERROR })
    throw error
  } finally {
    span.end()
  }
}
\`\`\`

## Deployment Strategies

### Container Orchestration
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  user-service:
    build: ./services/user-service
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  order-service:
    build: ./services/order-service
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
\`\`\`

Building microservices with Next.js provides the perfect balance of developer experience and production readiness for modern applications.`,
    category: 'Backend',
    tags: 'Next.js,Microservices,Node.js,Architecture',
    readingTime: 12,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date('2024-12-08'),
    views: 1923,
    author: 'Wade Pate'
  },
  {
    title: 'Database Optimization: From Queries to Schema Design',
    slug: 'database-optimization-queries-schema-design',
    excerpt:
      'Advanced techniques for optimizing PostgreSQL performance, including indexing strategies, query optimization, and schema design patterns.',
    content: `# Database Optimization: From Queries to Schema Design

Database performance is critical for application success. This guide covers comprehensive optimization strategies for PostgreSQL.

## Query Optimization Fundamentals

### Understanding EXPLAIN
\`\`\`sql
EXPLAIN ANALYZE 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC;
\`\`\`

### Index Strategies
\`\`\`sql
-- Composite index for common query patterns
CREATE INDEX idx_orders_user_status_date 
ON orders (user_id, status, created_at);

-- Partial index for specific conditions
CREATE INDEX idx_active_users 
ON users (email) 
WHERE status = 'active';

-- Expression index for computed values
CREATE INDEX idx_user_full_name 
ON users (LOWER(first_name || ' ' || last_name));
\`\`\`

## Advanced Indexing Techniques

### GIN Indexes for JSON
\`\`\`sql
-- For JSONB column searches
CREATE INDEX idx_user_preferences 
ON users USING GIN (preferences);

-- Query using GIN index
SELECT * FROM users 
WHERE preferences @> '{"theme": "dark"}';
\`\`\`

### Full-Text Search
\`\`\`sql
-- Add tsvector column
ALTER TABLE articles 
ADD COLUMN search_vector tsvector;

-- Create trigger to maintain search vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.content, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_search_vector_trigger
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_search_vector();
\`\`\`

## Schema Design Patterns

### Normalization vs Denormalization
\`\`\`sql
-- Normalized approach
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profiles (
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  bio TEXT
);

-- Denormalized for read performance
CREATE TABLE user_summary (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  total_orders INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Partitioning Large Tables
\`\`\`sql
-- Partition by date range
CREATE TABLE orders (
  id BIGSERIAL,
  user_id INTEGER NOT NULL,
  total DECIMAL(10,2),
  created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE orders_2024_01 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE orders_2024_02 PARTITION OF orders
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
\`\`\`

## Connection Pooling and Performance

### PgBouncer Configuration
\`\`\`ini
[databases]
myapp = host=localhost port=5432 dbname=myapp

[pgbouncer]
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20
server_idle_timeout = 600
\`\`\`

### Application-Level Optimization
\`\`\`typescript
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

// Use prepared statements for repeated queries
const getUserByEmail = {
  name: 'get-user-by-email',
  text: 'SELECT * FROM users WHERE email = $1',
}

export async function findUserByEmail(email: string) {
  const result = await pool.query(getUserByEmail, [email])
  return result.rows[0]
}
\`\`\`

## Monitoring and Maintenance

### Key Metrics to Monitor
\`\`\`sql
-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Monitor table sizes
SELECT schemaname, tablename, 
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
\`\`\`

Proper database optimization requires ongoing attention to query patterns, index usage, and performance metrics. These techniques will help you build applications that scale efficiently.`,
    category: 'Database',
    tags: 'PostgreSQL,Performance,Optimization,Database',
    readingTime: 7,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date('2024-11-12'),
    views: 1247,
    author: 'Wade Pate'
  }
]

async function seedBlogPosts() {
  console.log('Seeding blog posts...')

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    })
    console.log(`Blog post ${post.title} seeded successfully`)
  }

  console.log('Blog posts seeded successfully')
}

async function main() {
  try {
    await seedBlogPosts()
  } catch (error) {
    console.error('Error seeding blog posts:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main as seedBlog }
