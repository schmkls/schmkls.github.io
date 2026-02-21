# schmkls.github.io

A personal ideas showcase built with React, TypeScript, and Tailwind.

## Stack

- React 19 + TypeScript
- Vite
- React Router v7
- Tailwind v4
- shadcn components (`src/components/ui/`)
- Lucide icons

## Development

```bash
npm install
npm run dev
```

## Adding an idea

1. Add an entry to `src/ideas.ts` (path + title)
2. Create `src/pages/YourIdea/index.tsx` using the `Post` template
3. Add the component to the `ideaComponents` map in `src/router.tsx`

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Type check + build
npm run check        # tsc + lint + prettier + knip
npm run lint:fix     # Fix lint issues
npm run prettier:fix # Fix formatting
```

## Deployment

Deployed via GitHub Pages from this repository.
