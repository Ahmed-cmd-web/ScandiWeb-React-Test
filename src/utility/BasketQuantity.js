/** @format */

const totalQuantity = (basket) => {
  let totalQuantityofItemsReagrdless = basket.reduce(
    (total, item) => item.quantity + total,
    0
  );
  return totalQuantityofItemsReagrdless;
};

export default totalQuantity;
