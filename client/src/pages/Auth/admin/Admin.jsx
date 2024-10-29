import { useState, useEffect, useRef } from "react";
import { FaRegCircleUser } from "react-icons/fa6";


import { RiLuggageDepositFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { PiHandWithdrawFill } from "react-icons/pi";

import { mainLogo } from "../../../assets";
import WithdrawDetails from "./WithdrawDetails";
import AddAdmin from "./AddAdmin";
import AllUsers from "./AllUsers";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("All-Users");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown element

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
              Admin Dashboard
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="space-y-5">
              <li
                onClick={() => handleLinkClick("All-Users")}
                className={`${
                  selectedComponent === "All-Users" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaUsers className="inline-block mr-2" /> All Users
              </li>
              <li
                onClick={() => handleLinkClick("Withdraw-Details")}
                className={`${
                  selectedComponent === "Withdraw-Details" &&
                  "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <PiHandWithdrawFill className="inline-block mr-2" /> Withdraw
                Details
              </li>
              <li
                onClick={() => handleLinkClick("Add-Admin")}
                className={`${
                  selectedComponent === "Add-Admin" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <RiLuggageDepositFill className="inline-block mr-2" /> Add Admin
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
                    onClick={() => handleLinkClick("All-Users")}
                  >
                    <FaUsers className="inline-block mr-2" /> All-Users
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Withdraw-Details")}
                  >
                    <PiHandWithdrawFill className="inline-block mr-2" />{" "}
                    Withdraw Details
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick("Add-Admin")}
                  >
                    <RiLuggageDepositFill className="inline-block mr-2" /> Add
                    Admin
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-h-[100vh] md:w-4/5 p-2 md:p-10 overflow-y-auto">
          {/* Dynamic Component Rendering */}
          {selectedComponent === "Withdraw-Details" && <WithdrawDetails />}
          {selectedComponent === "Add-Admin" && <AddAdmin />}
          {selectedComponent === "All-Users" && <AllUsers />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
