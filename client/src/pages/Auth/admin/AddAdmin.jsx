import { useState } from "react";
import axios from "axios"; // Import Axios
import { FaEnvelope } from "react-icons/fa";
import ServerApi from "../../../api/serverApi";
import { mainLogo } from "../../../assets";

const AdAdmin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        ServerApi.addAdmin.url,
        { email },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      setLoading(false);
      setSuccess("A new Admin added successfully!!");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setLoading(false);
        setError(
          error.response.data.message ||
            "Admin added failed!! Something went wrong!"
        );
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setLoading(false);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <img src={mainLogo} alt="" className="w-1/3 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-center mb-6">Add An Admin</h2>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Adding..." : " Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdAdmin;
