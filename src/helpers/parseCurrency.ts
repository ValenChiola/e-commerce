export const parseCurrency = (
  price: number,
  options: Intl.NumberFormatOptions = {}
) =>
  price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });
