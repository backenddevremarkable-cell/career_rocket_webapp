import { handleDecryptEncData } from "@/lib/server/decryptEmitraRequest";
 
 export const runtime = "nodejs";
export async function POST(request) {
  return handleDecryptEncData(request);
}
