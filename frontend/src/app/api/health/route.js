import { apiJson } from "@/lib/server/careerApi";

export function GET() {
  return apiJson({ status: "ok", service: "Career Rocket Next.js API" });
}
