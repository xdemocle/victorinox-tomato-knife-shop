import { useState } from 'react';
import { motion } from 'framer-motion';

// Color variants with their respective images and hex codes
export const colorVariants = [
  { name: 'black', image: '/images/tomato-knife-black.jpg', hex: '#000000' },
  { name: 'blue', image: '/images/tomato-knife-blue.jpg', hex: '#2563eb' },
  { name: 'pink', image: '/images/tomato-knife-pink.jpg', hex: '#ec4899' },
  { name: 'yellow', image: '/images/tomato-knife-yellow.jpg', hex: '#eab308' },
  { name: 'green', image: '/images/tomato-knife-green.jpg', hex: '#16a34a' },
  { name: 'orange', image: '/images/tomato-knife-orange.jpg', hex: '#ea580c' }
];

// Gallery images for the product showcase
export const galleryImages = [
  { id: 'hero', src: '/images/tomato-knife-hero.jpg', alt: 'Victorinox Tomato Knife Hero Shot' },
  { id: 'studio1', src: '/images/tomato-knife-studio-1.jpg', alt: 'Studio Shot 1' },
  { id: 'studio2', src: '/images/tomato-knife-studio-2.jpg', alt: 'Studio Shot 2' },
  { id: 'studio3', src: '/images/tomato-knife-studio-3.jpg', alt: 'Studio Shot 3' },
  { id: 'cutting1', src: '/images/tomato-knife-cutting-tomato.jpg', alt: 'Cutting Tomato' },
  { id: 'cutting2', src: '/images/tomato-knife-cutting-bread.jpg', alt: 'Cutting Bread' },
  { id: 'scene', src: '/images/tomato-knife-kitchen-scene.jpg', alt: 'Kitchen Scene' },
  { id: 'blade', src: '/images/tomato-knife-detail-blade.jpg', alt: 'Blade Detail' },
  { id: 'handle', src: '/images/tomato-knife-detail-handle.jpg', alt: 'Handle Detail' },
  { id: 'packaging', src: '/images/tomato-knife-packaging.jpg', alt: 'Product Packaging' },
  { id: 'lifestyle', src: '/images/tomato-knife-lifestyle.jpg', alt: 'Lifestyle Shot' }
];

interface ProductCardProps {
  availableColor: string;
  price: number;
  currency: 'EUR' | 'USD';
  isDiscounted: boolean;
  locale: string;
}

export function ProductCard({ availableColor, price, currency, isDiscounted, locale }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(galleryImages[0]);
  const currencySymbol = currency === 'EUR' ? '€' : '$';
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(price);

  const availableVariant = colorVariants.find(variant => variant.name === availableColor);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Product Image */}
      <motion.div 
        className="relative aspect-square rounded-lg overflow-hidden mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {galleryImages.slice(0, 6).map((image) => (
          <motion.button
            key={image.id}
            onClick={() => setCurrentImage(image)}
            className={`aspect-square rounded-md overflow-hidden ${
              currentImage.id === image.id ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Victorinox Tomato Knife</h1>
          <div className="text-right">
            <p className="text-2xl font-bold">{formattedPrice}</p>
            {isDiscounted && (
              <p className="text-sm text-green-600">40% Off Applied</p>
            )}
          </div>
        </div>

        {/* Available Color */}
        {availableVariant && (
          <div className="flex items-center space-x-2">
            <span>Available in:</span>
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: availableVariant.hex }}
            />
            <span className="capitalize">{availableVariant.name}</span>
          </div>
        )}

        {/* Buy Button */}
        <motion.button
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
}
