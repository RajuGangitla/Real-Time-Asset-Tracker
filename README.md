# Real-Time Asset Tracker (Simulated)

This project is a high-performance Next.js widget that tracks simulated asset prices. It solves complex React challenges including effect dependency management, stale closures, and performance optimization using React.memo and Redux selectors.

## Solutions to Technical Challenges

### 1. The "Timer Reset" Issue
**Problem:** The requirements stated that changing the "Alert Threshold" input must not reset the polling timer. Adding `alertThreshold` to the dependency array of `useEffect` would normally cause the effect (and the timer) to restart on every keystroke.

**Solution:**
We utilized `useRef` to create a stable reference to the threshold value.
- `const thresholdRef = useRef(alertThreshold);`
- An independent `useEffect` updates `thresholdRef.current` whenever the prop changes.
- The polling effect reads from `thresholdRef.current`. Since the ref itself does not change identity, the polling effect is not re-triggered, allowing the timer to continue uninterrupted while still accessing the latest value.

### 2. Performance Optimization (Re-renders)
**Problem:** The requirement was to ensure updating the price history only re-renders the Price component, not the entire Page Layout.

**Solution:**
We implemented a strict "Smart/Dumb" component architecture:
- **Headless Hook:** `useAssetTracker` does not return state. It only dispatches actions to Redux. This prevents the parent `AssetTrackerClient` from re-rendering on every price update.
- **Smart Child Component:** `PriceDisplay` subscribes directly to the Redux store using `selectLatestAssetPrice`. Only this specific sub-component re-renders when data arrives.
- **Memoization:** All UI sub-components (`StatCard`, `TrackerControls`) are wrapped in `React.memo`.
- **Debouncing:** The alert input uses local state and debouncing to prevent parent re-renders while typing.

## Architecture

**Data Flow Diagram:**
Static JSON -> useAssetTracker Hook (Simulation) -> Redux Store -> Smart Components -> UI

1. **Simulation Layer:** The hook simulates network latency (500ms-1500ms) and random price fluctuation.
2. **State Management:** Redux Toolkit stores the full price history.
3. **Presentation:** 
   - `AssetTrackerClient`: Layout container (Static after mount).
   - `PriceDisplay`: Connected component (Dynamic updates).

## Project Structure

- `app/`: Next.js App Router pages.
- `components/AssetTrackerClient/`: The main widget, split into sub-components (`PriceDisplay`, `TrackerControls`, `StatCard`).
- `hooks/`: Custom hooks (`useAssetTracker`).
- `lib/store/`: Redux configuration, slices, and memoized selectors.
- `types/`: Centralized type definitions.

## Local Run Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.
