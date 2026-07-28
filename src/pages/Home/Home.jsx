import { useEffect, useState } from "react";
import CategorySection from "../../components/Home/CategorySection";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Hero from "../../components/home/Hero";
import { getProducts } from "../../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      
      setProducts(data.products);
      console.log("Data from getProducts:", data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  return (
    <>
      <Hero />
<CategorySection></CategorySection>
{loading ? (
      <h2 className="text-center mt-10 text-xl">
        Loading Products...
      </h2>
    ) : error ? (
      <h2 className="text-center text-red-500 mt-10">
        {error}
      </h2>
    ) : (
      <FeaturedProducts products={products} />
    )}
     
    </>
  );
};

export default Home;