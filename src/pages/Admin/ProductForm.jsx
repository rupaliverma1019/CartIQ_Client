import { useState } from "react";

const ProductForm = ({ onSubmit, initialData = {} }) => {

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    discountPrice: initialData.discountPrice || "",
    category: initialData.category || "",
    brand: initialData.brand || "",
    stock: initialData.stock || "",
    colors: initialData.colors?.join(",") || "",
    sizes: initialData.sizes?.join(",") || "",
    seller: initialData.seller || "",
    featured: initialData.featured || false,
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    initialData.images?.[0]?.url || ""
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"  ? checked : value,    }));
  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);
    data.append("colors", formData.colors);
    data.append("sizes", formData.sizes);
    data.append("seller", formData.seller);
    data.append("featured", formData.featured);

  if (image) {
  data.append("images", image);
}

    onSubmit(data);

  };

  return (

    <form  onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Product Form
      </h2>
      {/* Image Preview */}
      <div className="mb-6">
        {preview && (
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg border mb-4" />
       )}
        <input type="file" accept="image/*" onChange={handleImage}  />

      </div>
     {/* Title */}
      <div className="mb-5">
        <label className="font-semibold">
          Title
        </label>
        <input type="text" name="title" value={formData.title} onChange={handleChange}  className="w-full border rounded p-3 mt-2" required  />
      </div>

      {/* Description */}

      <div className="mb-5">

        <label className="font-semibold">

          Description

        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded p-3 mt-2"
          required
        />

      </div>

      {/* Price */}

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label className="font-semibold">

            Price

          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-3 mt-2"
            required
          />

        </div>

        <div>

          <label className="font-semibold">

            Discount Price

          </label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full border rounded p-3 mt-2"
          />

        </div>

      </div>

      {/* Category */}

      <div className="mt-5">

        <label className="font-semibold">

          Category

        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-3 mt-2"
          required
        >

          <option value="">

          All Categories

        </option>

        <option>

          Appliance

        </option>
        <option>

         Mobile and Electronics

        </option>
        <option>

         Books and Education

        </option>
        <option>

         Groceries and Pet Supplies

        </option>

        <option>

          Fashion

        </option>

        <option>

          Shoes

        </option>


        </select>

      </div>

      {/* Brand */}

      <div className="mt-5">

        <label className="font-semibold">

          Brand

        </label>

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border rounded p-3 mt-2"
        />

      </div>

      {/* Stock */}

      <div className="mt-5">

        <label className="font-semibold">

          Stock

        </label>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded p-3 mt-2"
        />

      </div>

      {/* Colors */}

      <div className="mt-5">

        <label className="font-semibold">

          Colors

        </label>

        <input
          type="text"
          name="colors"
          value={formData.colors}
          onChange={handleChange}
          placeholder="Red,Blue,Black"
          className="w-full border rounded p-3 mt-2"
        />

      </div>

      {/* Sizes */}

      <div className="mt-5">

        <label className="font-semibold">

          Sizes

        </label>

        <input
          type="text"
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
          placeholder="S,M,L,XL"
          className="w-full border rounded p-3 mt-2"
        />

      </div>

      {/* Seller */}

      <div className="mt-5">

        <label className="font-semibold">

          Seller

        </label>

        <input
          type="text"
          name="seller"
          value={formData.seller}
          onChange={handleChange}
          className="w-full border rounded p-3 mt-2"
        />

      </div>

      {/* Featured */}

      <div className="mt-6 flex items-center gap-3">

        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />

        <label>

          Featured Product

        </label>

      </div>

      {/* Button */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 hover:bg-blue-700"
      >

        Save Product

      </button>

    </form>

  );

};

export default ProductForm;