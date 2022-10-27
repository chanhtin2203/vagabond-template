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

export const getProductByPagination = createAsyncThunk(
  "products/getProductByPagination",
  async ({ current, pageSize, search, tabs }) => {
    const res = await axios.get(
      current && pageSize
        ? `${BASE_URL}/products?pageIndex=${current}&pageSize=${pageSize}&search=${search}&category=${tabs}`
        : `${BASE_URL}/products`
    );
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

export const addProductsByAdmin = createAsyncThunk(
  "products/addProductsByAdmin",
  async ({ values, accessToken, axiosJWT }) => {
    const res = await axiosJWT.post(`${BASE_URL}/products`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const updateProductsByAdmin = createAsyncThunk(
  "products/updateProductsByAdmin",
  async ({ values, id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.put(`${BASE_URL}/products/edit/${id}`, values, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

export const deleteProductsByAdmin = createAsyncThunk(
  "products/deleteProductsByAdmin",
  async ({ id, accessToken, axiosJWT }) => {
    const res = await axiosJWT.delete(`${BASE_URL}/products/delete/${id}`, {
      headers: { token: `Beaer ${accessToken}` },
    });
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    productsPagination: [],
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
    // get all products by pagination
    [getProductByPagination.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductByPagination.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsPagination = action.payload;
    },
    [getProductByPagination.rejected]: (state) => {
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
    // add product
    [addProductsByAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductsByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsPagination.products.push(action.payload);
    },
    [addProductsByAdmin.rejected]: (state) => {
      state.isLoading = false;
    },
    // update product
    [updateProductsByAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProductsByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsPagination.products = state.productsPagination.products.map(
        (item) => (item._id === action.payload._id ? action.payload : item)
      );
    },
    [updateProductsByAdmin.rejected]: (state) => {
      state.isLoading = false;
    },
    // delete product
    [deleteProductsByAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProductsByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsPagination.products =
        state.productsPagination.products.filter(
          (item) => item._id !== action.payload._id
        );
    },
    [deleteProductsByAdmin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
