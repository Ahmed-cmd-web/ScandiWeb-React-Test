/** @format */

import CurrentCurrency from "./Currentcurrency";

const BASKET_TOTAL = (basket, currency) =>
  basket
    .reduce(
      (total, e) =>
        CurrentCurrency(e.prices, currency).amount * e.quantity + total,
      0
    )
    .toFixed(2);

export default BASKET_TOTAL;
