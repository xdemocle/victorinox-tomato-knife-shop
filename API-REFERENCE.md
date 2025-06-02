# API Reference Documentation

## 🔌 API Overview

This document provides comprehensive API references for the Victorinox Tomato Knife e-commerce application, including Remix.js routes, Stripe integration, and external service configurations.

## 📋 Table of Contents

1. [Remix Routes](#-remix-routes)
2. [Stripe API Integration](#-stripe-api-integration)
3. [Geolocation API](#-geolocation-api)
4. [Internationalization API](#-internationalization-api)
5. [Webhook Endpoints](#-webhook-endpoints)
6. [Error Handling](#-error-handling)
7. [Type Definitions](#-type-definitions)

## 🔐 Remix Routes

<!-- ## 💳 Stripe API Integration -->

### Landing Page Route

**File**: `app/routes/_index.tsx`
**URL**: `/`
**Method**: `GET`

#### Loader Function

```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const country = request.headers.get('X-User-Country') || 'US';
  const acceptLanguage = request.headers.get('Accept-Language') || 'en';
  const detectedLang = acceptLanguage.split(',')[0].substring(0, 2);
  const pricing = getPricing(country);
  
  return {
    country,
    language: detectedLang,
    pricing,
  };
}
```

#### Response Schema

```typescript
interface IndexLoaderData {
  country: string;           // ISO country code (e.g., 'US', 'DE')
  language: string;          // Language code (e.g., 'en', 'de')
  pricing: PricingData;      // Calculated pricing information
}
```

#### Meta Function

```typescript
export const meta: MetaFunction = () => [
  { title: "Victorinox Tomato Knife - Professional Kitchen Tool" },
  { name: "description", content: "Premium Victorinox tomato knife..." },
  { property: "og:title", content: "Victorinox Tomato Knife" },
  { property: "og:type", content: "product" },
];
```

### Checkout Route

**File**: `app/routes/checkout.tsx`
**URL**: `/checkout`
**Methods**: `GET`, `POST`

#### Action Function (POST)

```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productData = JSON.parse(formData.get('product') as string);
  
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: productData.currency.toLowerCase(),
        product_data: {
          name: productData.name,
          images: ['/images/tomato-knife-hero.jpg'],
        },
        unit_amount: Math.round(productData.price * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    shipping_address_collection: {
      allowed_countries: getAllowedCountries(),
    },
    billing_address_collection: 'required',
  });

  return Response.redirect(session.url);
}
```

#### Request Body Schema

```typescript
interface CheckoutRequest {
  product: {
    name: string;
    price: number;
    currency: 'EUR' | 'USD';
    country: string;
    language: string;
  };
}
```

### Success Route

**File**: `app/routes/success.tsx`
**URL**: `/success`
**Method**: `GET`

#### Query Parameters

- `session_id` (required): Stripe checkout session ID

#### Loader Function Success

```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');
  
  if (sessionId) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return {
      session: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
        payment_status: session.payment_status
      }
    };
  }
  
  return { session: null };
}
```

## 💳 Stripe API Integration

### Stripe Configuration

```typescript
// Environment Variables Required
STRIPE_SECRET_KEY=sk_test_... // or sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_test_... // or pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Checkout Session Creation

```typescript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  payment_method_options: {
    card: {
      request_three_d_secure: 'automatic',
    },
  },
  line_items: [{
    price_data: {
      currency: 'eur', // or 'usd'
      product_data: {
        name: 'Victorinox Tomato Knife',
        description: 'Professional serrated knife for tomatoes',
        images: ['/images/tomato-knife-hero.jpg'],
      },
      unit_amount: 950, // €9.50 in cents
    },
    quantity: 1,
  }],
  mode: 'payment',
  automatic_tax: { enabled: true },
  shipping_address_collection: {
    allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', /* ... */],
  },
  billing_address_collection: 'required',
  success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yourdomain.com/',
});
```

### Supported Payment Methods

1. **Credit/Debit Cards**
   - Visa, Mastercard, American Express, Discover
   - 3D Secure authentication when required

2. **Google Pay**
   - Automatic detection on supported browsers
   - One-click checkout experience

3. **Apple Pay**
   - Safari on iOS/macOS with Touch ID/Face ID
   - Secure biometric authentication

### Webhook Event Types

- `checkout.session.completed`: Payment successful
- `payment_intent.payment_failed`: Payment failed
- `customer.created`: New customer (future use)

## 🌍 Geolocation API

### Country Detection

```typescript
// Cloudflare Workers automatically provides geolocation
const country = request.cf?.country || 'US';

// Available in request headers after middleware
const country = request.headers.get('X-User-Country') || 'US';
```

### Country Classification

```typescript
interface CountryClassification {
  continent: string;
  developed: boolean;
  currency: 'EUR' | 'USD';
  discountApplicable: boolean;
}

function classifyCountry(countryCode: string): CountryClassification {
  // Implementation in utils/countries.ts
}
```

### Pricing Calculation API

```typescript
interface PricingCalculation {
  originalPrice: number;
  finalPrice: number;
  currency: 'EUR' | 'USD';
  hasDiscount: boolean;
  discountPercentage: number;
  country: string;
}

function getPricing(country: string): PricingCalculation {
  const isEurozone = EUROZONE_COUNTRIES.includes(country);
  const isDeveloped = isDevelopedCountry(country);
  
  const basePriceEUR = 9.50;
  const basePriceUSD = 9.50;
  
  const basePrice = isEurozone ? basePriceEUR : basePriceUSD;
  const currency = isEurozone ? 'EUR' : 'USD';
  const finalPrice = isDeveloped ? basePrice : basePrice * 0.6; // 40% discount
  
  return {
    originalPrice: basePrice,
    finalPrice,
    currency,
    hasDiscount: !isDeveloped,
    discountPercentage: isDeveloped ? 0 : 40,
    country
  };
}
```

## 🌐 Internationalization API

### Supported Languages

```typescript
type SupportedLanguage = 'en' | 'de' | 'fr' | 'es' | 'ja' | 'ko' | 'zh-CN' | 'ar';

interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  flag: string;
  rtl: boolean;
}

const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'es', name: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'ja', name: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ko', name: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
];
```

### Translation API

```typescript
interface TranslationKey {
  product: {
    name: string;
    description: string;
    features: string[];
    buyNow: string;
    randomAvailability: string;
    availableColor: string;
  };
  pricing: {
    originalPrice: string;
    specialPrice: string;
    discount: string;
    currency: string;
  };
  checkout: {
    shipping: string;
    billing: string;
    paymentMethods: string;
    placeOrder: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
  };
}

function getTranslation(language: string, key: string): string {
  const langCode = language in translations ? language : 'en';
  const keys = key.split('.');
  let value = translations[langCode];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
```

### Language Detection Flow

1. Check URL parameter: `?lang=en`
2. Read `Accept-Language` header
3. Fallback to English (`en`)
4. Store preference in localStorage (client-side)

## 📡 Webhook Endpoints

### Stripe Webhook Handler

**File**: `app/routes/api.stripe-webhook.tsx`
**URL**: `/api/stripe-webhook`
**Method**: `POST`

#### Implementation

```typescript
export async function action({ request }: ActionFunctionArgs) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed:', err.message);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleSuccessfulPayment(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handleFailedPayment(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response('Success', { status: 200 });
}
```

#### Webhook Security

- **Signature Verification**: Required for all webhook events
- **Idempotency**: Handle duplicate events gracefully
- **Error Handling**: Return appropriate HTTP status codes

#### Event Handlers

```typescript
async function handleSuccessfulPayment(session: any) {
  // 1. Log successful order
  console.log('Order completed:', session.id);
  
  // 2. Send confirmation email (future implementation)
  // await sendOrderConfirmation(session.customer_details.email);
  
  // 3. Update inventory (future implementation)
  // await updateInventory(session.line_items);
  
  // 4. Notify fulfillment (future implementation)
  // await notifyFulfillmentCenter(session);
}

async function handleFailedPayment(paymentIntent: any) {
  console.log('Payment failed:', paymentIntent.id);
  // Handle failed payment logic
}
```

## ❌ Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  error: {
    type: string;
    message: string;
    code?: string;
    details?: any;
  };
  timestamp: string;
  requestId: string;
}
```

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (invalid API keys)
- `404`: Not Found (invalid route)
- `500`: Internal Server Error
- `503`: Service Unavailable (maintenance)

### Error Types

```typescript
enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  PAYMENT_ERROR = 'payment_error',
  GEOLOCATION_ERROR = 'geolocation_error',
  TRANSLATION_ERROR = 'translation_error',
  WEBHOOK_ERROR = 'webhook_error',
  INTERNAL_ERROR = 'internal_error'
}
```

### Error Handling Examples

```typescript
// Validation Error
if (!productData.price || productData.price <= 0) {
  throw new Response(JSON.stringify({
    error: {
      type: 'validation_error',
      message: 'Product price must be greater than 0'
    }
  }), { status: 400 });
}

// Payment Error
try {
  const session = await stripe.checkout.sessions.create(sessionData);
} catch (error) {
  throw new Response(JSON.stringify({
    error: {
      type: 'payment_error',
      message: 'Failed to create checkout session',
      details: error.message
    }
  }), { status: 500 });
}
```

## 📚 Type Definitions

### Core Types

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: {
    EUR: number;
    USD: number;
  };
  features: string[];
  images: string[];
  colors: ColorOption[];
}

interface ColorOption {
  name: string;
  color: string;
  available: boolean;
}

interface PricingData {
  originalPrice: number;
  finalPrice: number;
  currency: 'EUR' | 'USD';
  hasDiscount: boolean;
  discountPercentage: number;
  country: string;
}

interface CustomerData {
  email?: string;
  name?: string;
  address?: Address;
}

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

interface Order {
  sessionId: string;
  product: Product;
  pricing: PricingData;
  customer: CustomerData;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}
```

### Stripe Types

```typescript
interface StripeSession {
  id: string;
  amount_total: number;
  currency: string;
  customer_details: {
    email: string;
    name: string;
  };
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  shipping_details?: {
    address: Address;
    name: string;
  };
}

interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}
```

### Cloudflare Types

```typescript
interface CloudflareRequest {
  cf: {
    country: string;
    city: string;
    region: string;
    timezone: string;
  };
}

interface Environment {
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NODE_ENV: 'development' | 'production';
  APP_URL: string;
}
```

## 🧪 Testing API Endpoints

### Test Data

```typescript
// Test Countries
const TEST_COUNTRIES = {
  DEVELOPED: ['US', 'DE', 'GB', 'FR'],
  DEVELOPING: ['IN', 'BR', 'NG', 'PK']
};

// Test Stripe Cards
const TEST_CARDS = {
  SUCCESS: '4242424242424242',
  DECLINE: '4000000000000002',
  REQUIRE_AUTH: '4000002500003155'
};
```

### Example Test Requests

```bash
# Test landing page
curl -H "X-User-Country: DE" http://localhost:3000/

# Test checkout (requires valid session)
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "product=%7B%22name%22%3A%22Victorinox%20Tomato%20Knife%22%7D"

# Test webhook (requires valid signature)
curl -X POST http://localhost:3000/api/stripe-webhook \
  -H "Stripe-Signature: t=..." \
  -d '{"type":"checkout.session.completed"}'
```

## 📊 Rate Limits & Performance

### Stripe API Limits

- **Test Mode**: 100 requests per second
- **Live Mode**: Higher limits based on account history
- **Webhook Retries**: Automatic with exponential backoff

### Cloudflare Workers Limits

- **CPU Time**: 50ms per request (can be increased)
- **Memory**: 128MB per request
- **Request Size**: 100MB maximum
- **Response Size**: 100MB maximum

### Performance Optimization

- Use Cloudflare caching for static assets
- Implement request deduplication
- Optimize database queries (when implemented)
- Use connection pooling for external APIs

---

This API reference provides comprehensive documentation for all integration points in the Victorinox Tomato Knife e-commerce application. Use this as a reference for development, testing, and maintenance activities.
