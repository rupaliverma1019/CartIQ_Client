import  { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { addToWishlist, checkWishlist, removeWishlist } from '../../services/wishlistService';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishlistButton = ({productID}) => {
  const {token} = useSelector((state)=>state.auth)
  const [isWishListed , setIsWishListed] = useState(false)
  const [loading , setLoading] = useState(false)

  useEffect(()=>{
const fetchWishListStatus = async() =>{
    if(!token || !productID) return
    try {
      const data = await checkWishlist(productID , token)
      setIsWishListed(data.isWishlisted)

    } catch (error) {
      console.log(error)
    }
}
fetchWishListStatus()
  },[productID , token])

const handleWishlist = async() =>{
  if(!token) 
  {
    alert("Please login first.");
      return;
  }
  try {
    setLoading(true)
    if(isWishListed)
    {
      await removeWishlist(productID, token)
      setIsWishListed(false)
    }
    else
    {
      await addToWishlist(productID, token);
        setIsWishListed(true);
    }

  } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
}

  return (
    <div>
      <button onClick={handleWishlist} disabled= {loading} className="absolute top-3 right-3 text-2xl">
        {
          isWishListed ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500 hover:text-red-500" />
        }
      </button>
    </div>
  )
}

export default WishlistButton