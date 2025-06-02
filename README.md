# Victorinox Tomato Knife E-commerce Shop

A modern, multilingual e-commerce application built with Remix.js for selling the Victorinox Tomato Knife with intelligent geo-based pricing and random color availability system.

## 🚀 Quick Start for Windsurf AI IDE

### Prerequisites

- Node.js 18+
- npm or yarn
- Windsurf AI IDE (former Codeium)
- Stripe account

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Stripe keys

# 3. Start development server
npm run dev

# 4. Open in Windsurf AI
# The project is now ready for AI-assisted development
```

## 🌟 Features

### Core Functionality

- **Single Product Focus**: Victorinox Tomato Knife at €9.50/USD 9.50
- **Random Color System**: Customers receive random colors based on "availability"
- **Geo-based Pricing**: 40% automatic discount for developing countries
- **Multi-language Support**: 8 languages (EN, DE, FR, ES, JA, KO, ZH-CN, AR)
- **Stripe Integration**: Full checkout with Card, Google Pay, Apple Pay
- **Cloudflare Workers**: Global edge deployment

### Technical Features

- **Framework**: Latest Remix.js with TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **Animations**: Framer Motion for smooth interactions
- **SEO Optimized**: Meta tags, structured data, sitemap ready
- **PWA Ready**: Service worker and manifest included

## 🎨 Visual Design

The application features a vibrant, colorful design inspired by the Victorinox knife color variants:

- **Black (#1f2937)** - Classic and professional
- **Blue (#1e40af)** - Trust and reliability
- **Pink (#ec4899)** - Modern and playful
- **Yellow (#eab308)** - Energy and optimism
- **Green (#16a34a)** - Fresh and natural
- **Orange (#ea580c)** - Creativity and enthusiasm

## 🗂️ Project Structure

```typescript
victorinox-tomato-knife/
├── docs/                     # Documentation
│   ├── README.md            # This file
│   ├── ARCHITECTURE.md      # Technical architecture
│   ├── WINDSURF-GUIDE.md    # Windsurf AI specific guide
│   └── API-REFERENCE.md     # API and integration docs
├── app/                     # Remix application
│   ├── components/          # React components
│   ├── routes/             # Route handlers and pages
│   ├── utils/              # Utility functions
│   └── styles/             # CSS and styling
├── public/                 # Static assets
│   └── images/            # Product images (17 placeholders)
├── server.ts              # Cloudflare Workers entry
└── package.json           # Dependencies and scripts
```

## 🌍 Geographic Pricing Logic

### Developed Countries (Full Price)

- **North America**: US, Canada
- **Europe**: Western and Northern Europe
- **Asia-Pacific**: Japan, South Korea, Singapore, Australia, New Zealand

### Developing Countries (40% Discount)

- **Asia**: China, India, Southeast Asia, Central Asia
- **Africa**: All African countries
- **South America**: All South American countries
- **Middle East**: All Middle Eastern countries
- **Europe**: Eastern Europe (Poland, Romania, etc.)

### Currency Logic

- **EUR**: Eurozone countries
- **USD**: All other countries

## 🎯 Random Availability System

Each visitor sees one randomly selected color as "available today":

- Creates urgency and exclusivity
- Simplifies inventory management
- Enhances perceived value
- Drives immediate purchasing decisions

## 💳 Payment Integration

### Stripe Checkout Features

- **Payment Methods**: Card, Google Pay, Apple Pay
- **Security**: 3D Secure authentication when required
- **Global**: Multi-currency support (EUR/USD)
- **Compliance**: PCI DSS compliant via Stripe
- **Tax**: Automatic tax calculation
- **Addresses**: Shipping and billing collection

### Webhook Handling

- Order confirmation and fulfillment
- Payment failure notifications
- Inventory updates (when implemented)
- Email notifications (ready for integration)

## 🌐 Internationalization

### Supported Languages

1. **English** (en) - Primary language
2. **German** (de) - DACH market
3. **French** (fr) - French market
4. **Spanish** (es) - Spanish/Latin American market
5. **Japanese** (ja) - Japanese market
6. **Korean** (ko) - Korean market
7. **Chinese Simplified** (zh-CN) - Chinese market
8. **Arabic** (ar) - Middle Eastern market

### Translation System

- Key-based translation structure
- Automatic language detection via Accept-Language header
- Manual language switching via UI selector
- RTL support for Arabic

## 🚀 Development Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run dev:debug        # Dev server with debugging enabled

# Building
npm run build           # Build for production
npm run typecheck       # TypeScript type checking
npm run lint           # ESLint code linting

# Testing
npm run test           # Run test suite
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Deployment
npm run deploy         # Deploy to Cloudflare Pages
npm run deploy:staging # Deploy to staging environment
```

