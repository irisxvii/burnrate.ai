export const USD_TO_INR = 85;

export function normalizePrice(
  amount: number,
  currency: "USD" | "INR"
) {
  if (currency === "USD") {
    return amount * USD_TO_INR;
  }

  return amount;
}