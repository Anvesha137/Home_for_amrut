import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard, Product } from './ProductCard';
import { useRef } from 'react';

interface TrendingCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToGiftBox?: (product: Product) => void;
}

export function TrendingCarousel({
  products,
  onAddToCart,
  onAddToGiftBox,
}: TrendingCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-2">
              🔥 Trending Flavours
            </h2>
            <p className="text-gray-600">Most loved by our customers</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-rose-200 hover:bg-rose-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-rose-200 hover:bg-rose-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-72 snap-start"
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                onAddToGiftBox={onAddToGiftBox}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
