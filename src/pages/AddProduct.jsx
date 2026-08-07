import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductForm from "../pages/Admin/ProductForm";

import { createProduct } from "../services/productService";

const AddProduct = () => {

  const navigate = useNavigate();

  const { token } = useSelector(
    (state) => state.auth
  );

  const handleAddProduct = async (
    formData
  ) => {

    try {

      await createProduct(
        formData,
        token
      );

      alert("Product Added Successfully");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );

    }

  };

  return (

    <div className="bg-gray-100 min-h-screen py-10">

      <ProductForm
        onSubmit={handleAddProduct}
      />

    </div>

  );

};

export default AddProduct;