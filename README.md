# Victorinox Tomato Knife E-commerce Shop

A modern, multilingual e-commerce application built with Remix.js and deployed on Cloudflare Workers.

## Features

- 🌍 **Geo-based Pricing**: Automatic 40% discount for developing countries
- 🎨 **Random Color Selection**: Special availability-based color system
- 🌐 **8 Languages**: EN, DE, FR, ES, JA, KO, ZH-CN, AR
- 💳 **Stripe Integration**: Card, Google Pay, Apple Pay
- ⚡ **Cloudflare Workers**: Global edge deployment
- 🎭 **Framer Motion**: Smooth animations

## Quick Start

1. Clone repository
2. Run `npm install`
3. Copy `.dev.vars.example` to `.dev.vars`
4. Add your Stripe keys
5. Run `npm run dev`

## Deployment

```bash
npm run deploy
```

## Environment Variables

- STRIPE_SECRET_KEY: Your Stripe secret key
- STRIPE_WEBHOOK_SECRET: Webhook endpoint secret

## Tech Stack

- Remix.js
- Cloudflare Workers
- Stripe
- Tailwind CSS
- Framer Motion
- TypeScript
