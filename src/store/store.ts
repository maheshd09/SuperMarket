import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productslice";
import basketReducer from "./slices/basketslices";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
