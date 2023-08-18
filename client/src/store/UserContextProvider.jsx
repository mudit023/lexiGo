import React, { useEffect, useState } from "react";
import { UserContext } from "./userContext";

function UserContextProvider(props) {
  const [authId, setAuthId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("authId")) {
      verifyUser(localStorage.getItem("authId"));
    } else {
      setAuthId("");
      setIsAdmin(false);
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("isAdmin", false);
    }
  }, []);

  async function login(token) {
    try {
      const res = await fetch(`http://localhost:8000/api/user/verify/${token}`);
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 0) {
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("isAdmin", false);
        console.log("Error:User not found!");
      }
      if (jsonResponse.code === 1) {
        setIsAdmin(false);
        setIsAuthenticated(true);
        setAuthId(token);
        localStorage.setItem("authId", token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("userId", jsonResponse.userId);
        localStorage.setItem("language", jsonResponse.language);
        const userData = {
          email: jsonResponse.email,
          score: jsonResponse.score,
          progress: jsonResponse.progress,
          language: jsonResponse.language,
          userId: jsonResponse.userId,
        };
        setUser(userData);
        console.log("Success:User Found!");
      }
      if (jsonResponse.code === 2) {
        setIsAdmin(true);
        setIsAuthenticated(true);
        setAuthId(token);
        localStorage.setItem("authId", token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("userId", jsonResponse.userId);
        localStorage.setItem("language", jsonResponse.language);
        const userData = {
          email: jsonResponse.email,
          score: jsonResponse.score,
          progress: jsonResponse.progress,
          language: jsonResponse.language,
          userId: jsonResponse.userId,
        };
        setUser(userData);
        console.log("Success:Admin Found!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  function logout() {
    localStorage.removeItem("authId");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    localStorage.removeItem("language");
    setAuthId("");
    setIsAdmin(false);
    setIsAuthenticated(false);
  }

  async function signup({ email, token, language }) {
    const data = {
      email: email,
      authId: token,
      language: language,
    };
    try {
      const res = await fetch(`http://localhost:8000/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 0) {
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("isAdmin", false);
        console.log("Error:Fail to signup");
      }
      if (jsonResponse.code === 1) {
        setIsAdmin(false);
        setIsAuthenticated(true);
        setAuthId(token);
        localStorage.setItem("authId", token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("userId", jsonResponse.userId);
        localStorage.setItem("language", language);
        const userData = {
          email: email,
          score: jsonResponse.score,
          progress: jsonResponse.progress,
          language: language,
          userId: jsonResponse.userId,
        };
        setUser(userData);
        console.log("Success:User Signed up!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function verifyUser(token) {
    try {
      const res = await fetch(`http://localhost:8000/api/user/verify/${token}`);
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 0) {
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.removeItem("authId");
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("isAdmin", false);
        console.log("Error:User not found!");
      }
      if (jsonResponse.code === 1) {
        setIsAdmin(false);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", false);
        const userData = {
          email: jsonResponse.email,
          score: jsonResponse.score,
          progress: jsonResponse.progress,
          language: jsonResponse.language,
          userId: jsonResponse.userId,
        };
        setUser(userData);
        console.log("Success:User Found!");
      }
      if (jsonResponse.code === 2) {
        setIsAdmin(true);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", true);
        const userData = {
          email: jsonResponse.email,
          score: jsonResponse.score,
          progress: jsonResponse.progress,
          language: jsonResponse.language,
          userId: jsonResponse.userId,
        };
        setUser(userData);
        console.log("Success:Admin Found!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const obj = {
    isAuthenticated: isAuthenticated,
    authId: authId,
    isAdmin: isAdmin,
    login: login,
    signup: signup,
    logout: logout,
    user: user,
  };
  return (
    <UserContext.Provider value={obj}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
