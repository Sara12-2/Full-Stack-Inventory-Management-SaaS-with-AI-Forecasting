# StockFlow — Frontend (v2)

Production-grade Next.js 14 dashboard: Tailwind CSS, Framer Motion, Recharts,
real light/dark mode, toast-based error handling, and a login-gated app flow.

## Setup
```
npm install
npm run dev
```
Open http://localhost:3000 — it redirects to `/login` first. After signing
in (any email/password works — auth is stubbed until the backend exists),
it redirects to `/dashboard` and stays there on refresh until you log out.

## What changed in this pass

1. **Consistent color system** — Indigo (`#4F46E5`) primary + Teal (`#0D9488`)
   accent, everything else neutral slate. Defined once in `tailwind.config.ts`.
2. **Real light/dark mode** — via `next-themes`, toggled from the navbar,
   persists across reloads, no flash on load.
3. **Icons only** — Lucide React throughout, no emoji anywhere.
4. **Font pairing** — Plus Jakarta Sans for headings, Inter for body text.
5. **Login-first flow** — `/` redirects to `/login` or `/dashboard` based on
   auth state; `/dashboard/*` is protected and bounces unauthenticated users
   back to `/login`.
6. **Toast notification system** (`components/providers/ToastProvider.tsx`)
   — theme-aware, replaces raw errors/alerts. Used for login, product
   save/delete, and data-fetch failures.
7. **Error boundaries** — `app/error.tsx` (route errors) and `app/not-found.tsx`
   (404) are both styled to match the app instead of showing a generic page.
8. **Animations** — page transitions, staggered card entrance, hover lift on
   cards/buttons, animated theme toggle icon, animated sidebar active-pill,
   floating gradient shapes on auth pages.

## Status of the redesign

**Fully on the new system (v2 tokens, dark mode, toasts):**
Sidebar, Navbar, Login, Signup, Dashboard, Products, shared components
(DataTable, SearchInput, ConfirmDialog), error/404 pages.

**Still on the earlier functional styling** (works, but not yet restyled
with the new tokens/dark mode): Inventory, Orders (+ detail), Suppliers,
Categories, Reports, Settings. Ask for these next — same design tokens
already exist, it's a styling pass, not a rebuild.

## Design tokens
See `tailwind.config.ts` — `primary`, `accent`, `success`/`warning`/`danger`,
`surface`/`card`/`border` each with a `-dark` counterpart for dark mode.
