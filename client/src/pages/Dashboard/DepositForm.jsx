import { useState } from "react";
import { useSelector } from "react-redux";

const DepositForm = () => {
  // State variables

  const [network, setNetwork] = useState("");
  const [depositAddress, setDepositAddress] = useState("");

  const { user } = useSelector((state) => state?.user);
  console.log(user);

  // Dummy deposit addresses for each network
  const depositAddresses = {
    BEP20: user?.publicKey,
    TRC20: user?.publicKeyTrc20
  };

  // Handle network change
  const handleNetworkChange = (e) => {
    const selectedNetwork = e.target.value;
    setNetwork(selectedNetwork);
    // Set deposit address based on selected network
    setDepositAddress(depositAddresses[selectedNetwork]);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full  max-w-lg mx-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center">Deposit Form</h2>

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
          <label className="block text-sm font-medium text-gray-700 mb-2 ">
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

        {/* Display Deposit Address */}
        {depositAddress && (
          <div className="bg-gray-100 p-4 rounded-md border mt-4 text-center">
            <p className="text-sm text-gray-700 mb-2">Deposit Address</p>
            <p className="text-gray-800 font-semibold break-all">
              {depositAddress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositForm;
