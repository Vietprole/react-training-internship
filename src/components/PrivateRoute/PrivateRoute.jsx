import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Replaces current route in history
    // User can't go back to protected route
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
