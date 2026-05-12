# 🏢 Companies Directory

> A production-grade React frontend application showcasing modern state management, real-time filtering, and responsive design patterns.

**[Live Site](https://companies-directory-flm-nine.vercel.app)**

---

## ✨ Features

### 🔍 **Smart Filtering**
- Real-time search across company names, tickers, and CEO names
- Three independent dropdown filters: Industry, Location, Status
- Combine multiple filters for powerful data discovery
- One-click "Clear" button to reset all filters

### 📊 **Flexible Views**
- **Table View** – Full data table with sortable columns and detailed row information
- **Card View** – Responsive grid layout perfect for mobile and tablet devices
- Seamless toggle between views with instant data refresh

### 📈 **Intelligent Sorting**
- Click any column header to sort ascending/descending
- Visual indicators (↑ ↓ ⇅) show current sort state
- Supports sorting by: Name, Industry, Location, Status, Revenue, Employees, Founded year

### 📑 **Smart Pagination**
- 10 rows/cards per page
- Intelligent ellipsis navigation for large datasets
- Dynamic page range calculation (e.g., "1 … 3 4 5 6 7 … 50")
- Current page range indicator (e.g., "31–40 of 50")

### 📋 **Rich Data Display**
- Live statistics bar showing filtered counts
- Status badges with semantic colors (Public/Private/Acquired)
- Industry tags with distinct color coding
- Avatar initials with deterministic per-company colors
- Click any row/card to open detailed company information modal

### ⚡ **Performance Optimized**
- Memoized filtering & sorting pipeline with precise dependency tracking
- Skeleton loading states with shimmer animation
- Deterministic avatar colors (stable across re-renders)
- Pre-computed display strings (no format-on-render)

### 🎨 **Beautiful UI/UX**
- Custom CSS design system with CSS variables for theming
- Material UI icons integration
- Responsive design (mobile-first approach)
- Smooth hover effects and transitions
- Empty states with helpful messaging
- Loading states with skeleton rows

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 18 | Component library |
| **Type Safety** | TypeScript 5 | Static type checking |
| **State Management** | Redux Toolkit | Global state + immutability |
| **Context API** | React Context | Dependency injection façade |
| **Styling** | Tailwind CSS 3 + CSS Variables | Utility-first + custom design system |
| **Icons** | Material UI Icons | SVG icon library |
| **Build Tool** | Vite 5 | Lightning-fast bundler |
| **Fonts** | @fontsource (DM Sans/Mono) | Self-hosted typography |
| **Package Manager** | npm | Dependency management |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 22.12+ or 20.19+
- **npm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/companies-directory.git
cd companies-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **`http://localhost:5173`**

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/              # React components (presentational + smart)
│   ├── Avatar.tsx          # Initials avatar with deterministic colors
│   ├── CardsView.tsx       # Responsive grid layout view
│   ├── CompanyModal.tsx    # Detail modal overlay
│   ├── Header.tsx          # Top navigation bar
│   ├── IndustryBadge.tsx   # Industry label badge
│   ├── Pagination.tsx      # Smart page navigation
│   ├── StatsBar.tsx        # Filter statistics chips
│   ├── StatusBadge.tsx     # Public/Private/Acquired indicator
│   ├── TableView.tsx       # Sortable data table
│   └── Toolbar.tsx         # Search + filter controls
│
├── context/                 # React Context API
│   └── FilterContext.tsx    # Context provider + useFilterContext + useCompanies hook
│
├── store/                   # Redux Toolkit
│   ├── companiesSlice.ts   # State shape + reducers + actions
│   └── index.ts            # Store configuration + types
│
├── data/                    # Mock data
│   └── companies.ts        # 50 seeded company records
│
├── types/                   # TypeScript definitions
│   └── index.ts            # Company, CompaniesState, etc.
│
├── utils/                   # Pure utility functions
│   └── helpers.ts          # formatRevenue, getColor, getInitials, etc.
│
├── App.tsx                 # Root component + layout
├── index.css               # Tailwind + CSS custom properties
└── main.tsx                # Entry point + provider tree
```

---


## 📖 Component Overview

### Presentational Components
- **Avatar** – Renders initials + deterministic color
- **IndustryBadge** – Industry label with pastel background
- **StatusBadge** – Public/Private/Acquired indicator

### Smart Components
- **Toolbar** – Search input + filter dropdowns + view toggle
- **Header** – Title + company count
- **StatsBar** – Status count chips
- **TableView** – Sortable data table with pagination
- **CardsView** – Responsive card grid with pagination
- **CompanyModal** – Detail overlay
- **Pagination** – Page navigation controls

---

## 🎯 Usage Examples

### Connecting a Real API

Replace mock data with an API call:

```typescript
// store/companiesSlice.ts
export const fetchCompanies = createAsyncThunk(
  'companies/fetch',
  async () => {
    const res = await fetch('/api/companies');
    return res.json() as Promise<Company[]>;
  }
);

// In extraReducers:
builder
  .addCase(fetchCompanies.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchCompanies.fulfilled, (state, action) => {
    state.data = action.payload;
    state.loading = false;
  });
```

### Adding a New Filter

```typescript
// 1. Add field to CompaniesState in types/index.ts
interface CompaniesState {
  // ... existing fields
  yearRange: { min: number; max: number };
}

// 2. Add action to companiesSlice.ts
setYearRange: (state, action) => {
  state.yearRange = action.payload;
  state.page = 1;  // Reset pagination
}

// 3. Add filter logic to useCompanies hook
if (filters.yearRange) {
  filtered = filtered.filter(c => 
    c.founded >= filters.yearRange.min &&
    c.founded <= filters.yearRange.max
  );
}

// 4. Add UI in Toolbar.tsx
<input 
  type="range" 
  onChange={e => dispatch(setYearRange({
    min: parseInt(e.target.value),
    max: 2024
  }))}
/>
```

## 🎨 Design System

### Color Palette
```css
:root {
  --brand: #2c5282;         /* Primary brand blue */
  --brand-mid: #3b82f6;     /* Lighter blue for accents */
  --surface: #ffffff;       /* Card/surface background */
  --bg: #f5f4f0;            /* Page background */
  --border: #e2e0d8;        /* Border color */
  --text: #1a1a1a;          /* Primary text */
  --muted: #6b7280;         /* Secondary text */
  --subtle: #9ca3af;        /* Tertiary text */
}
```

### Typography
- **Display Font** – DM Sans (400, 500, 700) – body text & UI
- **Monospace Font** – DM Mono (400, 500) – ticker symbols, code, revenue

### Spacing System
- `4mm` = padding/gap unit
- `--radius: 10px` – standard border radius
- `--radius-lg: 16px` – larger elements (modals, cards)


## 🔧 Configuration

### Vite
```typescript
// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});
```

### TypeScript
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Tailwind
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false }, // Avoid conflict with MUI
  theme: { extend: {} },
};
```

---

## 📊 Mock Data

The app ships with **50 seeded company records** spanning:

- **10 Industries** – Technology, Finance, Healthcare, Retail, Energy, Automotive, Media, Food & Beverage, Pharmaceuticals, Manufacturing
- **14 Locations** – San Francisco, New York, Austin, Seattle, Boston, Chicago, LA, Denver, Atlanta, Miami, London, Tokyo, Berlin, Toronto
- **3 Statuses** – Public, Private, Acquired

Each company includes:
- Name, ticker symbol, CEO
- Founded year, employee count, revenue
- Rating (3.2–5.0)
- Website domain
- Location & industry classification

---
\
**[⬆ Back to top](#-companies-directory)**

