import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const onAuthExpired = () => {
      setUser(null);
      setLoading(false);
    };

    window.addEventListener("authExpired", onAuthExpired);
    return () => window.removeEventListener("authExpired", onAuthExpired);
  }, []);

  useEffect(() => {
    const onAuthExpired = () => {
      setUser(null);
      setLoading(false);
    };

    window.addEventListener("authExpired", onAuthExpired);
    return () => window.removeEventListener("authExpired", onAuthExpired);
  }, []);

  const logout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return null;
    // or return <LoadingScreen />
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
