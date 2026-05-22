export default function Resources() {
  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="rounded-full bg-purple-100 p-6 text-purple-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Resources</h2>
          <p className="mt-3 max-w-md text-base text-gray-500">
            Access free learning guides, templates, tutorials, and ebooks to support your growth. Coming soon!
          </p>
        </div>
      </section>
    </main>
  );
}
