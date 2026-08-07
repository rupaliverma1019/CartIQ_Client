import React, { useEffect, useState } from "react";

import FeaturedProducts from "../Home/FeaturedProducts";
import { recommendationService } from "../../services/recommendationService";

const ProductRecommendations = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await recommendationService(productId);
        console.log(data);

        setProducts(data.recommendations || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId]);

  if (loading) {
    return <h2>Loading recommendations...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (products.length === 0) {
    return <h2>No recommendations found.</h2>;
  }

  return (
    <div>
      <h2>🤖 Similar Products</h2>
      <FeaturedProducts products={products} />
    </div>
  );
};

export default ProductRecommendations;