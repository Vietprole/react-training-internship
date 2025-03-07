import toast from "react-hot-toast";
import { API_URL } from "../config";

const authAPI = {
  login: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const parsedResponse = await response.json();

      if (!response.ok) {
        toast.error(parsedResponse);
      }

      return parsedResponse;
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  },

  signup: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const parsedResponse = await response.json();

      if (!response.ok) {
        toast.error(parsedResponse);
      }

      return parsedResponse;
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  },
};

export default authAPI;
