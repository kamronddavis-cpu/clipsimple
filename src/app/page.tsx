'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Sparkles,
  Scissors,
  Type,
  Music,
  Download,
  Check,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'No waiting. Edit and export in minutes, not hours.',
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Simple Trim Tool',
      description: 'Just drag the sliders. No complex timeline needed.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'One-Click 9:16',
      description: 'Perfect vertical crops for TikTok and Reels instantly.',
    },
    {
      icon: <Type className="w-8 h-8" />,
      title: 'Easy Text & Captions',
      description: 'Add text overlays or auto-generate captions with AI.',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Music & Audio',
      description: 'Upload background music and control volume easily.',
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Quick Export',
      description: 'Download in 720p or 1080p (Pro) in seconds.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Unlimited projects',
        'Basic editing tools',
        '720p export quality',
        'Watermark on exports',
        '5 templates',
      ],
    },
    {
      name: 'Pro',
      price: '$7',
      period: '/month',
      popular: true,
      features: [
        'Everything in Free',
        '1080p HD exports',
        'No watermark',
        'Auto captions (AI)',
        'Priority processing',
        'All templates',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-dark-border backdrop-blur-sm fixed top-0 w-full z-50 bg-dark-bg/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ClipSimple</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </a>
              <Link
                href="/auth/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-dark-card border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">
              Video editing made simple
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Edit Videos Like a Pro
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Without Being One
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-up">
            No complex timelines. No overwhelming features. Just simple,
            beautiful video editing for TikTok, Reels, and Shorts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link href="/auth/signup" className="btn-primary text-lg px-8">
              Start Editing Free
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <button className="btn-secondary text-lg px-8">
              Watch Demo
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            No credit card required • Free forever plan
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need. Nothing You Don't.
            </h2>
            <p className="text-xl text-gray-400">
              Powerful tools, simplified for beginners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card relative ${
                  plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-hover text-white'
                      : 'bg-dark-hover hover:bg-dark-border text-white'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Upgrade to Pro'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Simplify Your Editing?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of creators making amazing content with ClipSimple.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg px-8 inline-flex items-center">
            Start Editing Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ClipSimple</span>
              </div>
              <p className="text-gray-400 text-sm">
                Simple video editing for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-dark-border text-center text-gray-400 text-sm">
            <p>&copy; 2024 ClipSimple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
