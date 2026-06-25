 
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});
const criticalStyles = `
  body { margin: 0; color: #171717; background: #fff; font-family: var(--font-poppins), Arial, sans-serif; }
  header { position: relative; z-index: 20; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f0f0f0; background: rgba(255,255,255,.85); padding: 16px 24px; backdrop-filter: blur(8px); }
  header a:first-child { display: inline-flex; flex-shrink: 0; align-items: center; background: transparent; }
  header img { height: 48px !important; width: auto !important; object-fit: contain; background: transparent; }
  header nav { display: flex; align-items: center; gap: 24px; }
  header nav a { color: #616161; font-size: 13px; font-weight: 500; text-decoration: none; }
  header nav a:hover { color: #9c27b0; }
  header button { border: 0; border-radius: 9999px; background: #9c27b0; color: #fff; padding: 8px 24px; font-size: 13px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
  main > section:first-child { box-sizing: border-box; display: flex; min-height: calc(100vh - 80px); max-width: 64rem; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; padding: 64px 24px; }
  main > section:first-child > div:first-child { margin-top: -40px; margin-bottom: 48px; text-align: center; animation: criticalFadeInUp .6s ease-out forwards; }
  main > section:first-child h1 { margin: 0; color: #212121; font-size: 36px; line-height: 1.15; font-weight: 700; }
  main > section:first-child p { margin-top: 12px; color: #757575; font-size: 15px; }
  .text-career-purple { color: #9c27b0; }
  .bg-career-purple { background-color: #9c27b0; }
  .bg-career-lavender { background-color: #f5e6f5; }
  .service-card-pro { box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #eee; border-radius: 16px; background: #fff; padding: 0; text-align: left; box-shadow: 0 4px 24px rgba(0,0,0,.08); transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; animation: criticalFadeInUp .6s ease-out forwards; }
  .service-card-pro:hover { transform: translateY(-6px); border-color: rgba(156,39,176,.35); box-shadow: 0 12px 40px rgba(156,39,176,.15); }
  .service-card-pro > div:nth-child(2) { display: flex; flex: 1 1 auto; flex-direction: column; padding: 28px; }
  .service-card-pro h2 { margin: 20px 0 0; color: #212121; font-size: 22px; line-height: 1.25; font-weight: 700; }
  .service-card-pro p { color: #757575; font-size: 14px; line-height: 1.625; }
  .grid { display: grid; width: 100%; max-width: 56rem; gap: 24px; }
  .rounded-xl { border-radius: 12px; }
  .rounded-2xl { border-radius: 16px; }
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; }
  .text-white { color: #fff; }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-1 { flex: 1 1 0%; }
  .items-start { align-items: flex-start; }
  .justify-end { justify-content: flex-end; }
  .gap-4 { gap: 16px; }
  .mt-2 { margin-top: 8px; }
  .mt-5 { margin-top: 20px; }
  .mt-6 { margin-top: 24px; }
  .mb-2 { margin-bottom: 8px; }
  .p-4 { padding: 16px; }
  .p-7 { padding: 28px; }
  .pt-5 { padding-top: 20px; }
  .px-3 { padding-left: 12px; padding-right: 12px; }
  .py-1\.5 { padding-top: 6px; padding-bottom: 6px; }
  .px-5 { padding-left: 20px; padding-right: 20px; }
  .py-2\.5 { padding-top: 10px; padding-bottom: 10px; }
  .h-1\.5 { height: 6px; }
  .h-4 { height: 16px; }
  .w-4 { width: 16px; }
  .h-5 { height: 20px; }
  .w-5 { width: 20px; }
  .h-6 { height: 24px; }
  .w-6 { width: 24px; }
  .h-12 { height: 48px; }
  .w-12 { width: 48px; }
  .w-full { width: 100%; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .uppercase { text-transform: uppercase; }
  .tracking-wider { letter-spacing: .05em; }
  .leading-none { line-height: 1; }
  .border-t { border-top: 1px solid #f0f0f0; }
  .rounded-full { border-radius: 9999px; }
  .text-\[10px\] { font-size: 10px; }
  .text-\[13px\] { font-size: 13px; }
  .text-\[14px\] { font-size: 14px; }
  .text-\[20px\] { font-size: 20px; }
  .text-\[26px\] { font-size: 26px; }
  .text-\[36px\] { font-size: 36px; }
  .text-\[#212121\] { color: #212121; }
  .text-\[#757575\] { color: #757575; }
  .text-\[#9E9E9E\] { color: #9e9e9e; }
  .border-\[#F0F0F0\] { border-color: #f0f0f0; }
  @media (min-width: 640px) { .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 1023px) { header nav { display: none; } }
  @keyframes criticalFadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
`;
export const metadata = {
  title: "Career Advantage Portal | Career Rocket",
  description: "Guidance • Scholarship • Success",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      {/* <body className={`${poppins.variable} antialiased`}>
        {children}
      </body> */}
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}