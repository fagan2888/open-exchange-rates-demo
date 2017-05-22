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

export function uniqueCurrencies(currencies) {
  return currencies.reduce(
    (prev, current) => prev.concat(current),
    []
  ).reduce(
    (prev, current) => (
      prev.includes(current)
        ? prev
        : prev.concat(current)
    ),
    []
  );
}

export function ltrim(char, str) {
  if (str.slice(0, char.length) === char) {
    return ltrim(char, str.slice(char.length));
  } else {
    return str;
  }
}
