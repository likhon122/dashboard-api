import { useEffect, useState } from "react";
import { locus, sreta } from "../../assets";
import { useSelector } from "react-redux";

const getMemberShipLevel = (amount) => {
  if (amount >= 5000) {
    return "Gold";
  } else if (amount >= 2000) {
    return "Silver";
  } else if (amount >= 500) {
    return "Bronze";
  } else {
    return "Free";
  }
};

// eslint-disable-next-line react/prop-types
function Overview({ cretaPrice, locusPrice }) {
  const { user } = useSelector((state) => state?.user);
  const [currentValue, setCurrentValue] = useState(384000);
  const targetValue = 1200000;
  const progressPercentage = ((currentValue / targetValue) * 100).toFixed(2);

  useEffect(() => {
    setCurrentValue(user?.depositAmount);
  }, [user]);

  const [usdtValue, setUsdtValue] = useState(""); // State to store the input value

  // Handle change for input
  const handleInputChange = (e) => {
    setUsdtValue(e.target.value);
  };

  // Handle the buy button click
  const handleBuyClick = () => {
    alert(`You are buying with ${usdtValue} USDT`);
  };

  return (
    <>
      {/* Overview Section */}
      <div className="my-8">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <div className="p-5 bg-[#16ADAB] rounded-lg shadow-lg">
            <h4 className="text-white">Account Balance</h4>
            <p className="text-2xl font-bold text-white">
              ${user?.depositAmount}
            </p>
            <a href="#" className="text-white">
              View all
            </a>
          </div>
          <div className="p-5 bg-[#3D3D3D] rounded-lg shadow-lg">
            <h4 className="text-white">The total referral reward</h4>
            <p className="text-white text-2xl font-bold">{user?.referBonus}</p>
            <a href="#" className="text-[#16ADAB]">
              View all
            </a>
          </div>
          <div className="p-5 bg-[#3D3D3D] rounded-lg shadow-lg">
            <h4 className="text-white">Current memebership level</h4>
            <p className="text-white text-2xl font-bold">
              {getMemberShipLevel(user?.depositAmount)}
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-md border border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-600 font-semibold">
                Progress {progressPercentage}%
              </h2>
            </div>

            <div className="mt-2">
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-3.5 mb-2 relative">
                <div
                  className="bg-green-500 h-3.5 rounded-full absolute top-0 left-0 "
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={targetValue}
                  value={currentValue}
                  className="absolute top-[-8px] left-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Values */}
              <div className="flex justify-between text-sm text-gray-700">
                <span>{currentValue?.toLocaleString()} USDT</span>
                <span>{targetValue?.toLocaleString()} USDT</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-md">
            {/* Left Section with Logos and Percentages */}
            <div className="flex items-center">
              {/* LOCUS Token */}
              <div className="flex flex-col items-center mr-2">
                <div className="text-sm text-gray-700 font-semibold">50%</div>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                  {/* LOCUS Token Image (Replace with actual image if needed) */}
                  <img src={locus} alt="$LOCUS" className="w-8 h-8" />
                </div>
                <span className="text-xs text-gray-500 mt-1">$LOCUS</span>
              </div>

              {/* Plus Sign */}
              <span className="text-xl font-semibold text-gray-600 mx-2">
                +
              </span>

              {/* CRETA Token */}
              <div className="flex flex-col items-center ml-2">
                <div className="text-sm text-gray-700 font-semibold">50%</div>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                  {/* CRETA Token Image (Replace with actual image if needed) */}
                  <img src={sreta} alt="$CRETA" className="w-8 h-8" />
                </div>
                <span className="text-xs text-gray-500 mt-1">$CRETA</span>
              </div>
            </div>

            {/* Right Section with Input and Button */}
            <div className="flex flex-col items-center">
              {/* USDT Input Field */}
              <input
                type="number"
                placeholder="USDT"
                value={usdtValue}
                onChange={handleInputChange}
                className="w-28 sm:w-32   bg-[#3D3D3D] text-white text-center font-bold px-3 py-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Buy Button */}
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
                onClick={handleBuyClick}
              >
                BUY NOW
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-md">
            {/* Left Section with Logos and Percentages */}
            {/* show prices */}
            <div>
              <p>CRETA</p>
              <p>${Number(cretaPrice).toFixed(5)}</p>
              <p>{Number(user?.CRETABalance).toFixed(5)}</p>
            </div>
            <div>
              <p>LOCUS</p>
              <p>${Number(locusPrice).toFixed(5)}</p>
              <p>{Number(user?.LOCUSBalance).toFixed(5)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="my-8">
        <h3 className="text-lg font-semibold">Recent activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-[.1rem]  md:py-3 md:px-4 text-center md:text-left ">
                  Transaction
                </th>
                <th className="py-2 md:py-3 md:px-4 text-center md:text-left ">
                  Amount
                </th>
                <th className="py-2 md:py-3 md:px-4 text-center md:text-left ">
                  Status
                </th>
                <th className="py-2 md:py-3 md:px-4 text-center md:text-left ">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-[.1rem]  md:py-3 md:px-4 text-[.8rem] md:text-base text-center md:text-left">
                  Payment from Molly Sanders
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.8rem] md:text-base text-center md:text-left">
                  $20,000 USD
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.8rem] md:text-base text-[#16ADAB] text-center md:text-left">
                  Success
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.7rem] md:text-base  text-center md:text-left">
                  October 23, 2024
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-[.1rem]  md:py-3 md:px-4 text-[.8rem] md:text-base text-center md:text-left">
                  Payment to Doug Mann
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.8rem] md:text-base text-center md:text-left">
                  $14,200 USD
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.8rem] md:text-base text-yellow-500 text-center md:text-left">
                  Processing
                </td>
                <td className="py-2 md:py-3 md:px-4 text-[.7rem] md:text-base text-center  md:text-left">
                  October 23, 2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Overview;
