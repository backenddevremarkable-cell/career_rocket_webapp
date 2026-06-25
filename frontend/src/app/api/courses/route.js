import { handleCourses } from "@/lib/server/careerApi";

export const dynamic = "force-dynamic";

export function GET(request) {
  return handleCourses(request);
}
