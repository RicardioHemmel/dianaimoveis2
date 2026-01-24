export function formattedPrice(
  price: number,
  showCents: boolean = true,
  showCurrency: boolean = true,
): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: showCurrency ? "currency" : "decimal",
    currency: "BRL",
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });

  return formatter.format(price);
}
