
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ServerApi from "../../../api/serverApi";
import { FaKey, FaLock, FaSpinner } from "react-icons/fa";
import { mainLogo } from "../../../assets";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    code: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [loading, setLoading] = useState(false);
  const [redirectingLoading, setRedirectingLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

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
      formData.email = email;
      const response = await axios.post(ServerApi.resetPassword.url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setFormData({
        email: "",
      });

      setLoading(false);
      setSuccess(response.data.msg);
      
      setRedirectingLoading(true);
      setTimeout(() => {
        setRedirectingLoading(false);
        navigate("/login");
      }, 3000);
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

  if (redirectingLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex h-full w-full justify-center items-center min-h-screen bg-transparent">
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-blue-500 text-6xl" />
            <span className="text-gray-700 text-xl font-semibold">
              Password Reset Successful Redirecting to login
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <img src={mainLogo} alt="" className="w-1/3 mx-auto mb-8" />
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* New Code */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newCode"
            >
              Reset OTP Code
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaKey className="text-gray-400 mr-2" />
              <input
                type="text"
                id="newCode"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter the reset OTP code"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="newPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your new password"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#16ADA9] hover:bg-[#00D4A2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        </form>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          You must have cookies enabled to use this site. <br />
          <Link to="/forgot-password" className="underline">
            View our Privacy Policy
          </Link>{" "}
          •{" "}
          <Link to={"/forgot-password"} className="underline">
            Email Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
