export default function Community() {
  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="rounded-full bg-purple-100 p-6 text-purple-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Community</h2>
          <p className="mt-3 max-w-md text-base text-gray-500">
            Connect with other students, mentors, and experts to boost your career. Coming soon!
          </p>
        </div>
      </section>
    </main>
  );
}
