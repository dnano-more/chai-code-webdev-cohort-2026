import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL =
  "https://api.freeapi.app/api/v1/public/randomproducts";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setProducts(data.data.data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id || product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;