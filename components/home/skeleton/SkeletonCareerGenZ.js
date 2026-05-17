const SkeletonCareerGenZ = ({ isActive }) => {
  return (<>
        {[...Array(8)].map((_, index) => (
            <div
            key={index}
            className="relative bg-white rounded-[28px] p-6 h-[300px] overflow-hidden border border-gray-100"
            >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-100/60 to-transparent" />

            {/* Badge */}
            <div className="flex justify-end">
                <div className="h-7 w-20 rounded-full bg-gray-200" />
            </div>

            {/* Icon */}
            <div className="mt-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-200" />
            </div>

            {/* Title */}
            <div className="mt-8 space-y-3">
                <div className="h-7 w-52 rounded-md bg-gray-200" />
                <div className="h-4 w-40 rounded-md bg-gray-200" />
            </div>

            {/* Description */}
            <div className="mt-8 space-y-2">
                <div className="h-4 w-full rounded-md bg-gray-200" />
                <div className="h-4 w-3/4 rounded-md bg-gray-200" />
            </div>
            </div>
        ))}
       </>
  );
};

export default SkeletonCareerGenZ;