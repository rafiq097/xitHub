import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        const res = await axios.get("http://localhost:5000/users/check", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = res.data;
        setAuthUser(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Not authorized. Please log in.");
          window.location.href = "http://localhost:5000/users/login";
        } else {
          toast.error(error.message);
        }
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
