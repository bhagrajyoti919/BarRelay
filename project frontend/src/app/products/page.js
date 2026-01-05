"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Our Premium Selection</h1>
      <div className="grid">
        {products.map(p => (
           <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </div>
  );
}
