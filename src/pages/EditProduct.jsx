import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import ProductForm from "../pages/Admin/ProductForm";

import {
getProductById,
updateProduct
}
from "../services/productService";

const EditProduct = () => {

const { id } = useParams();

const navigate = useNavigate();

const { token } = useSelector(
(state)=>state.auth
);

const [loading,setLoading] =
useState(true);

const [product,setProduct] =
useState(null);
useEffect(()=>{

const fetchProduct = async()=>{

try{

const data =
await getProductById(id);

setProduct(data.product);

}
catch(err){

alert("Failed to load product");

}
finally{

setLoading(false);

}

};

fetchProduct();

},[id]);
const handleUpdateProduct =
async(formData)=>{

try{

await updateProduct(
id,
formData,
token
);

alert("Product Updated");

navigate("/admin/products");

}
catch(err){

alert(
err.response?.data?.message
);

}

};

if(loading){

return(

<h2 className="text-center mt-10">

Loading...

</h2>

);

}

return(

<div className="max-w-5xl mx-auto py-10">

<h1 className="text-3xl font-bold mb-8">

Edit Product

</h1>

<ProductForm

initialData={product}

onSubmit={handleUpdateProduct}

/>

</div>

);

};

export default EditProduct;