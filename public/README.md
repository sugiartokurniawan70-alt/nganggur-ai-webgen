# Nganggur Aja Bisa - All-in-One AI Generator (Vercel-ready)

Theme: Modern Neumorphism (Light)
Brand: Nganggur Aja Bisa
Slogan: Semua akan Nganggur Pada waktunya
WhatsApp CTA: +6282240003131

## What is included
- Minimal Next.js (App Router) project
- Client UI with placeholder serverless API
- History (LocalStorage), copy caption, download
- Placeholder image in public/images

## How to deploy
1. Upload contents (extract ZIP) to GitHub repo root so it contains `app/`, `package.json`, `next.config.mjs`
2. Import repo to Vercel and deploy (Vercel will install dependencies)
3. To enable real AI, add `OPENAI_API_KEY` / `REPLICATE_API_KEY` in Vercel env vars and integrate in `app/api/generate/route.js`
