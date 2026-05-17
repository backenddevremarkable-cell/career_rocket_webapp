import FooterDashboard from "../../components/FooterDashboard";
import NavDashboard from "../../components/NavDashboard";

export default function Reports() {
  return (
    <main className="min-h-screen bg-[#f7f5f8]">
      <NavDashboard/>
        <h3 className="pending-page">Reports </h3>
        {/* Footer */}
      <FooterDashboard/>
    </main>
  );
}
