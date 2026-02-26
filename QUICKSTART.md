# ClipSimple Quick Start Guide

Get ClipSimple running locally in 10 minutes.

## Step 1: Install Dependencies (2 min)

```bash
cd clipsimple
npm install
```

## Step 2: Set Up Supabase (3 min)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in project details and wait for setup
4. Once ready, go to **SQL Editor**
5. Copy the entire contents of `supabase-schema.sql`
6. Paste and click "Run"
7. Go to **Storage** and verify buckets were created (videos, music, thumbnails)

## Step 3: Get Supabase Keys (1 min)

1. Go to **Project Settings** > **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (click reveal) → `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Set Up Environment (1 min)

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Leave Stripe keys empty for now (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Enable Google OAuth (2 min) - Optional

1. In Supabase, go to **Authentication** > **Providers**
2. Find **Google** and toggle it on
3. You'll need Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase

**Skip this if you just want to test with email auth!**

## Step 6: Run the App (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## You're Done! 🎉

### Test the App:

1. **Sign up** with email and password
2. **Create a new project** and upload a video
3. **Edit** using trim, crop, text overlays
4. **Export** your video (simulated for now)

### Without Stripe (Free tier only):

The app works perfectly without Stripe! You just won't be able to:
- Test Pro subscription
- Process payments

All editing features work fine.

## Optional: Add Stripe (5 min)

If you want to test the Pro subscription:

1. Create [Stripe account](https://stripe.com)
2. Get test API keys from Dashboard
3. Create a product "ClipSimple Pro" at $7/month
4. Copy the Price ID
5. Add all Stripe keys to `.env.local`
6. Restart dev server

## Troubleshooting

### "Connection refused" error:
- Make sure Supabase URL is correct
- Check if your IP is allowed in Supabase (should be by default)

### "Invalid API key":
- Double-check you copied the correct keys
- Make sure there are no extra spaces

### Video upload fails:
- Check Supabase Storage policies in `supabase-schema.sql`
- Verify buckets exist

### Build errors:
- Run `npm install` again
- Delete `node_modules` and `.next`, then `npm install`

## Next Steps

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` for production deployment
- Explore the code in `src/` directory
- Customize the UI colors in `tailwind.config.ts`

## Need Help?

- Check the console for error messages
- Review Supabase logs in dashboard
- Open a GitHub issue with your error

---

**Happy coding!** 🚀
