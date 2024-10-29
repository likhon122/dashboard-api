import { useEffect, useState } from "react";
import axios from "axios";
import ServerApi from "../../../api/serverApi";

const WithdrawDetails = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(ServerApi.getWithdrawalsDetails.url, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        setWithdrawals(response.data.withdrawals);
      } catch (error) {
        console.error("Error fetching withdrawal data:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const deleteWithdrawal = async (id) => {
    console.log(id);
    const deleteId = { id };

    try {
      await axios.delete(`${ServerApi.deleteWithdrawal.url}`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
        data: deleteId // Pass the ID as data for axios.delete
      });

      // Remove the deleted withdrawal from the state to update the UI
      setWithdrawals((prevWithdrawals) =>
        prevWithdrawals.filter((withdrawal) => withdrawal.id !== id)
      );

      console.log(`Withdrawal with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting withdrawal:", error);
    }
  };

  const deleteWithdrawalPopup = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this withdrawal Details?"
    );

    if (isConfirmed) {
      deleteWithdrawal(id);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10 md:mt-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Withdrawal Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
             
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Email
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Token Type
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Network
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Amount
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Address
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Created At
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? (
              withdrawals.map((withdrawal) => (
                <tr
                  key={withdrawal.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-200 text-xs md:text-sm lg:text-base"
                >
                  
                  <td className="px-4 py-6 border-b text-center">
                    {withdrawal.email}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    {withdrawal.tokenType}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    {withdrawal.network}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    {withdrawal.amount}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    {withdrawal.address}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    {new Date(withdrawal.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-6 border-b text-center">
                    <button
                      onClick={() => deleteWithdrawalPopup(withdrawal.id)}
                      className="text-white font-bold font-sans text-[16px] px-2 py-1 rounded-lg hover:bg-red-700 duration-300 bg-red-500 "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No withdrawal data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawDetails;
