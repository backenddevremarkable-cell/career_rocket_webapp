 const SkeletonStories = () => {
    return ( <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">

    {/* TEXT */}
    <div className="p-6 space-y-3 min-h-[200px]">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        <div className="h-3 bg-gray-200 rounded w-3/6"></div>
    </div>

    {/* FOOTER */}
    <div className="flex items-center justify-between p-5 border-t border-gray-200">
        
        <div className="flex items-center gap-3">
        {/* avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>

        {/* name + role */}
        <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        </div>

        {/* quote icon */}
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
    </div>
    </div>
)}  

export default SkeletonStories;