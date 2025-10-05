// store.js

import { configureStore } from '@reduxjs/toolkit';
// Import the two reducers we created
import {
  productListReducer,
  productDetailsReducer,
} from './slices/productSlice';
import { cartReducer } from './slices/cartSlice'; 
import { userReducer } from './slices/userSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer, // Add the new reducer here
    cart: cartReducer, 
    user: userReducer,
  },
});

export default store;