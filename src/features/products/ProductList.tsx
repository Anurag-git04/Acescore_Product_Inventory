import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts, deleteProduct } from "./productsSlice";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((s) => s.products);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (list.length === 0) dispatch(getProducts());
  }, [dispatch]);

  const filtered = list.filter((p) => {
    const okName = p.title.toLowerCase().includes(query.toLowerCase());
    const okCat = category === "All" || p.category === category;
    return okName && okCat;
  });

  const categories = Array.from(new Set(list.map((p) => p.category))).filter(Boolean);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
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
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={() => dispatch(deleteProduct(p.id!))} />
        ))}
      </div>
    </div>
  );
}
