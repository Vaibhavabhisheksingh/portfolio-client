import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    authService.getCurrentAdmin()
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getProfile();

        setAdmin(res.admin);
      } catch (err) {
        console.error(err);
        authService.logout();
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);

    setAdmin(res.admin);

    return res;
  };

  const logout = () => {
    authService.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;