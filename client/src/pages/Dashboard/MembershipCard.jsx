/* eslint-disable react/prop-types */

const MembershipCard = ({
  plan,
  price,
  icon,
  background,
  badge,
  description,
  membershipBtn,
  setPage,
}) => {
  return (
    <div className="">
      <div
        onClick={() => setPage("Overview")}
        className={` flex flex-col justify-around items-center p-6 border-2 rounded-xl ${background} shadow-lg md:transition-transform md:transform md:hover:scale-105 md:w-64 md:h-96 cursor-pointer`}
      >
        <div className="w-full flex items-end justify-end">
          {badge && (
            <span className=" bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <div className="text-5xl mb-4">{icon}</div>
        <div className="w-full flex justify-around items-center flex-col">
          <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
          <hr className="w-1/2" />
          <p className="text-white text-4xl font-semibold mb-4">
            {price}
            <br />
            <span className="text-sm text-center block">per month</span>
          </p>
        </div>
        <p className="text-white text-sm text-center px-2 mb-4">
          {description}
        </p>
        <button className="px-4 py-2 bg-white text-[#16ADAB] font-bold rounded-lg">
          {membershipBtn}
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;
