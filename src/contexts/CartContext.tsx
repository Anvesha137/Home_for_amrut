import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../components/ProductCard';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GiftBox {
  id: string;
  name: string;
  products: Product[];
  subtotal: number;
  discount: number;
  total: number;
}

interface CartContextType {
  cartItems: CartItem[];
  giftBoxes: GiftBox[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  addGiftBox: (giftBox: GiftBox) => void;
  removeGiftBox: (giftBoxId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [giftBoxes, setGiftBoxes] = useState<GiftBox[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addGiftBox = (giftBox: GiftBox) => {
    setGiftBoxes((prev) => [...prev, giftBox]);
  };

  const removeGiftBox = (giftBoxId: string) => {
    setGiftBoxes((prev) => prev.filter((box) => box.id !== giftBoxId));
  };

  const clearCart = () => {
    setCartItems([]);
    setGiftBoxes([]);
  };

  const cartCount =
    cartItems.reduce((sum, item) => sum + item.quantity, 0) + giftBoxes.length;

  const cartTotal =
    cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) +
    giftBoxes.reduce((sum, box) => sum + box.total, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        giftBoxes,
        addToCart,
        removeFromCart,
        updateQuantity,
        addGiftBox,
        removeGiftBox,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
