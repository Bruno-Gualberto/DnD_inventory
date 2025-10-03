# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A D&D inventory management application built with React (Vite) frontend and Express.js backend. The app helps manage character inventories, store items, and loot for D&D campaigns using Supabase (PostgreSQL) as the database.

## Architecture

### Frontend (`/src`)
- **Build Tool**: Vite (migrated from Create React App)
- **Framework**: React 19 with react-router for navigation
- **UI Library**: Material-UI (MUI) with custom theming
- **Styling**: Emotion (styled components via MUI)
- **State**: React hooks (useState, useEffect)
- **API Communication**: Axios with utility functions in `/src/utils/`

### Backend (`/api`)
- **Framework**: Express.js (Node 18.x)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: API key-based (X-API-Key header)
- **Deployment**: Vercel (serverless functions)

### Database Schema (Supabase)
- **Items**: Master items table with UUID as foreign key reference
  - Fields: id, UUID, Name, Type, SubType, Rarity, Weight, SellingPrice, BuyingPrice, Description
- **Inventory1**: Player inventory (references Items via UUID)
  - Fields: id, UUID (FK to Items), Quantity
- **Store**: Store items (references Items via UUID)
  - Fields: id, UUID (FK to Items), Quantity
- **Loot**: Loot items (references Items via UUID)
  - Fields: id, UUID (FK to Items), Quantity
- **CharactersInfo**: Character details
  - Fields: id, Name, Race, Class, Level, Experience, StrModifier, Coins

### Key Architecture Patterns
- **Component Structure**: Page components in `/src/components/` (Inventory, Store, Loot)
- **API Proxy Pattern**: Backend proxies requests to Supabase to hide credentials
- **SQL JOINs**: Backend uses Supabase queries with nested selects to fetch related data in single queries
- **Shared Components**: Header, NavigationTabs, FeedbackMessage used across pages

## Development Commands

### Frontend
```bash
npm start          # Start dev server on localhost:3000
npm run build      # Build for production (outputs to /build)
npm run serve      # Preview production build
```

### Backend (from /api directory)
```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-reload)
npm test           # Run test-proxy.js
```

## Environment Configuration

### Frontend (`.env` in root)
```
VITE_BASE_URL=<backend-url>
VITE_API_KEY=<api-key-for-backend-auth>
VITE_LYA_ID=<character-record-id>
```

### Backend (`/api/.env`)
```
SUPABASE_URL=<your-project-url>
SUPABASE_ANON_KEY=<your-anon-key>
API_KEY=<secret-key>
PORT=8001
```

## API Endpoints (Backend)

All `/api/*` endpoints require `X-API-Key` header for authentication.

### Character Inventory (Inventory1 table)
- `GET /api/character` - Get all character items with joined Items data
- `GET /api/character/:recordId` - Get single item by id with joined Items data
- `POST /api/character/add` - Add item (requires `uuid` and optional `quantity`)
- `PATCH /api/character/:recordId` - Update item quantity
- `DELETE /api/character/:recordId` - Delete item

### Other Tables
- `GET /api/global` - All items from Items table
- `GET /api/store` - All store items with joined Items data
- `GET /api/loot` - All loot items with joined Items data
- `GET /api/all-characters` - All characters from CharactersInfo
- `GET /api/all-characters/:recordId` - Single character details

### Public
- `GET /health` - Health check (no auth required)

## Important Technical Details

### Supabase Query Patterns
The backend uses Supabase's nested select syntax for JOINs:
```javascript
const { data, error } = await supabase
  .from("Inventory1")
  .select(`
    id,
    Quantity,
    UUID,
    Items (
      Name,
      Description,
      SellingPrice
    )
  `);
```

This returns data in format:
```javascript
{
  id: 1,
  Quantity: 2,
  UUID: "abc-123",
  Items: {
    Name: "Sword",
    Description: "A sharp blade",
    SellingPrice: "100 gp"
  }
}
```

### Key Differences from Airtable
- **No array unwrapping needed**: Data comes as clean objects, not arrays
- **Single query for relationships**: JOINs happen at database level, not in application
- **UUID foreign keys**: Inventory/Store/Loot tables reference Items.UUID for relational integrity
- **PostgreSQL error codes**: Use `error.code === "PGRST116"` to detect "not found" errors

### Current State of Development
- API utility functions use hardcoded `localhost:8001` (lines commented show production URL pattern)
- Frontend routing: `/` (Inventory), `/store` (Store), `/loot` (Loot)
- Custom MUI theme with D&D-inspired color palette (primary: green, secondary: red, tertiary: brown)
- Typography system: title/subtitle/cta/body/small variants with bold/regular weights

### Theme Usage
The custom theme defines:
- **Colors**: primary (green), secondary (red), tertiary (brown), standard MUI colors
- **Typography**: Custom variants (titleBold, subtitleRegular, etc.) - use as `<Typography variant='titleBold'>`
- **Component Overrides**: Buttons have textTransform: 'none', Tabs have custom overflow handling

## Development Notes

- When developing locally, ensure both frontend (port 3000) and backend (port 8001) are running
- Supabase automatically handles foreign key relationships via UUID references
- All API responses follow format: `{ success: boolean, items/data: [...], count?: number }`
- When adding items via POST, pass the `uuid` from Items table (not `customId` as in legacy Airtable version)
- Update operations on Items table automatically reflect in all inventories due to foreign key JOINs
