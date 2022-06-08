import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from "./pages/App.jsx";
import AddWorkout from "./pages/AddWorkout.jsx";
import TopNav from "./component/TopNav.jsx";
const root = ReactDOM.createRoot(
    document.getElementById("root")
  );
  root.render(
    <BrowserRouter>
    <TopNav/>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/AddWorkout" element={<AddWorkout />}/>
            <Route path="/AllWorkouts" />
            <Route path="/Settings" />
        </Routes>
  </BrowserRouter>
  );