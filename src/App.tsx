import { useState } from "react";
import ProductList from "./features/products/ProductList";
import ProductForm from "./features/products/ProductForm";

export default function App() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h1>Product Inventory</h1>
      <button onClick={() => setShowAdd(true)} className="mb-3 btn btn-dark">+ Add Product</button>
      {showAdd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000 // higher than bootstrap modals (1050)
          }}
        >
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, width: 500 }}>
            <ProductForm onClose={() => setShowAdd(false)} />
          </div>
        </div>
      )}

      <ProductList />
    </div>
  );
}
