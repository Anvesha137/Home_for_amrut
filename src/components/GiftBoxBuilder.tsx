import { useState } from 'react';
import { X, Plus, Check, Gift, Sparkles, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Product } from './ProductCard';
import { useCart, GiftBox } from '../contexts/CartContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface GiftBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: Product[];
}

export function GiftBoxBuilder({
  isOpen,
  onClose,
  availableProducts,
}: GiftBoxBuilderProps) {
  const { addGiftBox } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [giftBoxName, setGiftBoxName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate pricing with fixed 10% discount
  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount;

  const toggleProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isSelected = (productId: number) => {
    return selectedProducts.some((p) => p.id === productId);
  };

  const handleSaveAndAdd = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    if (!giftBoxName.trim()) {
      toast.error('Please name your gift box');
      return;
    }

    const giftBox: GiftBox = {
      id: `giftbox-${Date.now()}`,
      name: giftBoxName,
      products: selectedProducts,
      subtotal,
      discount,
      total,
    };

    addGiftBox(giftBox);

    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    toast.success('🎉 Gift box created!', {
      description: `${giftBoxName} has been added to your cart`,
      duration: 3000,
    });

    // Reset and close
    setTimeout(() => {
      setSelectedProducts([]);
      setGiftBoxName('');
      onClose();
    }, 2000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-rose-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <Gift className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl">
                  Create Your Own Gift Box
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Select your favorite flavours and get 10% off!
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
            {/* Product Selection - Takes remaining space */}
            <ScrollArea className="flex-1 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Choose Your Flavours
                </h3>
                <p className="text-gray-600">
                  Select your favorite products for your gift box. Mix and match to create the perfect combination!
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableProducts.map((product) => {
                  const selected = isSelected(product.id);
                  return (
                    <motion.button
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                        selected
                          ? 'border-rose-500 shadow-lg'
                          : 'border-gray-200 hover:border-rose-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Selection Badge */}
                      <AnimatePresence>
                        {selected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-2 right-2 z-10 bg-rose-600 text-white rounded-full p-1 shadow-lg"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      </div>

                      {/* Product Info */}
                      <div className="p-3 bg-white">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-rose-600 uppercase">
                            {product.flavour}
                          </span>
                          {product.badge && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm text-gray-900 line-clamp-2 mb-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900">₹{product.price}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Add Button Overlay */}
                      {!selected && (
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                            <Plus className="h-4 w-4 text-rose-600" />
                          </div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Summary Panel - Fixed width, always visible */}
            <div className="w-full md:w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {/* Gift Box Name */}
                  <div>
                    <Label htmlFor="giftBoxName" className="text-gray-900 mb-2 block">
                      Name Your Gift Box
                    </Label>
                    <Input
                      id="giftBoxName"
                      placeholder="e.g., Festive Mix, Mom's Favorites"
                      value={giftBoxName}
                      onChange={(e) => setGiftBoxName(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  {/* Selected Items Preview - Names only, line by line */}
                  <div>
                    <h3 className="text-sm text-gray-900 mb-3">
                      Selected Items ({selectedProducts.length})
                    </h3>
                    
                    {selectedProducts.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <Gift className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No items selected yet</p>
                        <p className="text-xs mt-1">Select products to build your gift box</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 truncate font-medium">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{product.price}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProduct(product);
                              }}
                              className="text-gray-400 hover:text-rose-600 ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Summary - Always visible when items are selected */}
                  {selectedProducts.length > 0 && (
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>Subtotal ({selectedProducts.length} items)</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Gift Box Discount (10%)
                        </span>
                        <span>-₹{discount}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total Payable</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200 space-y-2 bg-white">
                <Button
                  onClick={handleSaveAndAdd}
                  disabled={selectedProducts.length === 0 || !giftBoxName.trim()}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full h-12"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Add Gift Box to Cart
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                  backgroundColor: [
                    '#ff6b9d',
                    '#ffd93d',
                    '#6bcf7f',
                    '#4d9fff',
                    '#ff8c42',
                  ][Math.floor(Math.random() * 5)],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: 0,
                  rotate: Math.random() * 360,
                  x: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: 'easeOut',
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}