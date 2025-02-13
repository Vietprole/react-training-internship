import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import authAPI from "../services/api/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const login = async (userData) => {
    try {
      const response = await authAPI.login(userData);
      if (response.user) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        navigate("/home");
        return;
      }
      throw new Error(response.message);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
export { AuthContext };

