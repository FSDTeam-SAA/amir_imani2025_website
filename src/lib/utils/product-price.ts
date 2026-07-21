import { Product } from "@/lib/types/ecommerce";

export type ProductCurrency = "USD" | "CAD";

export function getProductPrice(product?: Partial<Product> | null) {
  const usdPrice = Number(product?.price);
  const cadPrice = Number(product?.ca_price);

  if (Number.isFinite(usdPrice) && usdPrice > 0) {
    return { amount: usdPrice, currency: "USD" as const };
  }
  if (Number.isFinite(cadPrice) && cadPrice > 0) {
    return { amount: cadPrice, currency: "CAD" as const };
  }
  return { amount: 0, currency: "USD" as const };
}
