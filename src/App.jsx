import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';

// HomePage Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-5">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
          🚚 Deliveroo Admin Portal
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up">
          Manage your delivery operations efficiently
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in">
          <a 
            href="/login" 
            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Login to Dashboard
          </a>
          <a 
            href="/admin" 
            className="px-8 py-4 bg-white/20 text-white border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
          >
            Go to Admin
          </a>
        </div>
      </div>
    </div>
  );
};

// LoginPage Component
const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - replace with real authentication
    localStorage.setItem('token', 'dummy-token-' + Date.now());
    localStorage.setItem('role', 'admin');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Enter your credentials to access the dashboard
          </p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Email
              </label>
              <input 
                type="email" 
                placeholder="admin@deliveroo.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Password
              </label>
              <input 
                type="password" 
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Login to Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">
              💡 <span className="font-semibold">Demo:</span> Click login to access admin dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (!token || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
