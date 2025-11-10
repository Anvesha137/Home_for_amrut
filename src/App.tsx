import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { TrendingCarousel } from './components/TrendingCarousel';
import { GiftBoxCTA } from './components/GiftBoxCTA';
import { Footer } from './components/Footer';
import { ChatButton } from './components/ChatButton';
import { CartDrawer } from './components/CartDrawer';
import { GiftBoxBuilder } from './components/GiftBoxBuilder';
import { Product } from './components/ProductCard';
import { CartProvider, useCart } from './contexts/CartContext';
import { toast, Toaster } from 'sonner';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import { ProfilePage } from './components/ProfilePage';

// Mock Product Data
const allProducts: Product[] = [
  // Peri Peri Flavor
  {
    id: 1,
    name: 'Peri Peri Blast Makhana',
    flavour: 'Peri Peri',
    category: 'spicy',
    price: 279,
    originalPrice: 349,
    rating: 4.9,
    reviews: 312,
    image: '/PeriPeri.png',
    badge: '⭐ New',
  },
  
  // Cream & Onion Flavor
  {
    id: 2,
    name: 'Cream & Onion Makhana',
    flavour: 'Cream & Onion',
    category: 'savory',
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviews: 189,
    image: '/Cream&Onion.png',
  },
  
  // Tangy Tomato Flavor
  {
    id: 3,
    name: 'Tangy Tomato Twist',
    flavour: 'Tangy Tomato',
    category: 'savory',
    price: 259,
    originalPrice: 329,
    rating: 4.5,
    reviews: 143,
    image: '/TangyTomato.png',
  },
  
  // Pudina (Mint) Flavor
  {
    id: 4,
    name: 'Pudina (Mint) Magic',
    flavour: 'Pudina (Mint)',
    category: 'savory',
    price: 269,
    rating: 4.6,
    reviews: 167,
    image: '/Pudina(Mint).png',
  },
  
  // Salted Flavor
  {
    id: 5,
    name: 'Salted Perfection',
    flavour: 'Salted',
    category: 'savory',
    price: 239,
    originalPrice: 299,
    rating: 4.5,
    reviews: 156,
    image: '/Salted.png',
  },
  
  // Magic Masala Flavor
  {
    id: 6,
    name: 'Magic Masala Makhana',
    flavour: 'Magic Masala',
    category: 'savory',
    price: 279,
    rating: 4.7,
    reviews: 198,
    image: '/MagicMasala.png',
  },
  
  // Black Salt Flavor
  {
    id: 7,
    name: 'Black Salt Zest',
    flavour: 'Black Salt',
    category: 'savory',
    price: 259,
    rating: 4.6,
    reviews: 176,
    image: '/BlackSalt.png',
  },
  
  // Cheese Flavor (using plain.png as fallback)
  {
    id: 8,
    name: 'Cheese & Herbs Classic',
    flavour: 'Cheese',
    category: 'savory',
    price: 269,
    rating: 4.6,
    reviews: 178,
    image: '/plain.png',
  },
  
  // Barbeque Flavor (using plain.png as fallback)
  {
    id: 9,
    name: 'Sriracha BBQ Crunch',
    flavour: 'Barbeque',
    category: 'spicy',
    price: 279,
    rating: 4.6,
    reviews: 167,
    image: '/plain.png',
  },
  
  // Chat Masala Flavor (using plain.png as fallback)
  {
    id: 10,
    name: 'Chat Masala Crunch',
    flavour: 'Chat Masala',
    category: 'savory',
    price: 279,
    rating: 4.7,
    reviews: 189,
    image: '/plain.png',
  },
  
  // Gift Boxes
  {
    id: 11,
    name: 'Premium Gift Box - Classic',
    flavour: 'Gift Box',
    category: 'gift',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 87,
    image: '/hero.png',
    badge: '🎁 Perfect Gift',
  },
  {
    id: 12,
    name: 'Luxury Gift Hamper - Deluxe',
    flavour: 'Gift Box',
    category: 'gift',
    price: 1499,
    originalPrice: 1999,
    rating: 5.0,
    reviews: 56,
    image: '/hero.png',
    badge: '🎁 Luxury',
  },
  
  // Moved to end as requested
  // Caramel Flavor (using plain.png as fallback)
  {
    id: 13,
    name: 'Caramel Bliss Makhana',
    flavour: 'Caramel',
    category: 'sweet',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 234,
    image: '/plain.png',
    badge: '🔥 Bestseller',
  },
  
  // Himalayan Salt & Pepper Flavor (using plain.png as fallback)
  {
    id: 14,
    name: 'Himalayan Salt & Pepper',
    flavour: 'Himalayan Salt',
    category: 'savory',
    price: 289,
    originalPrice: 349,
    rating: 4.8,
    reviews: 212,
    image: '/plain.png',
    badge: '⭐ Premium',
  },
  
  // Lime & Chili Flavor (using plain.png as fallback)
  {
    id: 15,
    name: 'Chilli Lime Fusion',
    flavour: 'Lime & Chili',
    category: 'spicy',
    price: 289,
    rating: 4.7,
    reviews: 201,
    image: '/plain.png',
  },
];

