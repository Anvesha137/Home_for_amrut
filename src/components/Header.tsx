import { Search, ShoppingCart, Heart, Menu, User, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

interface HeaderProps {
  onCartClick: () => void;
  onMenuClick: () => void;
  cartCount: number;
  onProfileClick?: () => void;
  onGiftBoxClick?: () => void;
}

export function Header({ onCartClick, onMenuClick, cartCount, onProfileClick, onGiftBoxClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl">🌾</div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl tracking-tight text-rose-900">
                Home for Amrut
              </span>
              <span className="text-xs text-rose-700 -mt-1 hidden md:block">
                Premium Makhana
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for flavours, packs, or offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 rounded-full focus:bg-white"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-rose-50 hover:text-rose-700 rounded-full"
              onClick={onGiftBoxClick}
            >
              <Gift className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-rose-50 hover:text-rose-700 rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-rose-50 hover:text-rose-700 rounded-full"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {/* Clerk Authentication Components */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-rose-50 hover:text-rose-700 rounded-full"
                >
                  <span className="sr-only">Sign In</span>
                  <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">👤</span>
                  </div>
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-rose-50 hover:text-rose-700 rounded-full"
                  onClick={onProfileClick}
                >
                  <User className="h-5 w-5" />
                </Button>
                <UserButton 
                  userProfileMode="modal"
                  userProfileProps={{
                    additionalOAuthScopes: {
                      google: ["profile", "email"],
                    },
                    appearance: {
                      elements: {
                        userButtonAvatarBox: "w-8 h-8 rounded-full",
                        userButtonTrigger: "rounded-full hover:bg-rose-50",
                      }
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search flavours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}