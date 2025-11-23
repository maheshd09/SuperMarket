
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { addOne, removeOne } from "../store/slices/basketslices";
import BasketItem from "./BasketItem";
import { selectBilling } from "../store/selectors";

export default function Basket() {
  const dispatch = useDispatch();
  const products = useSelector((s: RootState) => s.products.products);
  const items = useSelector((s: RootState) => s.basket.items);
  const billing: any = useSelector(selectBilling as any);

  const entries = Object.entries(items).filter(([, qty]: any) => qty > 0);
  const find = (id: string) => products.find((p: any) => p.id === id)!;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Basket</h3>

      {entries.length === 0 ? (
        <div className="text-red-600">Your basket is empty</div>
      ) : (
        <>
          {entries.map(([id, qty]: any) => (
            <BasketItem
              key={id}
              product={find(id)}
              qty={qty}
              onInc={() => dispatch(addOne(id))}
              onDec={() => dispatch(removeOne(id))}
            />
          ))}

          <div className="p-3">
            <div className="flex justify-between mt-3">
              <div>Sub Total:</div>
              <div>£{billing?.subtotal.toFixed(2)}</div>
            </div>

            <div className="mt-3">
              <strong>Savings:</strong>
              <div>
                {billing?.offersApplied.length === 0 && (
                  <div className="text-gray-600">No offers applied</div>
                )}

                {billing?.offersApplied.map((o: any) => (
                  <div key={o.id} className="text-red-600">
                    {o.description} — saved £{o.saving.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-3 font-bold">
              <div>Total Amount:</div>
              <div>£{billing.total.toFixed(2)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
