import { useState } from "react";

import FeaturedProducts from "../Home/FeaturedProducts";

import { searchAIProducts } from "../../services/aiService";

const AISearch=()=>{

const [prompt,setPrompt]=useState("");

const [loading,setLoading]=useState(false);

const [products,setProducts]=useState([]);

const [keywords,setKeywords]=useState("");

const [error , setError] = useState("")

const[history , setHistory] = useState([])

const suggestions = [
  "Gaming Laptop",
  "Phone under ₹30000",
  "RO Water Purifier",
  "Bluetooth Earphones",
  "Running Shoes",
  "Smart Watch"
];

const handleSearch = async () => {

  if (!prompt.trim()) {

    setError("Please enter a search prompt.");

    return;

  }

  try {

    setLoading(true);

    setError("");

    const data = await searchAIProducts(prompt);

    setProducts(data.products);

    setKeywords(data.keywords);

    setHistory((prev) => [prompt, ...prev.slice(0, 4)]);

  } catch (error) {

    setError(
      error.response?.data?.message ||
      "Something went wrong."
    );

  } finally {

    setLoading(false);

  }

};

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-5">

    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="text-center">

        <h1 className="text-5xl font-extrabold text-gray-800">
          🤖 AI Product Search
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Describe your dream product and let Gemini find it.
        </p>

      </div>

      {/* Search Box */}

      <div className="bg-white shadow-xl rounded-2xl p-6 mt-10">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Example: Gaming laptop under ₹70000"
            className="flex-1 border-2 border-blue-100 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 duration-300 text-white px-8 rounded-xl"
          >
            {loading ? "Searching..." : "🔍 AI Search"}
          </button>

          {prompt && (
            <button
              onClick={() => {
                setPrompt("");
                setProducts([]);
                setKeywords("");
                setError("");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-xl"
            >
              Clear
            </button>
          )}

        </div>

        {/* Suggestions */}

        <div className="mt-6">

          <h3 className="font-semibold text-gray-700 mb-3">
            Popular Searches
          </h3>

          <div className="flex flex-wrap gap-3">

            {suggestions.map((item) => (

              <button
                key={item}
                onClick={() => setPrompt(item)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-full transition-all"
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center mt-12">

          <div className="animate-spin h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>

          <p className="mt-4 text-lg font-semibold">
            Gemini is thinking...
          </p>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="mt-8 bg-red-100 border border-red-300 text-red-700 rounded-xl p-5">
          {error}
        </div>

      )}

      {/* Keywords */}

      {keywords && (

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">

          <h2 className="text-2xl font-bold mb-3">
            🤖 Gemini Understood
          </h2>

          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-3 rounded-full">
            {keywords}
          </div>

        </div>

      )}

      {/* No Products */}

      {!loading && products.length === 0 && keywords && (

        <div className="text-center mt-10">

          <h2 className="text-2xl font-bold">
            😔 No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with different keywords.
          </p>

        </div>

      )}

      {/* Products */}

      {products.length > 0 && (

        <div className="mt-12">

          <h2 className="text-3xl font-bold ">
            Recommended Products
          </h2>

          <FeaturedProducts products={products} />

        </div>

      )}

      {/* History */}

      {history.length > 0 && (

        <div className="bg-white rounded-2xl shadow-lg mt-12 p-6">

          <h2 className="text-xl font-bold mb-5">
            🕒 Recent Searches
          </h2>

          <div className="flex flex-wrap gap-3">

            {history.map((item, index) => (

              <button
                key={index}
                onClick={() => setPrompt(item)}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition"
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      )}

    </div>

  </div>
);

};

export default AISearch;