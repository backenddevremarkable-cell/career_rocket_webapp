import { apiJson, readRequestJson } from "@/lib/server/careerApi";

export async function POST(request) {
  const data = await readRequestJson(request);
  return apiJson({ success: true, data });
}
