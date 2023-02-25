import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define a type for the slice state
interface CartState {
  items: {
    productName: string;
    productPrice: number;
    productImage: string;
    productQuantity: number;
  }[];
}

interface PayloadType {
  productName: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addItem: (state, action: PayloadAction<PayloadType>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<PayloadType>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
