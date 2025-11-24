import { createSelector } from "@reduxjs/toolkit";
import { AssetState } from "./types";

interface RootState {
  asset: AssetState;
}

const selectPriceHistory = (state: RootState) => state.asset.priceHistory;

export const selectLatestAssetPrice = createSelector(
  [selectPriceHistory],
  (prices): number | null => (prices.length ? prices[prices.length - 1] : null)
);

