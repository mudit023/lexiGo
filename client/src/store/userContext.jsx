import { createContext, useContext } from "react";

// context Object
export const contextObj = {
  isAuthenticated: false,
  authId: "",
  isAdmin: false,
  login: async (token) => {},
  signup: async ({ email, token }) => {},
  logout: () => {},
  user: {
    email: "",
    score: [],
    progress: [],
    language: "",
    userId: "",
  },
};
// Creating the user context
export const UserContext = createContext(contextObj);

// Custom hook to use the UserContext
export function useCtx() {
  const ctx = useContext(UserContext);
  return ctx;
}
