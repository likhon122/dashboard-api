import { useState } from "react";
import axios from "axios"; // Import Axios
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import ServerApi from "../../../api/serverApi";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../../store/userSlice";
import { mainLogo } from "../../../assets";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false; 
    }

    return true; // Password is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset any previous success messages
    if (!validatePassword(formData.password)) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(ServerApi.login.url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLoading(false);

      // If successful, you can set a success message or redirect the user
      setSuccess(response.data.msg);
      dispatch(fetchUserDetails());
      // Optionally, redirect to a different page or perform any other actions
    } catch (error) {
      if (error.response) {
        // If the server responded with an error status
        setLoading(false);
        setError(error.response.data.msg);
      } else {
        // For unexpected errors
        setError("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <img src={mainLogo} alt="" className="w-1/3 mx-auto mb-8" />
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#16ADA9] hover:bg-[#00D4A2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Logging In..." : " Login"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              to={"/forgot-password"}
              className="text-gray-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don’t have an account yet?{" "}
              <Link to="/sign-up" className="text-[#16ADA9] hover:underline">
                Partner Sign Up
              </Link>
            </p>
          </div>
        </form>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          You must have cookies enabled to use this site. <br />
          <Link to="/login" className="underline">
            View our Privacy Policy
          </Link>{" "}
          •{" "}
          <Link to={"/login"} className="underline">
            Email Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
