import { handleStudentLogin } from "@/lib/server/careerApi";

export async function POST(request) {
  return handleStudentLogin(request);
}
