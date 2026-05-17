import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#4b0a68] rounded-2xl py-16 px-6 text-center shadow-xl">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Start Your Learning Journey Today
          </h2>

          {/* Subtext */}
          <p className="text-purple-100 mt-4 max-w-2xl mx-auto">
            Join over 1,200 professionals and students who have already begun
            mastering behavioral psychometrics with us.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            
            <Link href={"/career-library"} className="bg-white text-purple-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Start Career Assessment →
            </Link>

            <Link href={"/career-library"} className="border border-white text-white px-6 py-3 rounded-lg hover:bg-gray-100  transition">
              Explore Careers
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}