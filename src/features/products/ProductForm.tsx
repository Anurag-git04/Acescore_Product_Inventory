import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addProduct, updateProduct } from "./productsSlice";
import type { Product } from "../../types";

interface Props {
  initial?: Product | null;
  onClose: () => void;
}

const defaultProduct: Product = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
};

export default function ProductForm({ initial = null, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Product>({ ...defaultProduct });
  const [imgError, setImgError] = useState(false);

  // When `initial` changes, set form to that product (or reset)
  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
      setImgError(false);
    } else {
      setForm({ ...defaultProduct });
      setImgError(false);
    }
  }, [initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initial && initial.id) {
        await dispatch(updateProduct({ id: initial.id, product: form })).unwrap();
      } else {
        await dispatch(addProduct(form)).unwrap();
      }
      onClose();
    } catch (err) {
      // You may show toast or error UI here
      console.error("Save failed:", err);
    }
  };

  return (
    <form onSubmit={submit} className="p-3 border rounded bg-light shadow-sm">
      <div className="row">
        <div className="col-md-8">
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
              step="0.01"
              className="form-control"
              required
              placeholder="Enter price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value || "0") })}
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
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Image Preview</label>
            <div className="border rounded p-2 d-flex align-items-center justify-content-center" style={{ minHeight: 160 }}>
              {form.image && !imgError ? (

                <img
                  src={form.image}
                  alt="preview"
                  style={{ maxWidth: "100%", maxHeight: 150, objectFit: "contain" }}
                  onError={() => setImgError(true)}
                  onLoad={() => setImgError(false)}
                />
              ) : (
                <div className="text-muted text-center">
                  {form.image ? "Image failed to load" : "No image URL"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
