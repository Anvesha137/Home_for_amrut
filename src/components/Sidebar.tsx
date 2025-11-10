import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

const categories = [
  { id: 'all', label: 'All Products', icon: '🌟' },
  { id: 'sweet', label: 'Sweet Flavours', icon: '🍯' },
  { id: 'savory', label: 'Savory Flavours', icon: '🧂' },
  { id: 'spicy', label: 'Spicy Flavours', icon: '🌶️' },
  { id: 'gift', label: 'Gift Boxes', icon: '🎁' },
];

const sortOptions = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
];

export function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
}: SidebarProps) {
  const content = (
    <div className="bg-white h-full overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between md:hidden">
          <h2 className="text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-4 text-gray-900">Product Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  if (window.innerWidth < 768) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-rose-50 text-rose-900 border border-rose-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="mb-4 text-gray-900">Filter by Price</h3>
          <div className="space-y-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={onPriceRangeChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <div className="space-y-2">
              {[
                { label: '₹100 – ₹200', range: [100, 200] },
                { label: '₹200 – ₹400', range: [200, 400] },
                { label: '₹400+', range: [400, 500] },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onPriceRangeChange(preset.range)}
                  className="text-sm text-left hover:text-rose-700 transition-colors w-full"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <h3 className="mb-4 text-gray-900">Sort By</h3>
          <RadioGroup value={sortBy} onValueChange={onSortByChange}>
            <div className="space-y-3">
              {sortOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-gray-200 bg-gray-50">
        {content}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={onClose}
        >
          <div
            className="w-80 max-w-[85vw] h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
}
