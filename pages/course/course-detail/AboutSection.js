import aboutImg from "../../../assets/images/about.webp";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About This{" "}
            <span className="text-purple-700">Course</span>
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            The Foundations of Behavioral Psychometrics program is designed
            to provide a comprehensive entry point into the world of
            psychological measurement. We bridge the gap between abstract
            theory and practical application, ensuring you understand not
            just the 'how', but the 'why' behind behavioral data.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Whether you're aiming to refine your academic research skills or
            enhance your professional toolkit in HR and organizational
            development, this course provides the analytical rigor required
            in today's data-driven landscape.
          </p>

          {/* LIST */}
          <div className="mt-6 space-y-3">
            {[
              "Behavioral foundations & theory",
              "Core psychometric measurement principles",
              "Applied understanding in real-world scenarios",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-purple-700 text-white rounded-full text-sm">
                  ✓
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image src={aboutImg} alt="about course" className="w-full h-full object-cover"/>
          </div>
        </div>

      </div>
    </section>
  );
}