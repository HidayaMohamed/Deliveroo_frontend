import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <h1>User Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier"
        element={
          <ProtectedRoute role="COURIER">
            <h1>Courier Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <h1>Admin Dashboard</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
