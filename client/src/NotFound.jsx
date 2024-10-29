import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist. It might have been
          removed or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
        >
          Go to Homepage
        </Link>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6">
          You must have cookies enabled to use this site. <br />
          <a href="#" className="underline">
            View our Privacy Policy
          </a>{" "}
          •{" "}
          <a href="#" className="underline">
            Email Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
