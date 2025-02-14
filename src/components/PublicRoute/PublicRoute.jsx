import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
  const { user } = useAuth();

  // Redirect authenticated users away from public routes
  return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
