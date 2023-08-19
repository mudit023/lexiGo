import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContextProvider from "./store/UserContextProvider";
import Game from "./components/Game";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  return (
    <UserContextProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <Footer /> */}
    </UserContextProvider>
  );
}

export default App;
