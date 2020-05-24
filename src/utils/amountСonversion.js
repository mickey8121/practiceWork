const currencySymbols = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  CNY: '¥'
};

const amountСonversion = (amount = 0, currency = 'USD', kSeparator = '.') => {
  const amountSign = amount > 0 ? '+' : amount < 0 ? '-' : '';
  const preparedAmount = (
    Math.abs(amount) // remove minus
      .toFixed(2) // add cents
      .replace('.', ',') // cent separator
      .replace(/\B(?=(\d{3})+(?!\d))/g, kSeparator) // thousands separator
  );
  const currencySymbol = currencySymbols[currency];

  return `${amountSign} ${preparedAmount} ${currencySymbol}`;
};

export default amountСonversion;
