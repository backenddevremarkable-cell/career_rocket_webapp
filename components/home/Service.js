import { ImUserTie } from "react-icons/im";

const services = [
  { title: "Career Counselling & Guidance" },
  { title: "Study Abroad & IELTS Training" },
  { title: "Institutional Partnerships & Career Cells" },
  { title: "EdTech Platforms & LMS Courses" },
  { title: "Events & Innovation" },
  { title: "Entrepreneurship & Incubation" },
  { title: "Publishing & Media Content" },
  { title: "Government & CSR Partnerships" },
];

export default function Services() {
  return (
    <section className="py-20 bg-[#f6f4f8] px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="text-gray-500 mt-3">
            Comprehensive support for every stage of your career journey,
            from discovery to placement.
          </p>
        </div>

        {/* Cards */}
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mt-14">
          {services.map((item, i) => (
            <div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <ImUserTie/>
              </div>

              <h3 className="font-semibold text-gray-900 text-[15px] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                We offer psychometric assessments, personalized counselling,
                career workshops, and complete roadmap planning from aptitude
                analysis to goal tracking.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}