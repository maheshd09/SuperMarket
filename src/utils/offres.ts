import type { Product } from "../types";

export type OfferApplied = {
  id: string;
  description: string;
  saving: number;
};

export function computeOffers(products: Product[], basket: Record<string, number>) {
  const offersApplied: OfferApplied[] = [];
  let totalSavings = 0;

  const find = (id: string) => products.find((p) => p.id === id);

  const cheeseQty = basket["cheese"] || 0;
  if (cheeseQty > 1) {
    const free = Math.floor(cheeseQty / 2);
    const cheese = find("cheese");
    if (cheese && free > 0) {
      const saving = free * cheese.price;
      if (saving > 0) {
        offersApplied.push({
          id: "offer-cheese-bogof",
          description: `Buy one get one free on Cheese — ${free} free`,
          saving,
        });
        totalSavings += saving;
      }
    }
  }

  const soupQty = basket["soup"] || 0;
  const breadQty = basket["bread"] || 0;
  if (soupQty > 0 && breadQty > 0) {
    const applicable = Math.min(soupQty, breadQty);
    const bread = find("bread");
    if (bread && applicable > 0) {
      const saving = applicable * (bread.price * 0.5);
      if (saving > 0) {
        offersApplied.push({
          id: "offer-soup-bread-half",
          description: `Buy Soup, get Bread 50% off — ${applicable} bread(s) at half price`,
          saving,
        });
        totalSavings += saving;
      }
    }
  }

  const butterQty = basket["butter"] || 0;
  const butter = find("butter");
  if (butterQty > 0 && butter) {
    const saving = butterQty * (butter.price / 3);    
    if (saving > 0) {
      offersApplied.push({
        id: "offer-butter-1-3",
        description: `Butter 1/3 off — applied to ${butterQty} butter(s)`,
        saving,
      });
      totalSavings += saving;
    }
  }

  const round2 = (n: number) => Math.round(n * 100) / 100;
  return { offersApplied: offersApplied.map(o => ({ ...o, saving: round2(o.saving) })), totalSavings: round2(totalSavings) };
}
