---
name: son-of-juliet
description: Skill for developing and maintaining SON OF JULIET (SOJ) — a product-admin and checkout system built with Next.js 16 App Router, Supabase, Paystack, and Crypto payments. Use when working on product management, checkout flows, payment integrations, analytics, admin UI, or any SOJ codebase changes.
---

# SON OF JULIET (SOJ) — Development Skill

## Project Overview

SOJ is a product-admin + checkout system for a creative/music project. It uses:

- **Next.js 16** (App Router, Turbopack)
- **Supabase** (database, auth, RLS)
- **Paystack** (bank payments, NGN conversion)
- **Crypto** (USDT/USDC on Base/Solana)
- **TypeScript** strict mode
- **Tailwind CSS 4** with custom theme tokens

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── page.tsx                          # Public home — product listing
│   ├── globals.css                       # Dark theme (public pages)
│   ├── layout.tsx                        # Root layout
│   ├── record/[slug]/page.tsx            # Checkout page per product
│   ├── confirmation/                     # Post-purchase success
│   ├── error/                            # Payment error
│   ├── admin/
│   │   ├── login/page.tsx                # Auth (email/password)
│   │   ├── layout.tsx                    # Warm grey admin wrapper
│   │   ├── page.tsx                      # Product list
│   │   ├── new/page.tsx                  # Create product
│   │   ├── edit/[slug]/page.tsx          # Edit product
│   │   ├── dashboard/page.tsx            # Analytics dashboard
│   │   └── actions.ts                    # Server actions (CRUD)
│   └── api/
│       ├── payment/paystack/route.ts     # Initialize Paystack
│       ├── payment/paystack/callback/    # Verify + redirect
│       └── payment/crypto/route.ts       # Generate crypto ref
├── components/
│   ├── AdminHeader.tsx                   # Nav: Products, Analytics, Sign out
│   ├── AdminProductForm.tsx              # Shared create/edit form
│   ├── PaymentMethodSelector.tsx         # Bank vs Crypto selector
│   ├── ProductList.tsx                   # Public product grid
│   └── ProductListItem.tsx               # Single product link
├── lib/
│   ├── supabase/client.ts                # Browser client
│   ├── supabase/server.ts                # Server client (cookies)
│   ├── supabase/admin.ts                 # Service role (bypasses RLS)
│   ├── types.ts                          # Product, Sale, Analytics types
│   ├── queries.ts                        # getAllProducts, getProductBySlug
│   ├── analytics.ts                      # Dashboard queries
│   ├── sales.ts                          # recordSale, updateSaleStatus
│   ├── currency.ts                       # Geo-detect + exchange rates
│   ├── payment.ts                        # Client-side payment submission
│   ├── utils.ts                          # formatPriceUSD, slugify, etc.
│   └── constants.ts                      # Labels, RETURN_URL
└── middleware.ts                          # Protects /admin/* routes
```

### Database (Supabase)

**products** table:
- id (uuid), slug (text unique), name, price (integer — USD cents), status (available|preorder|sold|archived), date, description, image_url, created_at, updated_at
- RLS: public read, authenticated write

**sales** table:
- id (uuid), product_slug (FK → products.slug), amount_usd (integer — cents), amount_local (numeric), currency, payment_method (bank|crypto), status (confirmed|pending|failed), reference (unique), email, purchased_at
- RLS: authenticated read/update, open insert (for API routes via service role)

SQL files: `supabase/schema.sql`, `supabase/sales.sql`

## Design Rules

### Public Pages (Dark Theme)
- Background: `#0a0a0a`, Text: `#d4d4d4`, Muted: `#737373`, Border: `#262626`
- Font: Courier New, monospace
- Max width: 640px, centered
- No icons. Plain text labels only.
- All "return" links → `https://sonofjuliet.cargo.site`

### Admin Pages (Warm Grey Theme)
- Background: `#f0eeeb`, Text: `#333`, Muted: `#8a8a8a`, Border: `#d0d0d0`
- Inputs: white `#fff` background
- Buttons: dark `#333` bg with `#f0eeeb` text
- Same monospace typography, narrow centered layout

### General UI Philosophy
- Monospace, procedural, text-first
- Literal and factual numeric displays
- No decorative elements, no icons
- Tables use plain text, minimal borders
- Uppercase labels with letter-spacing

## Currency System

- Admin enters prices in **USD cents**
- Checkout auto-detects user's country via headers (`x-vercel-ip-country`, `cf-ipcountry`)
- Live exchange rates from exchangerate-api.com (1hr cache, fallback rates)
- Paystack converts USD → NGN server-side
- Display shows both USD and local equivalent

## Payment Flows

### Paystack (Bank)
1. User enters email → POST `/api/payment/paystack`
2. Server converts USD → NGN, initializes Paystack transaction
3. Records pending sale in `sales` table
4. Redirects to Paystack checkout
5. Callback verifies with Paystack API, updates sale status → confirmed/failed
6. Redirects to `/confirmation` or `/error`

### Crypto
1. User clicks crypto → POST `/api/payment/crypto`
2. Server generates reference, records pending sale
3. Returns wallet addresses (Base USDT, Solana USDC)
4. User sends manually; admin confirms in dashboard

## Key Patterns

- **Server components** for all data-fetching pages (admin list, dashboard, checkout)
- **Client components** only for interactive forms (login, product form, payment selector)
- **Server actions** for admin CRUD (`createProduct`, `updateProduct`)
- **Service role client** (`admin.ts`) for API routes that need to bypass RLS
- **Middleware** protects all `/admin/*` except `/admin/login`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
CRYPTO_WALLET_BASE=
CRYPTO_WALLET_SOLANA=
```

## Common Tasks

### Add a new admin page
1. Create `src/app/admin/[page-name]/page.tsx` as a server component
2. Use `createClient()` from `@/lib/supabase/server` for data
3. Add nav link in `AdminHeader.tsx`
4. Use warm grey color tokens

### Add a new API route
1. Create `src/app/api/[route]/route.ts`
2. Use `createAdminClient()` from `@/lib/supabase/admin` to bypass RLS
3. Record sales via `recordSale()` from `@/lib/sales`

### Modify product schema
1. Update `supabase/schema.sql`
2. Update `src/lib/types.ts` (Product interface)
3. Update `src/lib/queries.ts`
4. Update `AdminProductForm.tsx`
5. Update admin `actions.ts`

### Deploy
- GitHub repo: `https://github.com/andex23/SOJ`
- Branch: `main`
- `npm run build` before pushing
- Never include co-author tags in commits
