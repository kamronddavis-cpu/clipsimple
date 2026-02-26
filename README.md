# ClipSimple - Beginner-Friendly Video Editing Platform

A modern, simple alternative to CapCut designed for beginners and small content creators. Edit videos for TikTok, Instagram Reels, and YouTube Shorts with ease.

## Features

### Core Features (MVP)
- ✅ User authentication (Email + Google OAuth)
- ✅ Project dashboard with grid/list view
- ✅ Drag-and-drop video upload
- ✅ Auto video orientation detection
- ✅ One-click 9:16 crop for TikTok/Reels
- ✅ Simple trim tool with start/end sliders
- ✅ Text overlay system (font, size, color, position)
- ✅ Music upload and volume control
- ✅ Export options: 720p (Free), 1080p (Pro)
- ✅ Watermark on free plan
- ✅ Stripe subscription system ($7/month Pro)
- ✅ Clean, minimalist dark UI
- ✅ Mobile responsive design

## Tech Stack

- **Frontend**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Authentication & Storage**: Supabase
- **Payments**: Stripe
- **State Management**: Zustand
- **Video Processing**: FFmpeg (browser-based)
- **File Upload**: react-dropzone
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
clipsimple/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx           # Landing page
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/         # User dashboard
│   │   └── editor/            # Video editor
│   │       ├── new/           # Upload new video
│   │       └── [id]/          # Edit existing project
│   ├── components/            # React components
│   │   ├── editor/           # Editor components
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── TrimControls.tsx
│   │   │   ├── CropControls.tsx
│   │   │   ├── TextOverlayControls.tsx
│   │   │   ├── MusicControls.tsx
│   │   │   └── ExportModal.tsx
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utilities and config
│   │   ├── supabase.ts      # Supabase client
│   │   └── stripe.ts        # Stripe helpers
│   ├── store/               # State management
│   │   └── editorStore.ts   # Editor state (Zustand)
│   └── types/               # TypeScript types
│       └── index.ts
├── public/                  # Static assets
├── supabase-schema.sql     # Database schema
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### 1. Clone and Install

```bash
cd clipsimple
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Enable Google OAuth:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your OAuth credentials

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product for "ClipSimple Pro" at $7/month
3. Get your API keys from the Stripe dashboard
4. Copy the Price ID for your Pro subscription

### 4. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=your_stripe_pro_price_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### For Users

1. **Sign Up**: Create account with email or Google
2. **Upload Video**: Click "New Project" and drag-drop your video
3. **Edit**:
   - **Trim**: Adjust start/end sliders
   - **Crop**: Select 9:16 for vertical, 16:9 for landscape
   - **Text**: Add text overlays with custom styling
   - **Music**: Upload background music and adjust volume
4. **Export**: Choose quality (720p free, 1080p Pro) and download

### For Free Users
- Unlimited projects
- 720p export quality
- Watermark on exports
- Basic editing tools

### For Pro Users ($7/month)
- Everything in Free
- 1080p HD exports
- No watermark
- Priority processing
- Auto captions (coming soon)

## Key Design Decisions

### Why Simple?

ClipSimple is intentionally simple to avoid overwhelming beginners:

- **No complex timeline**: Just trim sliders
- **Large, clear buttons**: Easy to tap on mobile
- **Limited, focused features**: 10 features done perfectly > 100 mediocre ones
- **Immediate feedback**: See changes in real-time
- **Minimal clutter**: Clean dark UI with good contrast

### Browser-Based Video Processing

Uses FFmpeg compiled to WebAssembly for client-side processing:
- No server costs for video processing
- Instant preview
- Privacy-friendly (videos never leave user's device until upload)

## Development

### Build for Production

```bash
npm run build
npm start
```

### Deployment

This app is designed to be deployed on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Future Features (Phase 2)

- [ ] Auto gaming clip detection
- [ ] Twitch clip importer
- [ ] AI thumbnail generator
- [ ] Template marketplace
- [ ] Auto-caption generation (AI)
- [ ] Advanced transitions
- [ ] Multi-track timeline
- [ ] Collaboration features

## Database Schema

### Users Table
```sql
- id (UUID, primary key)
- email (text)
- full_name (text)
- subscription_tier ('free' | 'pro')
- stripe_customer_id (text)
- created_at (timestamp)
```

### Projects Table
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key)
- name (text)
- video_url (text)
- status ('draft' | 'processing' | 'completed')
- settings (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

## API Routes

All API routes use Next.js API routes:

- `/api/auth/*` - Supabase Auth (handled automatically)
- `/api/stripe/checkout` - Create Stripe checkout session
- `/api/stripe/portal` - Create billing portal session
- `/api/stripe/webhook` - Handle Stripe webhooks

## Contributing

This is a production-ready MVP. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for your own projects

## Support

For issues or questions:
- GitHub Issues: [Create an issue](#)
- Email: support@clipsimple.com
- Discord: [Join our community](#)

## Credits

Built with ❤️ for content creators who want simple, fast video editing.

---

**Remember**: You don't need 100 features. You need 10 features done perfectly. 🚀
