import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.product_id} product={p} />)}
    </div>
  );
}
