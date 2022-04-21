/** @format */

import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  active: null,
  currency: {
    label: null,
    symbol: null,
  },
  basket: [],
};
const BasketCopy = (basket, action) => {
  let newArray = JSON.parse(JSON.stringify(basket));
  let target =
    newArray[
      _.findIndex(
        basket,
        (e) =>
          e.id === action.payload.id &&
          JSON.stringify(e.selectedAttrs) ===
            JSON.stringify(action.payload.selectedAttrs)
      )
    ];
  return { newArray, target };
};

const reducer = createSlice({
  name: "store",
  initialState,
  reducers: {
    SET_ACTIVE: (state, action) => {
      state.active = action.payload;
      return state;
    },
    SET_CURRENCY: (state, action) => {
      state.currency = {
        ...action.payload,
      };
      return state;
    },
    ADD_TO_BASKET: (state, action) => {
      let { target, newArray } = BasketCopy(state.basket, action);
      if (target) {
        target.quantity++;
        state.basket = [...newArray];
      } else state.basket = [...newArray, { ...action.payload, quantity: 1 }];
      return state;
    },
    INCREMENT_QUANTITY: (state, action) => {
      let { target, newArray } = BasketCopy(state.basket, action);
      target.quantity++;
      state.basket = [...newArray];
      return state;
    },
    DECREMENT_QUANTITY: (state, action) => {
      let { target, newArray } = BasketCopy(state.basket, action);
      target.quantity--;
      if (target.quantity === 0) _.remove(newArray, target);
      state.basket = [...newArray];
      return state;
    },
    REMOVE_FROM_BASKET: (state, action) => {
      let { target, newArray } = BasketCopy(state.basket, action);
      _.remove(newArray, target);
      state.basket = [...newArray];
      return state;
    },
  },
});

export const {
  SET_ACTIVE,
  SET_CURRENCY,
  ADD_TO_BASKET,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_BASKET,
} = reducer.actions;
export const StoreState = (state) => state;
export default reducer.reducer;
