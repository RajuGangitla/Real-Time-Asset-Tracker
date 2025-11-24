import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectPriceHistory = (state: RootState) => state.asset.priceHistory;

export const selectHighLow = createSelector(
  [selectPriceHistory],
  (prices) => ({
    high: prices.length ? Math.max(...prices) : null,
    low: prices.length ? Math.min(...prices) : null,
  })
);
