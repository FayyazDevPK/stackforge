import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    const saved = localStorage.getItem("sf_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  function login(userData) {
    // sf_plan is stored separately and never wiped by logout
    // So plan is always preserved across logout/login cycles
    const savedPlan = localStorage.getItem("sf_plan") || "free";
    const finalUser = {
      ...userData,
      plan: userData.plan === "pro" ? "pro" : savedPlan,
    };
    setUser(finalUser);
    localStorage.setItem("sf_user", JSON.stringify(finalUser));
    localStorage.setItem("sf_plan", finalUser.plan);
  }

  function upgradePro() {
    const updated = { ...user, plan: "pro" };
    setUser(updated);
    localStorage.setItem("sf_user", JSON.stringify(updated));
    localStorage.setItem("sf_plan", "pro"); // persists across logouts
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("sf_user");
    // sf_plan intentionally kept — plan survives logout
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradePro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}