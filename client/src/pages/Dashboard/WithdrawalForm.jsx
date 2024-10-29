import axios from "axios";
import { useState } from "react";
import ServerApi from "../../api/serverApi";

import { useSelector } from "react-redux";

const WithdrawalForm = () => {
  // State variables
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  // Handle network change
  const handleNetworkChange = (e) => {
    setNetwork(e.target.value);
  };

  // Handle form submission (Example logic, replace with actual API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!network || !amount || !destinationAddress) {
      alert("Please fill out all fields.");
      return;
    }

    // API call can be made here with the data
    console.log("Network:", network);
    console.log("Amount:", amount);
    console.log("Destination Address:", destinationAddress);

    const formData = {
      tokenType: "USDT",
      network,
      amount,
      address: destinationAddress,
      email: user?.email
    };

    try {
      setLoading(true);
      await axios.post(ServerApi.makeWithdrawal.url, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      setLoading(false);

      setSuccessData(
        "Withdrawal request submitted. Soon your request is approved!!"
      );
      setNetwork("");
      setAmount("");
      setDestinationAddress("");

      setTimeout(() => {
        setSuccessData("");
      }, 4000);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setErrorData("Withdrawal request Failed");
        setTimeout(() => {
          setErrorData("");
        }, 4000);
      } else {
        setLoading(false);
        setErrorData("Withdrawal request Failed");
        setTimeout(() => {
          setErrorData("");
        }, 4000);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Withdraw Form</h2>
        {errorData && (
          <p className="text-red-500 text-center mb-3">{errorData}</p>
        )}
        {successData && (
          <p className="text-green-500 text-center mb-3">{successData}</p>
        )}
        {/* Select Token */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token
          </label>
          <select className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600 cursor-pointer">
            <option>USDT</option>
          </select>
        </div>

        {/* Select Network */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Network
          </label>
          <select
            value={network}
            onChange={handleNetworkChange}
            className="w-full px-4 py-2 border rounded-md cursor-pointer"
          >
            <option value="">-- Select Network --</option>
            <option value="BEP20">BEP20</option>
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount (USDT)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter amount"
          />
        </div>

        {/* Destination Address Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Destination Address
          </label>
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter destination address"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-[#16ADAB] text-white font-bold rounded-lg mt-4 hover:bg-[#0e8787]"
        >
          {loading ? "Withdrawal requesting..." : "Withdraw"}
        </button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
