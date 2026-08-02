import { useCallback, useEffect, useState } from "react";
import { getSession, isAuthenticated as checkAuth, logout as clearSession } from "@/lib/auth";

export default function useAuth() {
  const [user, setUser] = useState(getSession());
  const [authenticated, setAuthenticated] = useState(checkAuth());

  const refresh = useCallback(() => {
    setUser(getSession());
    setAuthenticated(checkAuth());
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setAuthenticated(false);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setUser(getSession());
      setAuthenticated(checkAuth());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { user, authenticated, logout, refresh };
}
