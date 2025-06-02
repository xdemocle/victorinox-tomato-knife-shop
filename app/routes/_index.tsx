import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ProductCard, colorVariants } from '~/components/ProductCard';

// Type definitions
type Currency = 'EUR' | 'USD';

// Constants for pricing
const BASE_PRICE = 9.5;
const DISCOUNT_PERCENTAGE = 0.4;

// List of developed countries (simplified for example)
const DEVELOPED_COUNTRIES = [
  'US',
  'CA', // North America
  'GB',
  'DE',
  'FR',
  'IT',
  'ES',
  'NL',
  'BE',
  'CH',
  'AT',
  'SE',
  'NO',
  'DK',
  'FI', // Europe
  'JP',
  'KR',
  'SG',
  'AU',
  'NZ', // Asia-Pacific
];

// Eurozone countries
const EUROZONE_COUNTRIES = [
  'DE',
  'FR',
  'IT',
  'ES',
  'NL',
  'BE',
  'AT',
  'FI',
  'IE',
  'PT',
  'GR',
  'SK',
  'LV',
  'LT',
  'EE',
  'SI',
  'LU',
  'MT',
  'CY',
];

// Loader type for better type inference
type LoaderData = {
  price: number;
  currency: Currency;
  locale: string;
  availableColor: string;
  isDiscounted: boolean;
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Get country from Cloudflare header (in production) or default to US for development
  const country = request.headers.get('CF-IPCountry') || 'US';

  // Determine if country gets discount
  const isDeveloped = DEVELOPED_COUNTRIES.includes(country);
  const price = isDeveloped
    ? BASE_PRICE
    : BASE_PRICE * (1 - DISCOUNT_PERCENTAGE);

  // Set currency based on country
  const currency = (
    EUROZONE_COUNTRIES.includes(country) ? 'EUR' : 'USD'
  ) as Currency;

  // Get user's locale from Accept-Language header or default to en-US
  const acceptLanguage = request.headers.get('Accept-Language') || 'en-US';
  const locale = acceptLanguage.split(',')[0] || 'en-US';

  // Select random available color
  const randomColor =
    colorVariants[Math.floor(Math.random() * colorVariants.length)].name;

  return json<LoaderData>({
    price,
    currency,
    locale,
    availableColor: randomColor,
    isDiscounted: !isDeveloped,
  });
}

export default function Index() {
  const { price, currency, locale, availableColor, isDiscounted } =
    useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <ProductCard
        availableColor={availableColor}
        price={price}
        currency={currency}
        isDiscounted={isDiscounted}
        locale={locale}
      />
    </main>
  );
}

// Meta tags for SEO
export function meta() {
  return [
    { title: 'Victorinox Tomato Knife - Premium Swiss Quality' },
    {
      name: 'description',
      content:
        'Experience the precision of Swiss craftsmanship with the Victorinox Tomato Knife. Perfect serration, ergonomic handle, and available in vibrant colors.',
    },
  ];
}
