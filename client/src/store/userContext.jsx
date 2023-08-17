import { createContext, useContext, useMemo } from "react";

// context Object
export const contextObj = {
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  user: {
    email: "",
    score: "",
    progress: "",
    language: "",
  },
  setUser: () => {},
};
// Creating the user context
export const UserContext = createContext(contextObj);

// Custom hook to use the UserContext
export function useCtx() {
  const ctx = useContext(UserContext);
  return ctx;
}
