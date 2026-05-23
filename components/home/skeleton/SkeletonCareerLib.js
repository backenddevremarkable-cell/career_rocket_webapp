const SkeletonCareerLib = () => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[10px]
        bg-white/90
        backdrop-blur-lg
        border border-gray-100
        p-5
        animate-pulse
      "
    >
      {/* Top Badge Skeleton */}
      <div className="absolute top-4 right-4 z-20">
        <div className="h-5 w-20 rounded-full bg-slate-200" />
      </div>

      {/* Image Container Skeleton */}
      <div className="relative z-10 flex items-center justify-center h-44">
        <div
          className="
            w-32 h-32
            rounded-full
            bg-slate-200/60
            flex items-center justify-center
          "
        >
          {/* Inner placeholder */}
          <div className="w-24 h-24 rounded-full bg-slate-200/30" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="relative z-10 text-center mb-4 flex flex-col items-center justify-center">
        <div className="h-5 bg-slate-200 rounded-md w-[70%] mt-6"></div>
      </div>
    </div>
  );
};

export default SkeletonCareerLib;