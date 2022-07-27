import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import AddWorkout from "./pages/AddWorkout.jsx";
import MyWorkouts from "./pages/MyWorkouts.jsx";
import Homepage from "./pages/Homepage.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CurrentSession from "./pages/CurrentSession.jsx";
import AppWrapper from "./AppWrapper.jsx";
import SessionStats from "./pages/SessionStats.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/App/"
        element={
          <AppWrapper>
            <App />
          </AppWrapper>
        }
      />
      <Route
        path="/App/AddWorkout"
        element={
          <AppWrapper>
            <AddWorkout />
          </AppWrapper>
        }
      />
      <Route
        path="/App/MyWorkouts"
        element={
          <AppWrapper>
            <MyWorkouts />
          </AppWrapper>
        }
      />

      <Route
        path="/App/CurrentSession"
        element={
          <AppWrapper>
            <CurrentSession />
          </AppWrapper>
        }
      />

      <Route
        path="/App/SessionStats"
        element={
          <AppWrapper>
            <SessionStats />
          </AppWrapper>
        }
      />

      <Route
        path="/App/Profile"
        element={
          <AppWrapper>
            <ProfilePage />
          </AppWrapper>
        }
      />

      <Route
        path="/App/SessionStats"
        element={
          <AppWrapper>
            <SessionStats />
          </AppWrapper>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
);
