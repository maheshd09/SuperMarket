import type { RootState } from "./store";
import type { Product } from "../types";
import { computeOffers } from "../utils/offres";

export function selectBasketItems(state: RootState) {
  return state.basket.items;
}

export function selectProducts(state: RootState) {
  return state.products.products as Product[];
}

export function selectBilling(state: RootState) {
  const products = selectProducts(state);
  const basket = selectBasketItems(state);

  const subtotal = Object.entries(basket).reduce((acc, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return acc + (p ? p.price * qty : 0);
  }, 0);

  const { offersApplied, totalSavings } = computeOffers(products, basket);

  const total = subtotal - totalSavings;

  return { subtotal, offersApplied, totalSavings, total };
}
