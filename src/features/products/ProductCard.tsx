import type { Product } from "../../types";

interface Props {
  product: Product;
  onDelete: () => void;
  onEdit?: () => void;
}

export default function ProductCard({ product, onDelete, onEdit }: Props) {
  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top" alt={product.title} style={{ height: 160, objectFit: "contain" }} />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="mb-1">₹{product.price}</p>
        <p className="text-muted small mb-2">{product.category}</p>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>Edit</button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
