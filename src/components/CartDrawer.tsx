import { X, Plus, Minus, ShoppingBag, Gift, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, giftBoxes, updateQuantity, removeFromCart, removeGiftBox, cartTotal } = useCart();
  const [expandedBoxes, setExpandedBoxes] = useState<Set<string>>(new Set());

  const toggleBox = (boxId: string) => {
    setExpandedBoxes((prev) => {
      const next = new Set(prev);
      if (next.has(boxId)) {
        next.delete(boxId);
      } else {
        next.add(boxId);
      }
      return next;
    });
  };

  const isEmpty = cartItems.length === 0 && giftBoxes.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <ShoppingBag className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
                <p className="text-sm text-gray-500">
                  {cartItems.length + giftBoxes.length} items
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Content */}
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Start adding some delicious makhana!
            </p>
            <Button
              onClick={onClose}
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6">
                {/* Individual Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.product.flavour}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="hover:bg-white rounded-full p-1 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="hover:bg-white rounded-full p-1 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift Boxes */}
                {giftBoxes.map((box) => (
                  <div
                    key={box.id}
                    className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg border border-rose-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Gift className="h-5 w-5 text-rose-600" />
                          <div>
                            <h4 className="text-sm text-gray-900">
                              {box.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {box.products.length} flavours • 10% discount applied
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeGiftBox(box.id)}
                          className="text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-1 text-sm mb-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>₹{box.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-₹{box.discount}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-gray-900">
                          <span>Total</span>
                          <span>₹{box.total}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleBox(box.id)}
                        className="w-full flex items-center justify-center gap-2 text-xs text-rose-700 hover:text-rose-800 transition-colors"
                      >
                        {expandedBoxes.has(box.id) ? (
                          <>
                            Hide items <ChevronUp className="h-3 w-3" />
                          </>
                        ) : (
                          <>
                            View items <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </button>

                      {expandedBoxes.has(box.id) && (
                        <div className="mt-3 space-y-2">
                          {box.products.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center gap-2 text-xs bg-white/60 rounded p-2"
                            >
                              <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-gray-500">₹{product.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-gray-900 text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full h-12">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
