const SkeletonCareerLib = () => {
  return (
     <div className="bg-[#f5f3f8] min-h-screen p-10">
        <div className="w-[260px] rounded-2xl bg-white shadow-md p-6 animate-pulse">
            
            {/* Image Skeleton */}
            <div className="w-[160px] h-[160px] bg-gray-200 rounded-2xl mx-auto"></div>

            {/* Title Skeleton */}
            <div className="h-5 bg-gray-200 rounded-md w-[120px] mx-auto mt-6"></div>

            {/* Count Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-[40px] mx-auto mt-4"></div>

        </div>
        </div>
  );
};

export default SkeletonCareerLib;