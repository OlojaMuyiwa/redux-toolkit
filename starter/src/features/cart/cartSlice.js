import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const url = `https://course-api.com/react-useReducer-cart-project`;

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: false
};

export const getCartItems = createAsyncThunk('cart/getCart', async () => {
  return fetch(url)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      console.log(action);
      const itemId = action.payload;

      state.cartItems = cartItems.filter(item => {
        return item.id !== itemId;
      });
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
      if (cartItem.amount === 0) {
        return cartItem.amount = 0;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload
    },
    [getCartItems.pending]: (state) => {

      state.isLoading = false;
    }
  }
});

// console.log(cartSlice);

export const { clearCart, removeItem, decrease, increase, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;