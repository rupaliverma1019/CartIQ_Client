import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getWishlist } from "../../services/wishlistService";

const TestWishlist = () => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(token);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchWishlist();
  }, [token]);

  return null;
};

export default TestWishlist;