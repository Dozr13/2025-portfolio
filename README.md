# Wade Pate - Portfolio 2025

A modern, full-stack portfolio website built with Next.js 15, TypeScript, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ with Yarn
- Docker (for containerized development)
- PostgreSQL database (we recommend [Neon](https://neon.tech))

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/Dozr13/2025-portfolio
   cd 2025-portfolio
   yarn install
   ```

2. **Set up environment:**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your database URL (example with Neon):
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```

3. **Initialize database:**
   ```bash
   yarn db:push    # Create tables
   yarn db:seed    # Add sample data
   ```

4. **Start development server:**
   ```bash
   yarn dev
   ```

### Docker Development

For a containerized development environment:

```bash
# Create .env.local with your database URL
echo 'DATABASE_URL="your_postgresql_url_here"' > .env.local

# Start development container
yarn docker:dev
```

Access the app at http://localhost:3001

### Production Deployment

```bash
# Build and run production container
yarn docker:prod
```

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon recommended)
- **Animation:** Framer Motion
- **Deployment:** Docker, Vercel
- **Admin:** Custom admin panel with authentication

## 📁 Project Structure

```
├── app/                 # Next.js 15 app directory
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   └── blog/           # Blog pages
├── components/         # React components
│   ├── sections/       # Page sections
│   └── ui/            # Reusable UI components
├── prisma/            # Database schema and seeders
│   ├── seeders/       # Modular seed files
│   └── schema.prisma  # Database schema
├── scripts/           # Build and deployment scripts
└── docker-compose.yml # Docker configuration
```

## 🔐 Admin Panel

Access the admin panel at `/admin` with default credentials:
- Username: `admin`
- Password: `admin123`

**Features:**
- Blog post management (create, edit, delete)
- Project portfolio management
- Contact form management
- Analytics dashboard

## 🗄 Database

The portfolio uses PostgreSQL with the following main models:
- **BlogPost** - Blog content management
- **Project** - Portfolio projects
- **Experience** - Work experience
- **Skill** - Technical skills
- **Contact** - Contact form submissions

## 📝 Content Management

### Blog Posts
- Full CRUD operations via admin panel
- Markdown content support
- SEO meta tags
- Categories and tags
- Reading time calculation

### Projects
- Portfolio project showcase
- GitHub and live demo links
- Technology stack tags
- Metrics and achievements

### Case Studies
- Detailed project breakdowns
- Problem/solution narratives
- Performance metrics
- Client testimonials

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add your `DATABASE_URL` environment variable
3. Deploy automatically on push

### Docker
```bash
docker-compose up --build -d
```

## 📊 Performance

- **Lighthouse Score:** 100/100
- **Loading Speed:** < 1 second
- **Bundle Size:** Optimized with Next.js
- **SEO:** Fully optimized meta tags

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs via GitHub issues
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

---

Built with ❤️ by [Wade Pate](https://wadepate.dev)