# Real-Time Asset Tracker (Simulated)

A Next.js widget that tracks asset prices via simulated polling. This project demonstrates handling complex effect dependencies, avoiding stale closures, and managing memory leaks in React.

## Features

- **Real-Time Simulation**: Polling with simulated network latency.
- **Smart Polling**: Adjusts based on user interaction (Alert Threshold) without resetting timers unnecessarily.
- **Redux Toolkit**: State management for price history.
- **Performance**: Memoized selectors and optimized re-renders.
- **SEO**: Dynamic metadata for asset pages.

## Architecture

**Data Flow:**
Static JSON (`lib/data.json`) -> `useAssetTracker` Hook (Simulation) -> Redux Store (`assetSlice`) -> UI Components (Chart/Price)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd real-time-asset-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `lib/store/`: Redux store configuration and slices.
- `lib/data.json`: Static data for simulated fetching.
- `components/`: React components (Container vs Presentational).

## Technologies

- Next.js 16 (App Router)
- TypeScript
- Redux Toolkit
- Tailwind CSS
