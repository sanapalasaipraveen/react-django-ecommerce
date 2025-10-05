// slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

// 1. Check localStorage for existing cart items
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// 2. Define the initial state
const initialState = {
  cartItems: cartItemsFromStorage,
};

// 3. Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 4. Reducer for adding an item to the cart
    cartAddItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // If item already exists, update its quantity
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        // If it's a new item, add it to the array
        state.cartItems = [...state.cartItems, item];
      }
      
      // 5. Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    // 6. Reducer for removing an item from the cart
    cartRemoveItem: (state, action) => {
        state.cartItems = state.cartItems.filter(
            (x) => x.product !== action.payload
        );
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },
});

// 7. Export the actions and the reducer
export const { cartAddItem, cartRemoveItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;