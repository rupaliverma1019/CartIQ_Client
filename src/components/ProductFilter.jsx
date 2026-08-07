const ProductFilter = ({
  filters,
  setFilters,
}) => {

  return (

    <div className="bg-white shadow rounded-xl p-5">

      <input

        type="text"

        placeholder="Search Product..."

        value={filters.keyword}

        onChange={(e)=>
          setFilters({
            ...filters,
            keyword:e.target.value
          })
        }

        className="border p-2 rounded w-full mb-4"

      />

      <select

        value={filters.category}

        onChange={(e)=>
          setFilters({
            ...filters,
            category:e.target.value
          })
        }

        className="border p-2 rounded w-full mb-4"

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

      <select

        value={filters.sort}

        onChange={(e)=>
          setFilters({
            ...filters,
            sort:e.target.value
          })
        }

        className="border p-2 rounded w-full"

      >

        <option value="">

          Sort By

        </option>

        <option value="newest">

          Newest

        </option>

        <option value="priceLow">

          Price Low to High

        </option>

        <option value="priceHigh">

          Price High to Low

        </option>

      </select>

    </div>

  );

};

export default ProductFilter;