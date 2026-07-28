

const Hero = () => {
  return (
    <section>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
                <h1 className="text-5xl font-bold leading-tight">
            Shop Smart,
            <br />
            Live Better.
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Discover thousands of quality products at
            affordable prices.
          </p>
          <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            Shop Now
          </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
            alt="Hero"
            className="rounded-xl shadow-lg"
          />
        </div>

        </div>
    </section>
  )
}

export default Hero