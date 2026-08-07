import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getProducts,
  deleteProduct,
  restoreProduct,
} from "../services/productService";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const { token } = useSelector(
    (state) => state.auth
  );

  const fetchProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data.products);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id, token);

      alert("Product Deleted");

      fetchProducts();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  const handleRestore = async (id) => {

    try {

      await restoreProduct(id, token);

      alert("Product Restored");

      fetchProducts();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };
  if (loading) {

    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Admin Products

        </h1>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >

          Add Product

        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-3">
                Image
              </th>

              <th>
                Title
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Stock
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-t text-center"
              >

                <td className="p-3">

                  <img
  src={
    product.images?.[0]?.url ||
    "https://via.placeholder.com/80"
  }
  alt={product.title}
  className="w-20 h-20 object-cover rounded"
/>

                </td>

                <td>

                  {product.title}

                </td>

                <td>

                  {product.category}

                </td>

                <td>

                  ₹ {product.price}

                </td>

                <td>

                  {product.stock}

                </td>

                <td className="space-x-3">

                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >

                    Edit

                  </Link>

                  {
  product.isActive ? (

    <button
      onClick={() => handleDelete(product._id)}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete
    </button>

  ) : (

    <button
      onClick={() => handleRestore(product._id)}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Restore
    </button>

  )
}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminProducts;