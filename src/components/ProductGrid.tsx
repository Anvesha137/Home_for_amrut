import { ProductCard, Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToGiftBox?: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart, onAddToGiftBox }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToGiftBox={onAddToGiftBox}
        />
      ))}
    </div>
  );
}
