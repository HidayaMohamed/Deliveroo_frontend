import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes"; // make sure this path is correct

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;