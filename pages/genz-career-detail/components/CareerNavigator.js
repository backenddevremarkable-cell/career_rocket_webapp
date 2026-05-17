"use client";


export default function CareerNavigator(props) {

  const entryLevel = props?.entryLevel
  const midLevel = props?.midLevel
  const seniorLevel = props?.seniorLevel

  const roadmap = [
    {
      step: "1",
      title: entryLevel?.heading,
      desc: entryLevel?.description,
      salary: entryLevel?.salary,
      experience: entryLevel?.experience
    },
    {
      step: "2",
      title: midLevel?.heading,
      desc: midLevel?.description,
      salary: midLevel?.salary,
      experience: midLevel?.experience
    },
    {
      step: "3",
      title: seniorLevel?.heading,
      desc: seniorLevel?.description,
      salary: seniorLevel?.salary,
      experience: seniorLevel?.experience
    },
  ];

  return (
    <section className="py-0 bg-[#faf7fc] px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-gray-900">
          Career Navigators
        </h2>

        <div className="relative mt-24">
          <div className="absolute left-[22px] top-0 w-[2px] h-full bg-primary from-fuchsia-500 to-violet-300"></div>

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div key={index} className="relative flex gap-8">

                <div className="relative z-10 min-w-[44px] h-[44px] rounded-xl bg-primary from-fuchsia-600 to-violet-700 text-white flex items-center justify-center font-bold shadow-lg">
                  {item.step}
                </div>

                <div className="flex-1 bg-white rounded-[12px] p-10 shadow-sm border border-gray-100  transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-5 leading-8">
                    {item.desc}
                  </p>

                  <div className="flex gap-6 mt-6">
                    <span className="color-primary font-semibold">
                      {item?.experience} Years
                    </span>

                    <span className="color-primary font-semibold">
                      {item.salary}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}