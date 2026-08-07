const Pagination = ({
  totalPages,
  currentPage,
  setFilters,
}) => {

  return (

    <div className="flex justify-center gap-2 mt-10">
      {
        [...Array(totalPages)].map((_, index)=>(
          <button
            key={index}
            onClick={()=>
              setFilters(prev=>({

                ...prev,

                page:index+1

              }))

            }

            className={`px-4 py-2 rounded ${
              currentPage===index+1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}

          >

            {index+1}

          </button>

        ))

      }

    </div>

  );

};

export default Pagination;