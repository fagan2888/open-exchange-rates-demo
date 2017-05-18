export function calculateCurrency(
  source, target, rates, amount = 1
) {
  return (
    1
    / rates[source]
    * rates[target]
    * amount
  ).toFixed(2);
}
