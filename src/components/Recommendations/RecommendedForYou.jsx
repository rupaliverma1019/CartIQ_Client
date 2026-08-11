import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getPersonalizedRecommendations,
} from "../../services/recommendationService";

import ProductCard from "../Home/ProductCard";

const RecommendedForYou = () => {
  const { token, user } = useSelector(
    (state) => state.auth
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getPersonalizedRecommendations(
            token
          );

        console.log(
          "Personalized Recommendations:",
          data
        );

        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "Recommendation Error:",
          error
        );

        setError(
          "Unable to load recommendations."
        );
      } finally {
        setLoading(false);
      }
    };

    // Only logged-in users
    if (token && user) {
      fetchRecommendations();
    }
  }, [token, user]);

  // Don't show anything to logged-out users
  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">
          ✨ Recommended For You
        </h2>

        <p className="text-gray-500">
          Finding products for you...
        </p>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          ✨ Recommended For You
        </h2>

        <p className="text-gray-500 mt-1">
          Products selected based on your
          shopping activity
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default RecommendedForYou;