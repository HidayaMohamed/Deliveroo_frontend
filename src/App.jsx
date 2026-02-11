import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
// Global Components
import NotificationToast from "./components/NoificationToast";

// Import AppRoutes for routing logic
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app-container">
      {/* React Hot Toast container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      />

      {/* Global Notification Toast component for polling */}
      <NotificationToast />

      <main className="content-area" style={{ minHeight: "80vh" }}>
        <AppRoutes />
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
