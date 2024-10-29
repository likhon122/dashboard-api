import { useState } from "react";
import {
  FaUserFriends,
  FaLink,
  FaChartPie,
  FaRegCopy,
  FaCheck
} from "react-icons/fa";
import { useSelector } from "react-redux";
const baseUrl = `${window.location.protocol}//${window.location.host}/`;
const Referrals = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useSelector((state) => state?.user);

  const handleCopy = () => {
    console.log(user);
    const referralLink = `${baseUrl}sign-up?ref=${user?.referCode}`;

    console.log(referralLink);
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="bg-white p-1 md:p-6 rounded-lg mt-5 shadow-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Referrals</h2>
        <p className="text-gray-500">
          Share your referral link and earn rewards.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Total Referrals */}
        <div className="bg-[#3D3D3D] text-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex  flex-col">
            <div className="flex items-center">
              <FaUserFriends className="text-2xl mr-4" />
              <h3 className="text-xl font-semibold">Total Referrals</h3>
            </div>
            <p className="text-3xl font-bold">{user?.referCount}</p>
          </div>
        </div>

        {/* Referral Earnings */}
        <div className="bg-[#16ADAB] text-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <FaChartPie className="text-3xl mr-4" />
              <h3 className="text-xl font-semibold">Referral Earnings</h3>
            </div>
            <p className="text-xl font-bold">$1,250</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-[#707070] text-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <FaLink className="text-xl mr-4" />
              <h3 className="text-lg md:text-xl font-semibold">
                Your Referral Link
              </h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white text-[#707070] px-2 py-2 md:px-4 md:py-2 rounded-lg flex items-center"
          >
            {isCopied ? (
              <>
                <FaCheck className="mr-2" />
                Copied
              </>
            ) : (
              <>
                <FaRegCopy className="mr-2" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Referral Progress */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Referral Progress</h3>
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-300">
            <div
              style={{ width: "75%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#16ADAB]"
            ></div>
          </div>
          <p className="text-right text-sm font-semibold text-gray-700">
            75% to next reward
          </p>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
