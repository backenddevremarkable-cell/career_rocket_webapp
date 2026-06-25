const SkeletonService = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center animate-pulse">
      
      {/* Icon */}
      <div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-4"></div>

      {/* Title */}
      <div className="h-4 w-40 bg-gray-300 rounded mx-auto mb-3"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6 mx-auto"></div>
      </div>
    </div>
  );
};

export default SkeletonService;