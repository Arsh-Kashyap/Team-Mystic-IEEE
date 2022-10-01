import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./i18n.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzMq4Pjira4jArVr4MVenmiXpbk71BqZs",
  authDomain: "chitchat-790ff.firebaseapp.com",
  projectId: "chitchat-790ff",
  storageBucket: "chitchat-790ff.appspot.com",
  messagingSenderId: "504985005035",
  appId: "1:504985005035:web:5fad36361b249ebd70c7ae",
  measurementId: "G-RKF2PZEJRF",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
