const SkeletonCareerSub = () => {
  return (<>
  
       <section
          className="
          relative w-full
          h-[180px]
          sm:h-[220px]
          md:h-[280px]
          lg:h-[350px]
          xl:h-[260px]
          overflow-hidden">
  
  {/* Background */}
  <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

  {/* Shimmer Effect */}
  <div
    className="
    absolute inset-0
    -translate-x-full
    animate-[shimmer_2s_infinite]
    bg-gradient-to-r
    from-transparent
    via-white/40
    to-transparent
  "
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/10"></div>

  {/* Center Content Skeleton */}
  <div className="absolute inset-0 flex items-center justify-center">
    
    <div className="space-y-4 text-center">
      
      <div className="h-10 w-72 rounded-2xl bg-white/40 mx-auto"></div>

      <div className="h-4 w-48 rounded-full bg-white/30 mx-auto"></div>
    </div>

  </div>
</section>

    <section className="relative bg-gradient-to-b from-[#F6F4F8] to-[#f7f7f7] py-3   sm:py-5   md:py-8   lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden animate-pulse">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="
            relative overflow-hidden
            rounded-[32px]
            border border-white/40
            bg-white/80
            backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            p-6 md:p-8 lg:p-10
          "
          >

            {/* shimmer */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

            <div className="grid lg:grid-cols-3 gap-10">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-2">

                {/* Badge */}
                <div className="h-9 w-32 rounded-full bg-gray-200 mb-5"></div>

                {/* Title */}
                <div className="space-y-3">
                  <div className="h-10 w-[80%] rounded-xl bg-gray-200"></div>
                  <div className="h-10 w-[60%] rounded-xl bg-gray-200"></div>
                </div>

                {/* Summary */}
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-[95%] rounded bg-gray-200"></div>
                  <div className="h-4 w-[85%] rounded bg-gray-200"></div>
                </div>

                {/* Salary Box */}
                <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="h-6 w-40 rounded bg-gray-200 mb-4"></div>

                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200"></div>
                    <div className="h-4 w-[90%] rounded bg-gray-200"></div>
                    <div className="h-4 w-[75%] rounded bg-gray-200"></div>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-8">
                  <div className="h-14 w-52 rounded-2xl bg-gray-300"></div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-5">

                {/* Demand Card */}
                <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-md">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-10 w-24 rounded bg-gray-300"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section> </>
  );
};

export default SkeletonCareerSub;