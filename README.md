# Walking Scotland - Scottish Walking Routes Platform

A comprehensive web application for discovering, sharing, and exploring Scottish walking routes. Built with modern technologies to provide real-time data, detailed route information, and community-driven content for walkers of all levels.

[🏔️ Explore Scottish Walks](https://walking-scotland.vercel.app/) – Discover your next adventure!

## Features

- 🏔️ **Scottish Walking Routes** - Comprehensive database of walks across Scotland
- 🗺️ **Interactive Maps** - Detailed route maps with GPS coordinates and terrain info
- 📊 **Walk Details** - Distance, ascent, difficulty, estimated time, and bog factor ratings
- 🏴󠁧󠁢󠁳󠁣󠁴󠁿 **Regional Organization** - Browse walks by Scottish regions (Highlands, Cairngorms, etc.)
- 👥 **User Reports** - Community-generated walk reports and experiences
- ⭐ **Rating System** - User ratings and reviews for each walk
- 📱 **GPX Downloads** - Download GPS files for offline navigation
- 🌦️ **Weather Integration** - Current conditions and walking suitability
- 🎯 **Advanced Search** - Filter by difficulty, distance, region, and features
- 📍 **Live Location Sharing** - Safety feature for sharing your walk progress
- 🏆 **Achievement Tracking** - Munros, Corbetts, and personal statistics
- 🔐 **User Authentication** - Secure user accounts for personalized features
- 📱 **Responsive Design** - Mobile-first approach for outdoor use
- 🌗 **Dark/Light Theme** - System-aware theme switching
- ⚡ **Real-time Updates** - Live data sync for walk conditions and reports

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and server components
- **TailwindCSS v4** - Utility-first CSS with custom design system
- **shadcn/ui** - Modern component library built on Radix UI
- **Mapbox GL v3.14** - Interactive maps for route visualization
- **Framer Motion** - Smooth animations and page transitions
- **Lucide React** - Beautiful icons for outdoor and navigation themes

### Backend & Database
- **Convex** - Real-time database with serverless functions
- **Clerk** - Authentication and user management
- **TypeScript** - Full type safety across the stack

### Data & Features
- **Comprehensive Walk Database** - 90+ Scottish walks with detailed information
- **Regional Data** - Scottish geographic regions with walk counts
- **User-Generated Content** - Walk reports, photos, and ratings
- **GPS Integration** - Route tracking and GPX file support
- **Advanced Search** - Multi-criteria filtering and sorting

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- Clerk account for authentication
- Convex account for database
- Mapbox account for maps (optional)

### Installation

1. Clone and set up the repository:

```bash
git clone https://github.com/your-username/walking-scotland.git
cd walking-scotland
npm install
```

2. Set up your environment variables:

```bash
cp .env.example .env.local
```

3. Configure your environment variables in `.env.local`:

```bash
# Convex Database
CONVEX_DEPLOYMENT=your-convex-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://your-clerk-frontend-api-url.clerk.accounts.dev

# Mapbox Maps (Optional)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...your_mapbox_token
```

4. Set up Convex database:

```bash
npx convex dev
```

5. Configure Clerk JWT Template:
   - Go to your Clerk dashboard → JWT Templates
   - Create a new template with name "convex"
   - Copy the Issuer URL for your `NEXT_PUBLIC_CLERK_FRONTEND_API_URL`

6. Set up Clerk webhooks:
   - In Clerk dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/clerk-users-webhook`
   - Enable events: `user.created`, `user.updated`, `user.deleted`

7. Seed the database with Scottish walking data:

```bash
# The project includes scripts to import walking data
npm run seed-walks
```

### Development

Start the development server:

```bash
# Start Convex backend
npx convex dev

# In another terminal, start Next.js frontend
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Project Structure

### Application Architecture
```
app/
├── (landing)/                 # Public marketing and discovery pages
│   ├── page.tsx              # Homepage with featured walks
│   ├── hero-section.tsx      # Scottish walking hero section
│   ├── featured-walks.tsx    # Popular walk showcases
│   ├── region-showcase.tsx   # Scottish regions overview
│   └── testimonials.tsx      # Walker experiences
├── walks/                    # Walk discovery and details
│   ├── page.tsx             # Walk browsing with filters
│   ├── WalkDiscovery.tsx    # Main walk search component
│   └── [slug]/              # Individual walk pages
├── regions/                  # Scottish region pages
├── dashboard/               # User dashboard and statistics
└── layout.tsx              # Root layout with providers
```

### Components
```
components/
├── map/                     # Mapping components
│   ├── ScotlandRegionMap.tsx # Scotland regions overview map
│   ├── WalkMap.tsx          # Individual walk route map
│   └── RegionMap.tsx        # Generic region mapping
├── search/                  # Search and filtering
│   └── WalkSearch.tsx       # Advanced walk search
├── downloads/               # File handling
│   └── GpxDownload.tsx      # GPX file downloads
├── uploads/                 # User content
│   └── GpxUpload.tsx        # GPX file uploads
└── ui/                      # Base UI components (shadcn/ui)
```

### Database (Convex)
```
convex/
├── schema.ts               # Complete database schema
├── walks.ts               # Walk data and queries
├── regions.ts             # Scottish regions management
├── walkStages.ts          # Walking directions and waypoints
├── walkReports.ts         # User-generated walk reports
├── users.ts               # User profiles and statistics
├── files.ts               # GPX and photo storage
└── seed.ts                # Database seeding functions
```

## Key Features

### Walk Discovery
- **Advanced Search**: Filter by difficulty, distance, region, terrain type
- **Interactive Maps**: Visualize routes before you walk
- **Detailed Information**: Terrain, parking, public transport, bog factor
- **Community Reviews**: Real walker experiences and conditions

### Route Planning
- **GPX Downloads**: Take routes offline on your GPS device
- **Stage-by-Stage Directions**: Detailed walking instructions
- **Safety Information**: Warnings, terrain conditions, equipment needs
- **Weather Integration**: Current conditions and forecasts

### Community Features
- **Walk Reports**: Share your experiences with photos and conditions
- **Rating System**: Help others choose suitable walks
- **Achievement Tracking**: Track Munros, Corbetts, and personal goals
- **Photo Sharing**: Document your Scottish walking adventures

### Scottish Walking Expertise
- **Munros & Corbetts**: Complete lists of Scottish peaks
- **Bog Factor Rating**: Unique 1-5 scale for muddy conditions
- **Regional Knowledge**: Local insights and cultural information
- **Seasonal Guidance**: Best times to visit different areas

## Database Schema

### Core Entities
```typescript
// Walks - Scottish walking routes
walks: {
  title: string,
  slug: string,
  description: string,
  regionId: Id<"regions">,
  distance: number,           // kilometers
  ascent: number,            // meters
  difficulty: "Easy" | "Moderate" | "Hard" | "Strenuous",
  estimatedTime: number,     // hours
  latitude: number,
  longitude: number,
  bogFactor: number,         // 1-5 muddy conditions rating
  terrain: string,           // terrain description
  startGridRef: string,      // OS Grid Reference
  parkingInfo: string,       // access information
}

// Regions - Scottish geographic areas
regions: {
  name: string,              // "Scottish Highlands", "Cairngorms"
  slug: string,
  description: string,
  walkCount: number,
  popularityScore: number,
}

// Walk Reports - User experiences
walk_reports: {
  walkId: Id<"walks">,
  authorId: Id<"users">,
  content: string,
  rating: number,            // 1-5 stars
  weatherConditions: string,
  trailConditions: string,
  completedAt: number,
}
```

## Environment Variables

### Required for Development
```bash
# Convex Database
CONVEX_DEPLOYMENT=your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-url.convex.cloud

# Clerk Authentication  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://your-clerk-url.clerk.accounts.dev

# Optional: Mapbox Maps
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
```

### Required for Convex Dashboard
```bash
# Set in Convex dashboard environment variables
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://your-clerk-url.clerk.accounts.dev
```

## Deployment

### Vercel Deployment (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The project is optimized for Vercel with:
- Next.js 15 App Router support
- Automatic static optimization
- Edge function support for API routes

### Production Build

```bash
npm run build
npm start
```

## Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run component tests
- `npx convex dev` - Start Convex backend development

## Data Processing

### Scottish Walking Data
The project includes comprehensive Scottish walking data processed from various sources:

- **Walk Routes**: 90+ documented walks across Scotland
- **Regional Data**: Geographic organization by Scottish regions
- **Detailed Descriptions**: Terrain, access, and safety information
- **GPS Coordinates**: Accurate positioning for all routes

### Data Sources
- WalkHighlands.co.uk integration
- Ordnance Survey grid references
- Community contributions and updates
- Local walking group information

## Contributing

We welcome contributions to improve the Scottish walking community:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/walk-rating-system`)
3. Commit your changes (`git commit -m 'Add walk rating system'`)
4. Push to the branch (`git push origin feature/walk-rating-system`)
5. Open a Pull Request

### Areas for Contribution
- Additional Scottish walks and routes
- Improved map integrations
- Weather and safety features
- Mobile app development
- Community features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **WalkHighlands.co.uk** - For inspiring Scottish walking route data
- **Ordnance Survey** - For accurate mapping data
- **Scottish Walking Community** - For route testing and feedback
- **Next.js Team** - For the incredible framework
- **Convex Team** - For real-time database capabilities

---

**Discover Scotland's most beautiful walks.** From gentle lowland strolls to challenging Munro ascents, Walking Scotland helps you find and plan your perfect Scottish walking adventure.

Built with ❤️ for the Scottish walking community using Next.js 15, Convex, and modern web technologies.