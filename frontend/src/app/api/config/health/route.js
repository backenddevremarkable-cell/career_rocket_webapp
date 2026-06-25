
 import { jsonResponse } from "@/lib/server/apiHelpers";
 import config from "@/app/api/config/config";
 
 export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
 
 export async function GET() {
   try {
    const { getSequelize } = await import("@/app/api/config/database");
    const sequelize = await getSequelize();
     await sequelize.authenticate();

     return jsonResponse({
       status: "ok",
       environment: process.env.NODE_ENV || "development",
       database: "connected",
       config: {
         DB_HOST: config.DB_HOST,
         DB_NAME: config.DB_NAME,
       },
     });
   } catch (error) {
     return jsonResponse({ status: "error", error: String(error.message || error) }, 500);
   }
 }
