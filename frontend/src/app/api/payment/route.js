import { handlePayment } from "@/lib/server/careerApi";

export async function POST(request) {
  return handlePayment(request);
}
