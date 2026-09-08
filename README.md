# Son of Juliet

An editorial storefront for Son of Juliet, with individual product records and an administrator workspace for managing the collection.

## What is in this repository

- Product listings and individual pages at `/record/[slug]`.
- Availability states for available, preorder, sold, and archived pieces.
- Administrator routes for creating and editing products.
- Supabase data storage and authentication.
- Paystack and cryptocurrency payment routes, plus confirmation pages.

## Built with

Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Supabase.

## Run locally

```bash
git clone https://github.com/andex23/SOJ.git
cd SOJ
npm install
cp .env.example .env.local
```

Fill in your development Supabase values and apply [supabase/schema.sql](supabase/schema.sql). Configure payment values from `.env.example` only for the methods you intend to test.

```bash
npm run dev
npm run build
```

The default development address is [localhost:3000](http://localhost:3000).

## Code map

- `src/app/`: storefront, product records, administrator pages, and API routes.
- `src/lib/`: product types and data queries.
- `supabase/`: database schema.

