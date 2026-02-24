const standardDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  notation: "compact",
  compactDisplay: "short",
});

export function formattedDollars(
  amount: number,
  { compact = false }: { compact?: boolean } = {},
) {
  return compact
    ? compactDollarFormatter.format(amount)
    : standardDollarFormatter.format(amount);
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formattedNumber(number: number) {
  return numberFormatter.format(number);
}
