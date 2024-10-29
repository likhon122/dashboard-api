import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom"; // Added useNavigate
import axios from "axios"; // Import axios for making HTTP requests
import ServerApi from "../../../api/serverApi";
import { FaSpinner } from "react-icons/fa";
import { mainLogo } from "../../../assets";


const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null); // State to hold error messages
  const [success, setSuccess] = useState(null); // State to hold success messages
  const navigate = useNavigate(); // Hook for navigation
  const { email } = useParams();

  const [loading, setLoading] = useState(false);
  const [redirectingLoading, setRedirectingLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (otp.length !== 6) {
      setError("Invalid OTP, OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        ServerApi.verifyOtp.url,
        {
          email: email,
          code: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful verification
      setLoading(false);
      setSuccess(response.data.msg);

      setRedirectingLoading(true);
      setTimeout(() => {
        setRedirectingLoading(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Handle errors from the backend
      console.log(err);
      setLoading(false);
      if (err.response) {
        if (err.response.data.errors && err.response.data.errors.length > 0) {
          setError("Invalid OTP, OTP must be 6 digits");
          return;
        }
        if (err.response.status === 400) {
          setError(err.response.data.msg);
          return;
        }
        setError(err.response.data?.errors[0].msg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (redirectingLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex h-full w-full justify-center items-center min-h-screen bg-transparent">
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-[#16ADA9] text-6xl" />
            <span className="text-gray-700 text-xl font-semibold">
              Verification Successful Redirecting to login
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
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your OTP</h2>

        <form onSubmit={handleSubmit}>
          {/* OTP Code */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              Enter OTP
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="number"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your OTP code"
              />
            </div>
          </div>

          {/* Display error or success messages */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#16ADA9] hover:bg-[#00D4A2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Verify OTP
            </button>
          </div>
        </form>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          You must have cookies enabled to use this site. <br />
          <Link to={"/verify"} className="underline">
            View our Privacy Policy
          </Link>{" "}
          •{" "}
          <Link to={"/verify"} className="underline">
            Email Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
