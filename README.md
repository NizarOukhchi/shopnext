# ShopNext

A collaborative wishlist application allows users to save products while browsing and organize them into shareable lists.

## Features

### List Management

- Create, edit and delete lists
- Infinite scroll pagination for products within lists
- Search and filter products within lists
- Share lists with configurable access levels:
  - Read-only access
  - Full access (add/remove products)

### Product Management

- Add products from any website URL
- Product details stored:
  - Title
  - Image
  - Price
  - Description
  - URL
- Move products between lists
- Remove products from lists

### Collaboration

- Share lists via unique links
- Configure access permissions per user
- Real-time updates across all collaborators

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component system
- **Lucide Icons** - Icon library
- **Clerk** - Authentication and user management
- **TypeScript** - Type safety

### Backend

- **Convex** - Backend platform with:
  - Real-time database
  - Serverless functions
  - Full-text search
  - Authentication integration
  - TypeScript support

### Key Directories and Files

#### Frontend (`src/`)

- `app/`: Next.js 15 app directory with route groups
  - `(marketing)/`: Public pages like landing page
  - `lists/`: Protected routes for authenticated users
- `components/`: Reusable React components
  - `ui/`: Base UI components from shadcn/ui
  - Custom components for specific features
- `middleware.ts`: Clerk authentication middleware

#### Backend (`convex/`)

- `lib/`: Shared utilities and helpers
  - `auth.ts`: Access control and permissions
- `lists.ts`: List CRUD operations and sharing
- `products.ts`: Product management
- `schema.ts`: Database schema and indexes
- `_generated/`: Auto-generated TypeScript types

### File Organization Principles

1. **Route Groups**: Marketing pages are separated from authenticated routes
2. **Component Hierarchy**: UI components separated from feature components
3. **Backend Modules**: Organized by domain (lists, products)
4. **Shared Logic**: Common utilities in `lib` directory
5. **Type Safety**: Generated types in `_generated` directory

### Key Files

- `convex/schema.ts`: Database schema definition
- `convex/lib/auth.ts`: Access control logic
- `src/app/layout.tsx`: Root layout with providers
- `src/middleware.ts`: Authentication middleware
- `convex.json`: Convex configuration

This structure follows Next.js and Convex best practices while maintaining clear separation of concerns and modularity.
