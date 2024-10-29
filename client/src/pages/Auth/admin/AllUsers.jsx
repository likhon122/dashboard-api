import { useEffect, useState } from "react";
import axios from "axios";
import ServerApi from "../../../api/serverApi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the server
    axios
      .get(ServerApi.allUsers.url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10 md:mt-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        User Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Email
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Public Key
              </th>
              <th className="px-4 py-2 border-b text-xs md:text-sm lg:text-base">
                Private Key
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 text-xs md:text-sm lg:text-base"
                >
                  <td className="px-4 py-2 border-b text-center">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {user.publicKey}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {user.privateKey}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No user data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
