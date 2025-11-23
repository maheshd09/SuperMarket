
import type { Product } from "../types";

type Props = {
  product: Product;
  qty: number;
  onInc: () => void;
  onDec: () => void;
};

export default function BasketItem({ product, qty, onInc, onDec }: Props) {
  return (
    <div className="py-3 border-b border-gray-200 flex justify-between items-center">
      <div>
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-600">
          £{product.price.toFixed(2)} each
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          £{(product.price * qty).toFixed(2)}
        </div>

        <button
          onClick={onInc}
          className="px-3 py-1 bg-green-600 text-white rounded-md"
        >
          +
        </button>

        <div className="w-6 text-center">{qty}</div>

        <button
          onClick={onDec}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          -
        </button>
      </div>
    </div>
  );
}
