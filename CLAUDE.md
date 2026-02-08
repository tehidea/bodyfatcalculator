# CLAUDE.md — BodyFatCalculator Monorepo

## Monorepo Structure

```
packages/
  app/     → @bodyfat/app    — React Native Expo mobile app
  web/     → @bodyfat/web    — Next.js marketing website
  shared/  → @bodyfat/shared — Shared domain logic (formulas, types, conversions)
  config/  → @bodyfat/config — Shared TypeScript config
```

## Package Manager & Tools

- **pnpm** workspaces — run `pnpm install` from root
- **Turborepo** — task orchestration (`pnpm dev`, `pnpm build`, `pnpm typecheck`)
- **Biome** — linting and formatting (`pnpm lint`, `pnpm format`)
- **mise** — Node.js version management

## Key Commands

```bash
pnpm dev                        # Start all dev servers
pnpm typecheck                  # Typecheck all packages
pnpm lint                       # Lint all packages with Biome
pnpm lint:fix                   # Auto-fix lint issues
pnpm format                     # Format all packages
pnpm --filter @bodyfat/app dev  # Start app only
pnpm --filter @bodyfat/web dev  # Start web only
```

## Shared Package (`@bodyfat/shared`)

Domain logic consumed by both app and web:

- `@bodyfat/shared/types` — Gender, MeasurementSystem, Formula, CalculationResult
- `@bodyfat/shared/formulas` — All 9 formula implementations + registry
- `@bodyfat/shared/definitions` — FormulaDefinition with fields, accuracy, references
- `@bodyfat/shared/conversions` — Unit conversion utilities
- `@bodyfat/shared/schemas` — Zod validation schemas

**Important:** The app's `src/schemas/calculator.ts` extends shared schemas with `.meta()` UI decorations (Zod prototype patch). Shared code must NOT call `.meta()`.

## Per-Package Details

See `packages/app/CLAUDE.md` and `packages/web/CLAUDE.md` for package-specific guidance.
