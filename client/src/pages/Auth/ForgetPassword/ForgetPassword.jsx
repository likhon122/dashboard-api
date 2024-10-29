import axios from "axios";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../../../api/serverApi";
import { mainLogo } from "../../../assets";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 
    
    try {
      setLoading(true);
      const response = await axios.post(ServerApi.forgotPassword.url, formData);

      console.log(response);
      setFormData({
        email: "",
      });

      setLoading(false);
      setSuccess(response.data.msg);
      navigate(`/reset-password/${formData.email}`);
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
        <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* New Code */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newCode"
            >
              Enter your email
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <AiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="text"
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

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#16ADA9] hover:bg-[#00D4A2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgetPassword;
