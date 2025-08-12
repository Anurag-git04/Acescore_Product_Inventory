import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts, deleteProduct } from "./productsSlice";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import type { Product } from "../../types";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((s) => s.products);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (list.length === 0) dispatch(getProducts());
  }, [dispatch, list.length]);

  const filtered = list.filter((p) => {
    const okName = p.title?.toLowerCase().includes(query.toLowerCase());
    const okCat = category === "All" || p.category === category;
    return okName && okCat;
  });

  const categories = Array.from(new Set(list.map((p) => p.category))).filter(Boolean);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      {/* existing search/filter UI (bootstrap) */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* product grid */}
      <div className="row g-3">
        {filtered.map((p) => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={p} onDelete={() => dispatch(deleteProduct(p.id!))} onEdit={() => setEditingProduct(p)} />
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editingProduct && (
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setEditingProduct(null)} />
              </div>
              <div className="modal-body">
                <ProductForm initial={editingProduct} onClose={() => setEditingProduct(null)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
