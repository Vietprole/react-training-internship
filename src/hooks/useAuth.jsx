import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Make custom hook to centralize context access
// No need to import both useContext and AuthContext in every component

// Instead of writing this in components:
// const auth = useContext(AuthContext);

// You can write this:
// const { user, token, login, logout } = useAuth();
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