function AppContent() {
  const { addToCart, cartCount } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGiftBoxBuilderOpen, setIsGiftBoxBuilderOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popularity');
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [currentPage, setCurrentPage] = useState<'home' | 'profile'>('home');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.reviews - a.reviews;
        case 'new':
          return b.id - a.id;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, priceRange, sortBy]);

  // Get trending products (top rated with high reviews)
  const trendingProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      .slice(0, 6);
  }, []);

  // Get products excluding gift boxes for the gift box builder
  const productsForGiftBox = useMemo(() => {
    return allProducts.filter((p) => p.category !== 'gift');
  }, [allProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price}`,
      duration: 2000,
    });
  };

  const handleAddToGiftBox = (product: Product) => {
    setIsGiftBoxBuilderOpen(true);
    toast.info('Opening gift box builder...', {
      description: 'Select multiple flavours to create your custom box',
      duration: 2000,
    });
  };

  // Reset to home page
  const goToHome = () => {
    setCurrentPage('home');
  };

  // Go to profile page
  const goToProfile = () => {
    setCurrentPage('profile');
  };

  // Render profile page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        <SignedIn>
          <ProfilePage onBack={goToHome} />
        </SignedIn>
        <SignedOut>
          <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {authMode === 'sign-in' ? (
              <div className="w-full max-w-md">
                <SignIn 
                  signUpUrl="#"
                  fallbackRedirectUrl="/"
                  signUpFallbackRedirectUrl="/"
                />
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setAuthMode('sign-up')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <SignUp 
                  signInUrl="#"
                  fallbackRedirectUrl="/"
                  signInFallbackRedirectUrl="/"
                />
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setAuthMode('sign-in')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </SignedOut>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      
      <SignedIn>
        {/* Header */}
        <Header
          onCartClick={() => setIsCartOpen(true)}
          onMenuClick={() => setIsSidebarOpen(true)}
          onProfileClick={goToProfile}
          cartCount={cartCount}
        />

        {/* Hero Banner */}
        <HeroBanner onCreateGiftBox={() => setIsGiftBoxBuilderOpen(true)} />

        {/* Trending Section */}
        <TrendingCarousel
          products={trendingProducts}
          onAddToCart={handleAddToCart}
          onAddToGiftBox={handleAddToGiftBox}
        />

        {/* Gift Box CTA */}
        <GiftBoxCTA onCreateGiftBox={() => setIsGiftBoxBuilderOpen(true)} />

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />

            {/* Products Section */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl text-gray-900">
                    {selectedCategory === 'all'
                      ? 'All Products'
                      : selectedCategory === 'sweet'
                      ? 'Sweet Flavours'
                      : selectedCategory === 'savory'
                      ? 'Savory Flavours'
                      : selectedCategory === 'spicy'
                      ? 'Spicy Flavours'
                      : 'Gift Boxes'}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredProducts.length}{' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onAddToGiftBox={handleAddToGiftBox}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Chat Button */}
        <ChatButton />

        {/* Cart Drawer */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Gift Box Builder */}
        <GiftBoxBuilder
          isOpen={isGiftBoxBuilderOpen}
          onClose={() => setIsGiftBoxBuilderOpen(false)}
          availableProducts={productsForGiftBox}
        />
      </SignedIn>
      
      <SignedOut>
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          {authMode === 'sign-in' ? (
            <div className="w-full max-w-md">
              <SignIn 
                signUpUrl="#"
                fallbackRedirectUrl="/"
                signUpFallbackRedirectUrl="/"
              />
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setAuthMode('sign-up')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <SignUp 
                signInUrl="#"
                fallbackRedirectUrl="/"
                signInFallbackRedirectUrl="/"
              />
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setAuthMode('sign-in')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </SignedOut>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
