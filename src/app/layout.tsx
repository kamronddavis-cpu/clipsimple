import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ClipSimple - Beginner-Friendly Video Editing',
  description: 'Simple video editing for TikTok, Instagram Reels, and YouTube Shorts. No complex timeline, just easy editing.',
  keywords: ['video editor', 'tiktok', 'reels', 'shorts', 'video editing', 'simple', 'beginner'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