## 🔧 Environment Variables

Create `.env` file with these variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NODE_ENV=development # or production
APP_URL=http://localhost:3000 # Your domain for production

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://...

# Optional: Email (for order notifications)
SENDGRID_API_KEY=SG...
FROM_EMAIL=orders@yourdomain.com
```

## 🎭 Windsurf AI Integration

This project is optimized for AI-assisted development with Windsurf AI:

### AI-Friendly Code Structure

- Clear component separation
- Extensive TypeScript types
- Descriptive function and variable names
- Comprehensive comments for complex logic

### Recommended AI Prompts

- "Add a new payment method to the checkout"
- "Implement email notifications for orders"
- "Create a product review system"
- "Add inventory management"
- "Optimize images for better performance"

### AI Development Workflow

1. Use Claude Sonnet 4 for architectural decisions
2. Let AI generate component boilerplate
3. Use AI for debugging and optimization
4. AI-assisted testing and documentation

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Key Responsive Features

- Mobile-first design approach
- Touch-friendly buttons and navigation
- Optimized image loading per device
- Adaptive typography and spacing

## 🔒 Security

### Payment Security

- No card data stored locally
- Stripe handles PCI compliance
- Webhook signature verification
- HTTPS enforced for all transactions

### Application Security

- Input validation and sanitization
- CSRF protection via Remix
- Secure session management
- Environment variable protection

## 📈 Performance

### Optimization Features

- Code splitting by routes
- Image lazy loading
- CDN delivery via Cloudflare
- Edge computing for global speed
- Minimal JavaScript bundle

### Core Web Vitals Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🐛 Debugging

### Common Issues

1. **Stripe webhook verification failed**

   - Check webhook secret in environment
   - Verify webhook URL accessibility

2. **Payment methods not showing**

   - Confirm Stripe Dashboard configuration
   - Check browser compatibility

3. **Language not switching**
   - Verify translation keys exist
   - Check Accept-Language header

### Debug Tools

```bash
# Stripe CLI for webhook testing
stripe listen --forward-to localhost:3000/api/stripe-webhook

# Cloudflare Wrangler for local Workers
wrangler pages dev ./build/client

# Network debugging
npm run dev -- --verbose
```

## 🚀 Deployment

### Cloudflare Pages Deployment

1. Build the application: `npm run build`
2. Deploy: `npm run deploy`
3. Configure environment variables in Cloudflare Dashboard
4. Set up custom domain (optional)

### Production Checklist

- [ ] Stripe keys updated to live mode
- [ ] Environment variables configured
- [ ] Domain configured and SSL enabled
- [ ] Webhook endpoints updated
- [ ] Analytics configured
- [ ] Error monitoring setup

## 📚 Additional Resources

- [Remix Documentation](https://remix.run/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/checkout)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🤝 Contributing

This project is set up for AI-assisted development. When making changes:

1. Use descriptive commit messages
2. Update relevant documentation
3. Test payment flows in Stripe test mode
4. Verify responsive design
5. Check accessibility compliance

## 📄 License

This project is proprietary. All rights reserved.

---

Built with ❤️ using Windsurf AI and Claude Sonnet 4
