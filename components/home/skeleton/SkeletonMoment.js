const SkeletonMoment = ({ isActive }) => {
  return (
      <div
      className={`transition-all duration-500 rounded-2xl overflow-hidden ${
        isActive ? "scale-110 z-10" : "scale-90 opacity-50"
      }`}
    >
      <div className="w-[260px] h-[360px] bg-gray-300 animate-pulse rounded-2xl"></div>
    </div>
  );
};

export default SkeletonMoment;