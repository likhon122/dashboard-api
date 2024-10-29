import { FaRocket, FaBriefcase, FaMedal, FaTruck } from "react-icons/fa";
import MembershipCard from "./MembershipCard";

const plans = [
  {
    plan: "BRONZE",
    price: "$500",
    icon: <FaRocket className="text-[#fff]" />,
    background: "bg-gradient-to-b from-purple-500 to-purple-700",
    description:
      "Invest $500 or more to reach Bronze rank with 1st tier referral commissions.",
    membershipBtn: "Bronze membership",
  },
  {
    plan: "SILVER",
    price: "$2000",
    icon: <FaBriefcase className="text-[#fff]" />,
    background: "bg-gradient-to-b from-orange-500 to-red-500",
    badge: "Best",
    description:
      "Invest $2,000-$4,999 to reach Silver rank with 2nd tier referral commissions.",
    membershipBtn: "Silver membership",
  },
  {
    plan: "GOLD",
    price: "$5000",
    icon: <FaMedal className="text-[#fff]" />,
    background: "bg-gradient-to-b from-green-500 to-green-700",
    description:
      "Invest $5,000 or more to reach Gold rank with 3rd tier referral commissions.",
    membershipBtn: "Gold membership",
  },
];

const MembershipPlans = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center py-16 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Our Membership Plans</h2>
      <div className="flex flex-wrap justify-center gap-6  ">
        <div
          onClick={() => setPage("Overview")}
          className={`flex flex-col justify-around items-center p-6 border-2 rounded-xl  shadow-lg md:transition-transform md:transform md:hover:scale-105 md:w-64 md:h-96 cursor-pointer `}
        >
          <div className="text-5xl mb-4">
            <FaTruck className="text-[#16ADAB]" />
          </div>
          <div className="w-full flex justify-around items-center flex-col">
            <h3 className="text-2xl font-bold text-[#16ADAB] mb-2">FREE</h3>
            <hr className="w-1/2 " />
            <p className="text-[#16ADAB] text-4xl font-semibold mb-4">
              $0.00
              <br />
              <span className="text-sm text-center block text-[#16ADAB]">
                per month
              </span>
            </p>
          </div>
          <p className="text-[#16ADAB] text-sm text-center px-2 mb-4 ">
            Start with a free membership and upgrade by investing a minimum of
            $500.
          </p>
          <button className="px-4 py-2 bg-white text-[#16ADAB] font-bold rounded-lg">
            Free Membership
          </button>
        </div>
        {plans.map((plan, index) => (
          <MembershipCard key={index} {...plan} setPage={setPage} />
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
