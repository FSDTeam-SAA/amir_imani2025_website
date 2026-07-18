export type ShippingCountry = "CA" | "US";

export const FREE_SHIPPING_THRESHOLD_CAD = 150;

export const SHIPPING_RATES_CAD: Record<ShippingCountry, number> = {
  CA: 9.99,
  US: 19.99,
};

export function calculateShippingCad(
  subtotalCad: number,
  country: ShippingCountry
) {
  return subtotalCad >= FREE_SHIPPING_THRESHOLD_CAD
    ? 0
    : SHIPPING_RATES_CAD[country];
}
