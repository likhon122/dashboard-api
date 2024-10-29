const LeaderBoard = () => {
  // Sample data for the leaderboard based on referrals, including earnings
const users = [
  { rank: 1, name: "Alice", referrals: 100, earnings: "$20000" },
  { rank: 2, name: "Bob", referrals: 95, earnings: "$19000" },
  { rank: 3, name: "Charlie", referrals: 90, earnings: "$18000" },
  { rank: 4, name: "David", referrals: 85, earnings: "$17000" },
  { rank: 5, name: "Eve", referrals: 80, earnings: "$16000" },
  { rank: 6, name: "Frank", referrals: 75, earnings: "$15000" },
  { rank: 7, name: "Grace", referrals: 70, earnings: "$14000" },
  { rank: 8, name: "Hannah", referrals: 65, earnings: "$13000" },
  { rank: 9, name: "Isaac", referrals: 60, earnings: "$12000" },
  { rank: 10, name: "Jack", referrals: 55, earnings: "$11000" },
  { rank: 11, name: "Karen", referrals: 50, earnings: "$10000" },
  { rank: 12, name: "Leo", referrals: 45, earnings: "$9000" },
  { rank: 13, name: "Mia", referrals: 40, earnings: "$8000" },
  { rank: 14, name: "Noah", referrals: 35, earnings: "$7000" },
  { rank: 15, name: "Olivia", referrals: 30, earnings: "$6000" },
  { rank: 16, name: "Paul", referrals: 25, earnings: "$5000" },
  { rank: 17, name: "Quinn", referrals: 20, earnings: "$4000" },
  { rank: 18, name: "Ruby", referrals: 15, earnings: "$3000" },
  { rank: 19, name: "Sam", referrals: 10, earnings: "$2000" },
  { rank: 20, name: "Tom", referrals: 5, earnings: "$1000" },
];


  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-xl md:text-3xl font-bold text-center text-gray-700 mb-5">
        Referral Leader board
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-3 px-2 md:py-3 md:px-5 text-left text-gray-600 font-semibold">
              Rank
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left text-gray-600 font-semibold">
              User
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left text-gray-600 font-semibold">
              Referrals
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left text-gray-600 font-semibold">
              Earnings
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rank} className="border-b border-gray-200">
              <td className="py-3 px-2 md:py-3 md:px-5 text-gray-700">
                {user.rank}
              </td>
              <td className="py-3 md:py-3 md:px-5 text-gray-700">
                {user.name}
              </td>
              <td className=" py-3 md:py-3 md:px-5 text-gray-700">
                {user.referrals}
              </td>
              <td className="py-3 md:py-3 md:px-5 text-gray-700">
                {user.earnings}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
