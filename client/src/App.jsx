import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { UserContext, contextObj } from "./store/userContext";
import UserPage from "./pages/UserPage";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <UserContext.Provider value={contextObj}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
