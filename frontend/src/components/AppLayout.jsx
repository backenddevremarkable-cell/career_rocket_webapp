import Header from "./Header";
import BackgroundBlobs from "./BackgroundBlobs";

export default function AppLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundBlobs />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
