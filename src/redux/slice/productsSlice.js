import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Utils/BaseUrl";

export const getAllProducts = createAsyncThunk(
  "products/productsFetching",
  async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    return res.data;
  }
);

export const getAllProductsRandom = createAsyncThunk(
  "products/productsRandomFetching",
  async () => {
    const res = await axios.get(`${BASE_URL}/products?random=true`);
    return res.data;
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/productsCategoryFetching",
  async (cat) => {
    const res = await axios.get(`${BASE_URL}/products?category=${cat}`);
    return res.data;
  }
);

export const getDetailProduct = createAsyncThunk(
  "products/productsDetail",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/products/find/${id}`);
    return res.data;
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (value) => {
    const res = await axios.get(`${BASE_URL}/products?search=${value}`);
    return res.data;
  }
);

export const filterProducts = createAsyncThunk(
  "products/searchProduct",
  async (value) => {
    const res = await axios.get(
      value.categoryId
        ? `${BASE_URL}/products/search?lte=${value.obj.lte}&gte=${value.obj.gte}&size=${value.size}&category=${value.categoryId}&sort=${value.sort.name}&value=${value.sort.value}`
        : `${BASE_URL}/products/search?lte=${value.obj.lte}&gte=${value.obj.gte}&size=${value.size}&sort=${value.sort.name}&value=${value.sort.value}`
    );
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    searchProd: [],
    productsRandom: [],
    product: {},
  },
  extraReducers: {
    // get all products
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    // get all product random
    [getAllProductsRandom.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProductsRandom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsRandom = action.payload;
    },
    [getAllProductsRandom.rejected]: (state) => {
      state.isLoading = false;
    },
    // get product by category
    [getProductsByCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByCategory.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [getProductsByCategory.rejected]: (state) => {
      state.isLoading = false;
    },
    // get detail product
    [getDetailProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [getDetailProduct.rejected]: (state) => {
      state.isLoading = false;
    },
    // search product
    [searchProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchProd = action.payload;
    },
    [searchProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
