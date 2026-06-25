import Header from "./Header";
import BackgroundBlobs from "./BackgroundBlobs";
import Stepper from "./Stepper";
import InfoBox from "./InfoBox";
import Link from "next/link";

export default function PortalLayout({
  activeStep,
  children,
  footer,
  blurContent = false,
}) {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundBlobs />
      <div className={`relative z-10 ${blurContent ? "blur-[2px]" : ""}`}>
        <Header />
        <div className="px-6 pb-2 lg:px-12">
          <Link
            href="/"
            className="text-[13px] font-medium text-career-purple hover:underline"
          >
            ← Back to Services
          </Link>
        </div>
        <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 pb-16 pt-4 lg:flex-row lg:gap-12 lg:px-12">
          <div className="lg:w-[38%]">
            <h1 className="text-[42px] font-bold leading-[1.15] tracking-tight text-[#212121] lg:text-[48px]">
              Career{" "}
              <span className="text-career-purple">Advantage</span>
              <br />
              Portal
            </h1>
            <p className="mt-2 text-[15px] text-[#9E9E9E]">
              Guidance • Scholarship • Success
            </p>
            <Stepper activeStep={activeStep} />
            <InfoBox />
          </div>
          <div className="flex flex-1 flex-col lg:w-[62%]">
            {children}
            {footer}
          </div>
        </main>
      </div>
    </div>
  );
}
