import "./App.css";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Meeting from "./components/Meeting/Meeting";
import Admin from "./components/Admin/Admin";
import { useTranslation } from "react-i18next";

// Contains the value and text for the options
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
  { value: "bn", text: "Bengali" },
  { value: "pa", text: "Punjabi" },
];
function App() {
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };
  return (
    <div className="App">
      <Router>
        <Nav />
        <h1>{t("welcome")}</h1>
        <label>{t("choose")}</label>

        <select value={lang} onChange={handleChange}>
          {languages.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
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
