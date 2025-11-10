import { Heart, ShoppingCart, Eye, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export interface Product {
  id: number;
  name: string;
  flavour: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToGiftBox?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onAddToGiftBox }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-rose-200 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
          {product.badge}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick Actions Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="sm"
            variant="secondary"
            className="bg-white hover:bg-gray-100 rounded-full"
          >
            <Eye className="h-4 w-4 mr-1" />
            Quick View
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category Tag */}
        <div className="text-xs text-rose-600 uppercase tracking-wide">
          {product.flavour}
        </div>

        {/* Product Name */}
        <h3 className="text-gray-900 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-amber-400">⭐</span>
            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs text-green-600">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          {onAddToGiftBox && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onAddToGiftBox(product)}
                    variant="outline"
                    className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 rounded-full transition-all"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Add to Gift Box
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add this flavour to your custom gift box</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </motion.div>
  );
}
