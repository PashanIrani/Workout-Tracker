import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import AddWorkout from "./pages/AddWorkout.jsx";
import MyWorkouts from "./pages/MyWorkouts.jsx"
import Homepage from "./pages/Homepage.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AppWrapper from "./AppWrapper.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/App/" element={<AppWrapper><App /></AppWrapper>} />
      <Route path="/App/AddWorkout" element={<AppWrapper><AddWorkout /></AppWrapper>} />
      <Route path="/App/MyWorkouts" element={<AppWrapper><MyWorkouts/></AppWrapper>}/>
      <Route path="/App/Settings" element={<AppWrapper></AppWrapper>}/>

      <Route path="/login" element={<AppWrapper><Login /></AppWrapper>} />
      <Route path="/signup" element={<AppWrapper><SignUp /></AppWrapper>} />
      <Route path="/" element={<AppWrapper><Homepage /></AppWrapper>} />
    </Routes>
  </BrowserRouter>
);
