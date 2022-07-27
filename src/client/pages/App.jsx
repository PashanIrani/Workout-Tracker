import React, { Component } from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import LoadSession from "./LoadSession";
import LogoutNav from "../component/LogoutNav.jsx";
import { AiFillPlusCircle } from "react-icons/ai";
class App extends Component {
  
  render() {
    // change this id here to the id in your db for testing
    var id = "H1g2pg";
    return (
      <div className="Page Dashboard">
        <LogoutNav />
        <div className="dashboard-container">
          <h1>Workout Tracker 💪</h1>
            <button onClick={() => (location.href = "/App/MyWorkouts/")}>
              Start Workout
            </button>

          <h3> Previous Sessions </h3>
          <LoadSession></LoadSession>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default App;
