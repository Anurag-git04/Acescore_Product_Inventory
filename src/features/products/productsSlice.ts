import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as api from "../../app/productsApi";
import type { Product } from "../../types";
import { loadState, saveState } from "../../utils/localStorage";
import type { RootState } from "../../app/store";


const LOCAL_KEY = "inventory_products_ts_v1";

interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const persisted = loadState<Product[]>(LOCAL_KEY) || [];

const initialState: ProductsState = {
  list: persisted,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.fetchProducts();
      return res.data;
    } catch  {
        return rejectWithValue("Fetch failed");
    }
  }
);

export const addProduct = createAsyncThunk<Product, Product, { rejectValue: string }>(
  "products/add",
  async (product, { rejectWithValue }) => {
    try {
      const res = await api.addProductApi(product);
      return res.data;
    } catch {
      return rejectWithValue("Add failed");
    }
  }
);

export const updateProduct = createAsyncThunk<Product, { id: number; product: Product }, { rejectValue: string }>(
  "products/update",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const res = await api.updateProductApi(id, product);
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number, { rejectValue: string }>(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteProductApi(id);
      return id;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice(state, action: PayloadAction<"asc" | "desc">) {
      const dir = action.payload === "asc" ? 1 : -1;
      state.list.sort((a, b) => (a.price - b.price) * dir);
    },
    sortByName(state, action: PayloadAction<"asc" | "desc">) {
      const dir = action.payload === "asc" ? 1 : -1;
      state.list.sort((a, b) => a.title.localeCompare(b.title) * dir);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        saveState(LOCAL_KEY, state.list);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift({ ...action.payload, id: action.payload.id ?? Date.now() });
        saveState(LOCAL_KEY, state.list);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        saveState(LOCAL_KEY, state.list);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
        saveState(LOCAL_KEY, state.list);
      });
  },
});

export const { sortByPrice, sortByName } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
