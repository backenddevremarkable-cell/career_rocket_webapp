import { Suspense } from "react";
 
import Step2DetailsPage from "../step-2/page";

export default function TransactionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-career-purple">
          Loading transactions...
        </div>
      }
    >
     
      <Step2DetailsPage />
    </Suspense>
  );
}
