import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssetState } from "./types";

const initialState: AssetState = {
  priceHistory: [],
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    addPrice: (state, action: PayloadAction<number>) => {
      state.priceHistory.push(action.payload);
    },
    resetPrices: (state) => {
      state.priceHistory = [];
    },
  },
});

export const { addPrice, resetPrices } = assetSlice.actions;
export default assetSlice.reducer;
