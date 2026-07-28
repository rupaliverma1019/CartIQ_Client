import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
const ProductDetails = () => {
const dispatch = useDispatch();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data = await getProductById(id);

        setProduct(data.product);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  if (loading) {

    return <h2>Loading...</h2>;

  }
const handleAddToCart = () => {
  console.log("Button Clicked");
  console.log(product);

  dispatch(addToCart(product));
};


 return (
  <div className="max-w-7xl mx-auto py-10 px-6">

    <div className="grid md:grid-cols-2 gap-10">

      <img
        src={
          product.images?.length
            ? product.images[0].url
            : "https://via.placeholder.com/500"
        }
        alt={product.title}
        className="rounded-xl shadow-lg w-full"
      />

      <div>

        <h1 className="text-4xl font-bold">
          {product.title}
        </h1>

        <p className="text-gray-500 mt-4">
          {product.brand}
        </p>

        <p className="text-3xl text-green-600 font-bold mt-4">
          ₹ {product.price}
        </p>

        <p className="mt-6">
          {product.description}
        </p>

        <p className="mt-6">

          Stock :

          <span className="font-bold">

            {product.stock}

          </span>

        </p>

 
    <button
      onClick={handleAddToCart}
      className="mt-8 bg-black text-white px-8 py-3 rounded-lg"
    >
      Add to Cart
    </button>
 

      </div>

    </div>

  </div>


);

};

export default ProductDetails;




