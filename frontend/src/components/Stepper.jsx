const steps = [
  { num: 1, title: "Student Identity", desc: "Enter your unique ID" },
  { num: 2, title: "Verification", desc: "Confirm student details" },
  { num: 3, title: "Payment", desc: "Complete transaction" },
];

export default function Stepper({ activeStep }) {
  return (
    <div className="mt-10">
      {steps.map((step, index) => {
        const isActive = step.num === activeStep;
        const isPast = step.num < activeStep;

        return (
          <div key={step.num} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-career-purple text-white"
                    : isPast
                      ? "bg-[#E0E0E0] text-[#757575]"
                      : "bg-[#EEEEEE] text-[#9E9E9E]"
                }`}
              >
                {step.num}
              </div>
              {index < steps.length - 1 && (
                <div className="my-1 h-12 w-[2px] bg-[#E0E0E0]" />
              )}
            </div>
            <div className="pb-8 pt-1.5">
              <p
                className={`text-[15px] font-semibold leading-tight ${
                  isActive
                    ? "text-[#212121]"
                    : isPast
                      ? "text-[#757575]"
                      : "text-[#BDBDBD]"
                }`}
              >
                {step.title}
              </p>
              <p
                className={`mt-0.5 text-[13px] ${
                  isActive ? "text-[#9E9E9E]" : "text-[#BDBDBD]"
                }`}
              >
                {step.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
