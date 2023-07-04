import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:[]
  },
  reducers: {
    addToCart(state, action) {
      return {
        ...state,
        cartItems:[...state.cartItems,action.payload]
      }
    },
    updateCart(state, action) {
      return {
        ...state,
        cartItems:action.payload
      }
    },
    emptyCart(state, action) {
      return {
        ...state,
        cartItems:[]
      }
    },
  },
});

export const { addToCart, updateCart, emptyCart } = CartSlice.actions;

export default CartSlice.reducer;
