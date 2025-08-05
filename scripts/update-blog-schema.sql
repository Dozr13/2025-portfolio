-- Clean blog posts structure for professional portfolio
UPDATE blog_posts SET 
content = '# Microservices with Next.js: Event-Driven Architecture

Next.js isn''t just for frontend applications. With its powerful API routes and serverless capabilities, it''s an excellent choice for building microservices architectures.

## Event-Driven Design Principles

Event-driven architecture enables loose coupling between services, improved scalability, and better fault tolerance.

### Event Types

```typescript
interface UserCreatedEvent {
  type: ''USER_CREATED''
  userId: string
  email: string
  timestamp: Date
}

interface OrderProcessedEvent {
  type: ''ORDER_PROCESSED''
  orderId: string
  userId: string
  amount: number
  timestamp: Date
}
```

## Implementing Message Queues

### Redis Pub/Sub

```typescript
import Redis from ''ioredis''

const redis = new Redis(process.env.REDIS_URL)

export async function publishEvent(channel: string, event: any) {
  await redis.publish(channel, JSON.stringify(event))
}

export function subscribeToEvents(channel: string, handler: (event: any) => void) {
  const subscriber = new Redis(process.env.REDIS_URL)
  subscriber.subscribe(channel)
  subscriber.on(''message'', (channel, message) => {
    const event = JSON.parse(message)
    handler(event)
  })
}
```

Building microservices with Next.js provides the perfect balance of developer experience and production readiness for modern applications.'
WHERE slug = 'microservices-nextjs-event-driven-architecture';

-- Update other posts to be clean and professional
UPDATE blog_posts SET
content = '# Building Scalable React Applications with Modern Architecture

React applications can quickly become unwieldy as they grow. In this comprehensive guide, we''ll explore proven patterns and techniques for building applications that scale with your team and requirements.

## Component Composition Patterns

### Custom Hooks for Logic Reuse

Extract stateful logic into custom hooks:

```typescript
function useAsync<T>(asyncFunction: () => Promise<T>, deps: DependencyList) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let cancelled = false
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    asyncFunction()
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({ data: null, loading: false, error })
        }
      })

    return () => {
      cancelled = true
    }
  }, deps)

  return state
}
```

## Performance Optimization

### Code Splitting

Implement route-based and component-based code splitting:

```typescript
const LazyComponent = lazy(() => import(''./HeavyComponent''))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/heavy" element={
          <Suspense fallback={<LoadingSpinner />}>
            <LazyComponent />
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}
```

Building scalable React applications requires thoughtful architecture decisions from the start.'
WHERE slug = 'scalable-react-applications-modern-architecture';

UPDATE blog_posts SET
content = '# Database Optimization: From Queries to Schema Design

Database performance can make or break your application. Here''s a comprehensive guide to optimizing PostgreSQL for production workloads.

## Indexing Strategies

### Composite Indexes

Design indexes that support your most common query patterns:

```sql
-- For queries filtering by status and created_at
CREATE INDEX idx_orders_status_created 
ON orders (status, created_at) 
WHERE status IN (''pending'', ''processing'');

-- Partial index for active records only
CREATE INDEX idx_users_active_email 
ON users (email) 
WHERE active = true;
```

## Query Optimization

### Analyzing Query Plans

Use EXPLAIN to understand query execution:

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > ''2024-01-01''
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
```

Database optimization is an ongoing process. Start with proper indexing, monitor query performance, and adjust your schema design as your application grows.'
WHERE slug = 'database-optimization-queries-schema-design';