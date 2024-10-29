import { useState, useEffect, useRef } from "react";
import { FaChartLine, FaRegCircleUser, FaUsers } from "react-icons/fa6";
import Overview from "./Overview";
import LeaderBoard from "./LeaderBoard";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdCardMembership } from "react-icons/md";
import Referrals from "./Referrals";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import axios from "axios";
import ServerApi from "../../api/serverApi";
import MembershipPlans from "./MembershipPlans";
import { mainLogo } from "../../assets";
import DepositForm from "./DepositForm";
import WithdrawalForm from "./WithdrawalForm";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";

const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);
  const [selectedComponent, setSelectedComponent] = useState("Overview");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locusPrice, setLocusPrice] = useState(0);
  const [cretaPrice, setCretaPrice] = useState(0);
  const dropdownRef = useRef(null); // Ref for the dropdown element
  const dispatch = useDispatch();

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    //get price
    const getPrice = async () => {
      try {
        const res1 = await axios.get(ServerApi.priceLocus.url);
        const res2 = await axios.get(ServerApi.priceCRETA.url);
        console.log(res1.data);
        setLocusPrice(res1.data.price);
        console.log(res2.data);
        setCretaPrice(res2.data.price);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(getPrice());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mouseEnter", handleClickOutside);
    return () => {
      document.removeEventListener("mouseEnter", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (component) => {
    setSelectedComponent(component);
    setDropdownOpen(false); // Close the dropdown when a link is clicked
  };

  const handleLogout = async () => {
    try {
      await axios.get(ServerApi.logout.url, {
        withCredentials: true
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="fixed md:relative  flex justify-between md:block w-full md:w-1/5 h-[70px] md:h-screen bg-[#16ADAB] p-5 px-2 ">
          <div className="flex flex-row md:flex-col justify-center items-center">
            <div className="bg-[#3D3D3D] rounded-lg w-10 h-10 md:w-20 md:h-20">
              <img src={mainLogo} alt="" className="" />
            </div>
            <h1 className="text-xl md:text-xl text-white font-bold md:mb-4 ml-4 md:ml-0">
              Affiliate Dashboard
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="space-y-5">
              <li
                onClick={() => handleLinkClick("Overview")}
                className={`${
                  selectedComponent === "Overview" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaHome className="inline-block mr-2" /> Overview
              </li>
              <li
                onClick={() => handleLinkClick("Deposit")}
                className={`${
                  selectedComponent === "Deposit" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <RiLuggageDepositFill className="inline-block mr-2" /> Deposit
              </li>
              <li
                onClick={() => handleLinkClick("LeaderBoard")}
                className={`${
                  selectedComponent === "LeaderBoard" &&
                  "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaChartLine className="inline-block mr-2" /> Leader Board
              </li>
              <li
                onClick={() => handleLinkClick("Referrals")}
                className={`${
                  selectedComponent === "Referrals" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaUsers className="inline-block mr-2" /> Referrals
              </li>
              <li
                onClick={() => handleLinkClick("Membership")}
                className={`${
                  selectedComponent === "Membership" &&
                  "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <MdCardMembership className="inline-block mr-2" /> Membership
              </li>
              <li
                onClick={() => handleLinkClick("Withdraw")}
                className={`${
                  selectedComponent === "Withdraw" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <BiMoneyWithdraw className="inline-block mr-2" /> Withdraw
              </li>
            </ul>
          </nav>
          <div className="block md:hidden  z-50">
            <div className="relative">
              <button
                className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center"
                onClick={handleDropdown}
              >
                <FaRegCircleUser />
              </button>

              {/* Dropdown Menu (visible on mobile) */}
              {dropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black "
                >
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Overview")}
                  >
                    <FaHome className="inline-block mr-2" /> Overview
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Deposit")}
                  >
                    <RiLuggageDepositFill className="inline-block mr-2" />{" "}
                    Deposit
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("LeaderBoard")}
                  >
                    <FaChartLine className="inline-block mr-2" /> Leader Board
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Referrals")}
                  >
                    <FaUsers className="inline-block mr-2" /> Referrals
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Membership")}
                  >
                    <MdCardMembership className="inline-block mr-2" />{" "}
                    Membership
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Withdraw")}
                  >
                    <BiMoneyWithdraw className="inline-block mr-2" /> Withdraw
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> Logout
                  </li>
                  {user?.isAdmin && (
                    <Link
                      to={"/admin"}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <RiAdminFill className="inline-block mr-2" /> Admin
                      DashBoard
                    </Link>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-h-[100vh] md:w-4/5 p-2 md:p-10 overflow-y-auto">
          <div className="flex flex-col mt-16 md:mt-0 md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
              {user?.username}
            </h2>
            <div className="flex space-x-3 items-center">
              <button className="bg-[#3D3D3D] text-white py-2 px-4 rounded">
                Connect Wallet
              </button>

              {/* User Icon for Mobile */}
              <div className="hidden md:block relative">
                <button
                  className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center"
                  onClick={handleDropdown}
                >
                  <FaRegCircleUser />
                </button>

                {/* Dropdown Menu (visible on mobile) */}
                {dropdownOpen && (
                  <ul
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black"
                  >
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </li>

                    {user?.isAdmin && (
                      <Link
                        to={"/admin"}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <RiAdminFill className="inline-block mr-2" /> Admin
                        DashBoard
                      </Link>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Component Rendering */}
          {selectedComponent === "Overview" && (
            <Overview cretaPrice={cretaPrice} locusPrice={locusPrice} />
          )}
          {selectedComponent === "Deposit" && <DepositForm />}
          {selectedComponent === "Withdraw" && <WithdrawalForm />}
          {selectedComponent === "LeaderBoard" && <LeaderBoard />}
          {selectedComponent === "Referrals" && <Referrals />}
          {selectedComponent === "Membership" && (
            <MembershipPlans setPage={handleLinkClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
