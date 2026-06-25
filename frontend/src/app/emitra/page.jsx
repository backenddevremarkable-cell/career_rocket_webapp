import AppLayout from "@/components/AppLayout";
import EmitraDecryptPreview from "@/components/EmitraDecryptPreview";
import { processEmitraCallbackOnServer } from "@/lib/server/emitraCallbackFlow";

export const dynamic = "force-dynamic";

const CALLBACK_FIELDS = ["encData", "data", "logId", "agCode", "agKey"];

function normalizeSearchValue(value) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function EmitraPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const callbackParams = CALLBACK_FIELDS.reduce((params, key) => {
    const value = normalizeSearchValue(resolvedSearchParams?.[key]);

    if (value) {
      params[key === "data" ? "encData" : key] = value;
    }

    return params;
  }, {});

  const serverResult = await processEmitraCallbackOnServer(callbackParams);

  if (process.env.NODE_ENV === "development" && callbackParams.encData) {
    console.log("═══════════════════════════════════════════════════");
    console.log("E-Mitra Page Callback received:");
    console.log("Encrypted Text (encData):", callbackParams.encData);
    if (serverResult?.decryptResponse?.ok) {
      const decrypted = serverResult.decryptResponse.data?.data ?? serverResult.decryptResponse.data;
      console.log("Decrypted Text Output:", JSON.stringify(decrypted, null, 2));
    } else if (serverResult?.error) {
      console.log("Decryption Error:", serverResult.error);
    }
    console.log("═══════════════════════════════════════════════════");
  }

  const backendBaseUrl = process.env.BACKEND_API_URL || "http://localhost:3010";

  return (
    <AppLayout>
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-2xl flex-col justify-center px-4 py-8 md:px-6 md:py-12 animate-fade-in-up">
        <EmitraDecryptPreview
          callbackParams={callbackParams}
          serverResult={serverResult}
          backendBaseUrl={backendBaseUrl}
        />
      </section>
    </AppLayout>
  );
}
