# Pre Ride Plus — Vercel API + Stripe + Supabase

## What is inside
- `api/create-payment-intent.js` — Serverless function returning Stripe `clientSecret`.
- `api/stripe-webhook.js` — Stripe webhook receiver (uses raw body).
- `src/lib/supabaseClient.js` — Supabase browser client.

## Env Vars (Vercel → Project → Settings → Environment Variables)
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_CURRENCY=egp (optional)
- ALLOWED_ORIGIN=https://YOUR-DOMAIN (optional)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- (optional server-side) SUPABASE_SERVICE_ROLE_KEY

## Frontend usage
POST /api/create-payment-intent with `{ "amount": 150 }` (EGP). Use `clientSecret` with `stripe.confirmCardPayment`.
