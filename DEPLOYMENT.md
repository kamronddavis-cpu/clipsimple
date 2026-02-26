# ClipSimple Deployment Guide

## Pre-Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Supabase storage buckets created
- [ ] Google OAuth configured in Supabase
- [ ] Stripe account created
- [ ] Stripe product/price created
- [ ] All environment variables ready

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ClipSimple"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables

In Vercel project settings, add all variables from `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Deploy

Click "Deploy" - Vercel will build and deploy your app.

## Configure Stripe Webhooks

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy

## Configure Supabase Auth

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your Vercel URL to:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/auth/callback`

## Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `https://your-supabase-project.supabase.co/auth/v1/callback`
   - `https://your-domain.vercel.app/auth/callback`
4. Add Client ID and Secret to Supabase

## Post-Deployment

### Test Core Features

- [ ] User signup with email
- [ ] User login with Google
- [ ] Video upload
- [ ] Video editing (trim, crop, text, music)
- [ ] Video export
- [ ] Stripe checkout
- [ ] Subscription management

### Monitoring

Set up monitoring for:
- Error tracking (Sentry recommended)
- Analytics (Vercel Analytics or Google Analytics)
- Performance monitoring

### Custom Domain (Optional)

1. Go to Vercel project settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update Stripe webhook URL
6. Update Supabase redirect URLs

## Scaling Considerations

### Storage

Supabase Free tier includes:
- 1GB database storage
- 1GB file storage

For production:
- Upgrade to Supabase Pro for more storage
- Consider AWS S3 for video storage (requires code updates)

### Database

Monitor these metrics:
- Database connections
- Query performance
- Storage usage

Optimize with:
- Database indexes (already included in schema)
- Connection pooling
- Regular cleanup of old projects

### Video Processing

Current setup uses client-side FFmpeg. For scale:
- Consider server-side processing with AWS Lambda
- Use video processing services (Mux, Cloudinary)
- Implement queue system for exports

## Security Hardening

### Environment Variables

- Never commit `.env.local` to git
- Rotate secrets regularly
- Use different Stripe keys for dev/prod

### Rate Limiting

Add rate limiting to prevent abuse:
- Login attempts
- Video uploads
- API requests

Consider using Vercel Edge Config or Upstash Redis.

### CORS

Configure CORS headers in `next.config.js` if needed.

### Content Security Policy

Add CSP headers for additional security.

## Backup Strategy

### Database Backups

Supabase Pro includes:
- Daily backups
- Point-in-time recovery

### File Backups

Set up S3 bucket replication for:
- User videos
- Music files
- Thumbnails

## Monitoring & Alerts

### Set Up Alerts For:

- High error rates
- Failed payments
- Storage limits
- API rate limits

### Recommended Tools:

- Sentry (errors)
- Vercel Analytics (performance)
- Stripe Dashboard (payments)
- Supabase Dashboard (database)

## Maintenance

### Regular Tasks:

- Monitor and clean up old projects
- Review error logs
- Update dependencies monthly
- Check Stripe failed payments
- Monitor storage usage

### Update Process:

```bash
# Update dependencies
npm update

# Test locally
npm run dev

# Push to GitHub
git add .
git commit -m "Update dependencies"
git push

# Vercel auto-deploys on push
```

## Cost Estimation

### Monthly Costs (Estimated)

**Free tier (testing):**
- Vercel: $0
- Supabase: $0 (up to limits)
- Stripe: $0 (pay-as-you-go)
- **Total: $0/month**

**Production (small scale):**
- Vercel Pro: $20
- Supabase Pro: $25
- Stripe fees: ~2.9% + $0.30 per transaction
- **Total: ~$45-60/month** (before Stripe fees)

**Production (growing):**
- Vercel Team: $20/user
- Supabase Pro: $25
- Additional storage: variable
- **Total: ~$50-100/month** (before Stripe fees)

## Troubleshooting

### Common Issues:

**Build fails:**
- Check TypeScript errors: `npm run build`
- Verify all dependencies installed
- Check environment variables

**Authentication not working:**
- Verify Supabase URLs in environment
- Check redirect URLs configuration
- Test with different OAuth provider

**Videos not uploading:**
- Check Supabase storage policies
- Verify bucket permissions
- Check file size limits

**Stripe webhooks failing:**
- Verify webhook secret is correct
- Check webhook URL is accessible
- Review Stripe Dashboard logs

## Support

If you encounter issues:
1. Check logs in Vercel Dashboard
2. Check Supabase logs
3. Check Stripe webhook logs
4. Create GitHub issue with details

---

**Ready to launch!** 🚀
