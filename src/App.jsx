
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

/**
 * VOLT CORE - MASTER APPLICATION WRAPPER
 * This component manages the global layout, navigation, and persistent styles.
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F4] font-sans selection:bg-[#EA580C]/30 selection:text-black">
      
      {/* GLOBAL NAVIGATION
          The Navbar will persist across all pages unless specifically 
          excluded within the component itself.
      */}
      <Navbar />

      {/* DYNAMIC CONTENT AREA
          The 'flex-grow' ensures the footer stays at the bottom 
          even on pages with minimal content.
      */}
      <main className="flex-grow relative">
        <AppRoutes />
      </main>

      {/* GLOBAL FOOTER
          Branded consistently with the VoltCore Logistics identity.
      */}
      <Footer />
      
    </div>
  );
}

export default App;