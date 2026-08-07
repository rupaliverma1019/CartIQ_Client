

import ProductCard from "./ProductCard";

const FeaturedProducts = ({products }) => {
 return (
<section className="max-w-7xl mx-auto py-8 px-6">



<div className="grid md:grid-cols-3 gap-8">

{products.map((product) => (
  <ProductCard
    key={product._id}
    product={product}
  />
))}

</div>

</section>

);
}

export default FeaturedProducts