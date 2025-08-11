import type { Product } from "../../types";

interface Props {
  product: Product;
  onDelete: () => void;
  onEdit?: () => void;
}

export default function ProductCard({ product, onDelete, onEdit }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <img src={product.image} alt={product.title} style={{ width: "100%", height: 160, objectFit: "contain" }} />
      <h4 style={{ fontSize: 14, margin: "8px 0" }}>{product.title}</h4>
      <p style={{ margin: 4 }}>₹{product.price}</p>
      <p style={{ margin: 4 }}>{product.rating?.count ? "In Stock" : "Out of stock"}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={onEdit} className="btn btn-dark">Edit</button>
        <button onClick={onDelete} className="btn btn-secondary">Delete</button>
      </div>
    </div>
  );
}
