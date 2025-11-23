import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import { defaultProducts } from "../../data/product";
import { fetchProducts as fetchProductsFromFirestore } from "../../services";

type ProductsState = {
  products: Product[];
};

const initialState: ProductsState = {
  products: defaultProducts,
};

export const fetchProductsThunk = createAsyncThunk<Product[]>(
  "products/fetchFromFirestore",
  async () => {
    const rows = await fetchProductsFromFirestore();
    return rows as Product[];
  }
);

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setProducts } = slice.actions;
export default slice.reducer;
