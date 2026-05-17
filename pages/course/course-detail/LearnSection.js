import {
  Brain,
  BarChart3,
  ShieldCheck,
  Users,
  Scale,
  FlaskConical,
} from "lucide-react";

const learnItems = [
  {
    icon: Brain,
    title: "Introduction to Psychometrics",
    desc: "Understanding the historical context and the core pillars of psychological measurement science.",
  },
  {
    icon: BarChart3,
    title: "Behavioral Assessment Basics",
    desc: "Learning to identify key behavioral indicators and developing basic observation frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability & Validity",
    desc: "Mastering the statistical safeguards that ensure your assessments are accurate and consistent.",
  },
  {
    icon: Users,
    title: "Item Response Theory",
    desc: "Diving into modern test theory and how individual responses correlate with underlying traits.",
  },
  {
    icon: Scale,
    title: "Ethics in Testing",
    desc: "Navigating the moral landscape of assessment, privacy, and data bias in behavioral science.",
  },
  {
    icon: FlaskConical,
    title: "Applied Data Analysis",
    desc: "Hands-on experience interpreting psychometric reports and translating data into insights.",
  },
];

export default function LearnSection() {
  return (
    <section className="w-full bg-[#fff]  py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What You Will{" "}
          <span className="text-purple-700">Learn</span>
        </h2>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          A curriculum designed to take you from foundational concepts to complex behavioral analysis.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {learnItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className="text-center">
                
                {/* Icon */}
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-purple-100 text-purple-700 rounded-full mb-4">
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 max-w-xs mx-auto">
                  {item.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}