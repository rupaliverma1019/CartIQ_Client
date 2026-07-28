
const categories = [
  "Shoes",
  "Electronics",
  "Fashion",
  "Books",
  "Beauty",
  "Sports",
];


const CategorySection = () => {
  return (
    <section>
        <h2 className="text-3xl font-bold mb-10">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {
            categories.map((category)=>(
                <div key={category}
                className="bg-gray-100 rounded-xl p-6 text-center hover:bg-black hover:text-white cursor-pointer transition"
                >
                    {category}
                </div>
            ))
        }
      </div>
    </section>
  )
}

export default CategorySection