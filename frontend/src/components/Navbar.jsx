import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Url Shortener</h1>
      <Link
        to="/auth"
        className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </Link>
    </div>
  );
};
export default Navbar;
