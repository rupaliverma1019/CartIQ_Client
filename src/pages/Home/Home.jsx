import { useEffect, useState } from "react";

import CategorySection from "../../components/Home/CategorySection";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Hero from "../../components/Home/Hero";
import ProductFilter from "../../components/ProductFilter";
import Pagination from "../../components/Pagination";
import AISearch from "../../components/AI/AISearch";
import { getProducts } from "../../services/productService";
import PersonalRecommendations from "../../components/Home/PersonalRecommendations";
import TestWishlist from "./TestWishlist";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(filters);

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <Hero />
{/* ai search */}
<AISearch />
<TestWishlist/>
      {/* Category */}
      <section className="py-10">
        <CategorySection />
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Find Your Products
          </h2>

          <ProductFilter
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-6 text-center">
            {error}
          </div>
        ) : (
          <>
            <FeaturedProducts products={products} />
            <PersonalRecommendations/>
            <div className="mt-12 flex justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={filters.page}
                setFilters={setFilters}
              />
            </div>
          </>
        )}
      </section>

    </div>
  );
};

export default Home;