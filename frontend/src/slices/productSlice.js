// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- PRODUCT LIST LOGIC (Already exists) ---
export const fetchProducts = createAsyncThunk(
  'products/fetchList', // Renamed for clarity
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/products/');
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;
      return rejectWithValue(message);
    }
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// --- PRODUCT DETAILS LOGIC (New!) ---
export const fetchProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;
      return rejectWithValue(message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: { reviews: [] }, // Start with an empty object to avoid errors
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// --- EXPORT REDUCERS ---
export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;