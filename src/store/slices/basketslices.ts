import { createSlice} from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";

type BasketState = {
  items: Record<string, number>;
};

const initialState: BasketState = {
  items: {},
};

const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addOne(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeOne(state, action: PayloadAction<string>) {
      const id = action.payload;
      const q = state.items[id] || 0;
      if (q <= 1) {
        delete state.items[id];
      } else {
        state.items[id] = q - 1;
      }
    },
    setQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;
      if (qty <= 0) delete state.items[id];
      else state.items[id] = qty;
    },
    clearBasket(state) {
      state.items = {};
    },
  },
});

export const { addOne, removeOne, setQuantity, clearBasket } = slice.actions;
export default slice.reducer;
