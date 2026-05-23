"use client";
import { withAuth } from '../../utils/withAuth';
function Skilltest() {
  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="rounded-full bg-purple-100 p-6 text-purple-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Skill Test</h2>
          <p className="mt-3 max-w-md text-base text-gray-500">
            Assess your coding, technical, design, or professional skills with time-bound interactive assessments. Coming soon!
          </p>
        </div>
      </section>
    </main>
  );
}

export default withAuth(Skilltest);