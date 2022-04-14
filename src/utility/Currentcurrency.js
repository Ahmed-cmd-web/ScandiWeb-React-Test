/** @format */

const CurrentCurrency = (prices, target) =>
  prices &&
  prices?.filter(
    (e) => JSON.stringify(e.currency) == JSON.stringify(target)
  )[0];

export default CurrentCurrency;
