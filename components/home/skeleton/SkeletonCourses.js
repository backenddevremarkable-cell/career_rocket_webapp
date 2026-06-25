const SkeletonCourses = () => {
  return (
     <div className="bg-white rounded-xl shadow-md p-4 animate-pulse h-[300px] flex flex-col">
      
      <div className="w-full h-[140px] bg-gray-300 rounded-lg mb-4"></div>

      <div className="flex gap-3 mb-3">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>

      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
      </div>

      <div style={{ marginTop : 100}} className="mt-auto h-10 w-full bg-gray-200 rounded-lg"></div>
    </div>
  );
};

export default SkeletonCourses;