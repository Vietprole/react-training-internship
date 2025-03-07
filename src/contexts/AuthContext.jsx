import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import authAPI from "../services/api/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = useCallback(async (userData) => {
    try {
      const response = await authAPI.login(userData);
      if (response.user) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        setToken(response.accessToken);
        localStorage.setItem("token", response.accessToken);
        navigate("/");
        return;
      }
      throw new Error(response.message);
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    let logoutTimer;

    const scheduleLogout = () => {
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();

        // Calculate time until expiration
        const timeUntilExpiration = expirationTime - currentTime;

        // Only set timer if token isn't already expired
        if (timeUntilExpiration > 0) {
          // Clear any existing timer
          if (logoutTimer) clearTimeout(logoutTimer);

          // Schedule logout exactly when token expires
          logoutTimer = setTimeout(() => {
            logout();
          }, timeUntilExpiration);
        } else {
          // Token already expired
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    };

    // Schedule logout when token changes or on initial load
    scheduleLogout();

    // Clean up timer when component unmounts or token changes
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [token, logout]);

  const authContextValue = useMemo(() => ({
    token,
    user,
    login,
    logout
  }), [token, user, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
export { AuthContext };
