import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { addProduct, updateProduct } from "./productsSlice";
import type { Product } from "../../types";

interface Props {
  initial?: Product;
  onClose: () => void;
}

export default function ProductForm({ initial, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Product>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    ...initial,
  });

  useEffect(() => {
    if (initial) setForm({ ...form, ...initial });
  }, [initial]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initial && initial.id) {
      dispatch(updateProduct({ id: initial.id, product: form }));
    } else {
      dispatch(addProduct(form));
    }
    onClose();
  };

  return (
    <form onSubmit={submit} className="p-3 border rounded bg-light shadow-sm">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter product title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          required
          placeholder="Enter price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
