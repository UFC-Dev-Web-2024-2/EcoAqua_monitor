import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute:", children);
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o usuário está autenticado

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
