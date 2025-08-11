import axios from "axios";
import type { Product } from "../types";

const BASE = "https://fakestoreapi.com";

export const fetchProducts = () => axios.get<Product[]>(`${BASE}/products`);
export const fetchProductById = (id: number) => axios.get<Product>(`${BASE}/products/${id}`);
export const addProductApi = (product: Product) => axios.post<Product>(`${BASE}/products`, product);
export const updateProductApi = (id: number, product: Product) =>
  axios.put<Product>(`${BASE}/products/${id}`, product);
export const deleteProductApi = (id: number) => axios.delete(`${BASE}/products/${id}`);
