import { FiSearch } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  
  return (
    <section className="hero-bg relative pt-32 pb-24 text-center">

      <div className="max-w-5xl mx-auto px-6">

        <div className="inline-block px-4 py-2 bg-purple-100  text-purple-600 text-primary rounded-full text-xs font-bold">
          SCIENCE + HUMAN INTELLIGENCE
        </div>

        <h1 className="mt-8 text-4xl md:text-6xl font-bold text-gray-800">
          Find the career you were
        </h1>

         <h1 className="text-4xl md:text-6xl font-bold gradient-text mt-3">
            <Typewriter
              words={[
                "born to lead.",
                "born to innovate.",
                "born to create.",
                "born to inspire.",
                "born to build."
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
        />
      </h1>

        {/* Search */}
        <div className="search-wrapper  mt-10">
          <input
            type="text"
            placeholder="Search for careers, skills, or industries..."
            className="search-input"
          />
          <button className="search-btn">
            <FiSearch className="mr-2" /> Search
          </button>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="pill gray">All</span>
          <span className="pill pink">Technology</span>
          <span className="pill green">Healthcare</span>
          <span className="pill orange">Business</span>
          <span className="pill purple">Creative</span>
          <span className="pill blue">Engineering</span>
        </div>

      </div>
    </section>
  );
}