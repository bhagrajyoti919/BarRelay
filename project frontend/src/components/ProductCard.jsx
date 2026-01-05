import { addToCart } from "../api/cart";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image_url} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart({
        product_id: product.product_id,
        quantity: 1
      })}>
        Add to Cart
      </button>
    </div>
  );
}
