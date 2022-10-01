import "./App.css";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Meeting from "./components/Meeting/Meeting";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/meeting/:id" element={<Meeting />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
