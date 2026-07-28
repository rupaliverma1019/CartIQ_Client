import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({product}) => {
   
     const dispatch = useDispatch();

  const handleAddToCart = () => {
  dispatch(addToCart(product));

};

  return (
 <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

  <Link to={`/product/${product._id}`}>
    <img
      src={
        product.images?.length
          ? product.images[0].url
          : "https://via.placeholder.com/300"
      }
      alt={product.title}
      className="h-56 w-full object-cover"
    />

    <div className="p-4">
      <h3 className="font-bold text-lg">
        {product.title}
      </h3>

      <p className="text-gray-500">
        ₹ {product.price}
      </p>
    </div>
  </Link>

  <button
  onClick={handleAddToCart}
  className="mt-8 bg-black text-white px-8 py-3 rounded-lg"
>
  Add To Cart
</button>

</div>
  )
}

export default ProductCard

  