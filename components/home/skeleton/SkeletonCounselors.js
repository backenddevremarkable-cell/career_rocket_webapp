const SkeletonCounselors = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center animate-pulse">
      
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>

        {/* Rating badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-gray-400 rounded-full"></div>
      </div>

      {/* Name */}
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>

      {/* Experience */}
      <div className="h-3 w-24 bg-gray-200 rounded mb-4"></div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCounselors;