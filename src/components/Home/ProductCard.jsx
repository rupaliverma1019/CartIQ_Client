import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import WishlistButton from "../Wishlist/WishlistButton";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 relative">
      {/* Wishlist Button */}
      <div className="absolute top-3 right-3">
        <WishlistButton productID={product._id} />
      </div>

      <Link to={`/products/${product._id}`}>
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />

        <h3 className="font-bold text-lg mt-3">
          {product.title}
        </h3>

        <p className="text-gray-500">
          ₹ {product.price}
        </p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;