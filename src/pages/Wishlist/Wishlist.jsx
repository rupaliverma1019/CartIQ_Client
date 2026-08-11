import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWishlist, removeWishlist } from "../../services/wishlistService"
import { addToCart } from "../../redux/slices/cartSlice"
import SmartWishlist from "../../components/Wishlist/SmartWishlist"


const Wishlist = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state)=>state.auth)

    const [wishlist , setWishlist] = useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState("")

    useEffect(()=>{
        const fetchWishList = async( ) =>{
            try {
                setLoading(true);
                setError("");
               const data = await getWishlist(token)
                console.log("wishlist" , data)
                setWishlist(data.wishlist || [])

            } catch (error) {
                    console.error(error)
                    setError("failed to load wishlist")
                
            }
            finally{
                setLoading(false)
            }
        }
        if(token){
        fetchWishList()
        }
    },[token])

 const handleRemove = async (productId) => {
    try {
      await removeWishlist(productId, token);

      setWishlist((prev) =>
        prev.filter((item) => {
          const product = item.product || item;

          return product._id !== productId;
        })
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove product.");
    }
  };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Loading Wishlist...
        </h2>
      </div>
    );
  }
      if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-500">
          {error}
        </h2>
      </div>
    );
  }



  
return (
  <div className="bg-[#fafafa] min-h-screen px-4 md:px-8 lg:px-14 py-8">

    {/* Header */}
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">
          My Wishlist
        </h1>

        <span className="text-sm text-gray-500">
          {wishlist.length} Items
        </span>
      </div>
    </div>

    {/* Empty Wishlist */}
    {wishlist.length === 0 ? (
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 py-24 text-center">

        <div className="text-6xl mb-5">
          ❤️
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Your wishlist is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Add products you love to your wishlist.
        </p>

      </div>
    ) : (

      /* Wishlist Grid */
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {wishlist.map((item) => {

          const product = item.product || item;

          // Calculate discount
          const discount =
            product.originalPrice && product.originalPrice > product.price
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

          return (
            <div
              key={product._id}
              className="
                bg-white
                border border-gray-200
                overflow-hidden
                group
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
              "
            >

              {/* Product Image */}
              <div className="relative bg-gray-100 overflow-hidden">

                <img
                  src={product.images?.[0]?.url}
                  alt={product.title}
                  className="
                    w-full
                    h-64
                    md:h-72
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Discount Badge */}
                {discount > 0 && (
                  <span
                    className="
                      absolute
                      bottom-3
                      left-3
                      bg-white
                      text-[#ff3f6c]
                      text-xs
                      font-bold
                      px-2
                      py-1
                      shadow-sm
                    "
                  >
                    {discount}% OFF
                  </span>
                )}

                {/* Remove Wishlist */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="
                    absolute
                    top-3
                    right-3
                    w-9
                    h-9
                    bg-white
                    rounded-full
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    text-xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                    hover:text-red-500
                    hover:scale-110
                  "
                  title="Remove from wishlist"
                >
                  ×
                </button>

              </div>

              {/* Product Details */}
              <div className="p-4">

                {/* Product Title */}
                <h2
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    truncate
                  "
                  title={product.title}
                >
                  {product.title}
                </h2>

                {/* Price Section */}
                <div className="flex items-center gap-2 mt-2">

                  {/* Current Price */}
                  <span className="text-base font-bold text-gray-900">
                    ₹{product.price}
                  </span>

                  {/* Original Price */}
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span
                        className="
                          text-sm
                          text-gray-400
                          line-through
                        "
                      >
                        ₹{product.originalPrice}
                      </span>
                    )}

                  {/* Discount */}
                  {discount > 0 && (
                    <span className="text-xs font-semibold text-[#03a685]">
                      ({discount}% OFF)
                    </span>
                  )}

                </div>

                {/* Move To Bag */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="
                    w-full
                    mt-4
                    border
                    border-[#ff3f6c]
                    text-[#ff3f6c]
                    font-bold
                    text-sm
                    py-3
                    rounded-sm
                    tracking-wide
                    transition-all
                    duration-300
                    hover:bg-[#ff3f6c]
                    hover:text-white
                    hover:shadow-md
                  "
                >
                  MOVE TO BAG
                </button>

              </div>

            </div>
          );
        })}

      </div>
    )}
<SmartWishlist/>
  </div>
);
}


export default Wishlist