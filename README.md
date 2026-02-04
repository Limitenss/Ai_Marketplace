# AI Marketplace

React + Vite frontend for the AI Marketplace application.

## Contents

- 7 React components (Header, Hero, BrowseAI, ScenarioAnalyzer, RecommendationResults, AICard, Footer)
- Purple gradient design theme
- Fully responsive (mobile-first)
- TypeScript type-safe
- Mock AI database included

## Quick start

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173

## Project structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── BrowseAI.tsx
│   ├── ScenarioAnalyzer.tsx
│   ├── RecommendationResults.tsx
│   ├── AICard.tsx
│   └── Footer.tsx
├── styles/
├── data/mockAIs.ts
├── types.ts
├── App.tsx
└── App.css
```

## Integration with backend

The `/api/analyze` endpoint should return:

```json
{
  "scenario": "...",
  "recommendedAIs": [{ "name": "...", "score": 0.95 }],
  "explanation": "..."
}
```

Update `src/App.tsx` to connect to your backend API.

## Data interfaces

```typescript
interface AI {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  pricing: string;
  rating: number;
}

interface FormData {
  scenario: string;
  useCase?: string;
  budget?: string;
}
```

## Customization

Colors: `#667eea` (primary), `#764ba2` (secondary)

Edit in component CSS files or `src/index.css`

## Scripts

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # Lint code
npm run preview  # Preview build
```

## Tech stack

- React 19
- TypeScript
- Vite
- CSS3

## Resources

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
