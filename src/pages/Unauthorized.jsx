import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl text-red-600 font-bold">
        403
      </h1>

      <h2 className="text-2xl mt-4">
        Unauthorized Access
      </h2>

      <Link
        to="/"
        className="text-blue-500 underline mt-4 block"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;