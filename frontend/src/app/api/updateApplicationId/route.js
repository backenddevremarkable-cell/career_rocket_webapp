import { forwardToBackendRoute } from "@/lib/server/careerApi";

export async function POST(request) {
  return forwardToBackendRoute("updateApplicationId", request);
}
