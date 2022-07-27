import React, { Component } from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import LoadSession from "./LoadSession";
import { AiFillPlusCircle } from "react-icons/ai";
class App extends Component {
  render() {
    // change this id here to the id in your db for testing
    var id = "H1g2pg";
    return (
      <div className="Page Dashboard">
        <div className="dashboard-container">
          <p style={{ marginBottom: 0 }}>
            The world famous CMPT 354 workout app
          </p>
          <h1>Workout Tracker 💪</h1>

          <div className="dashboard-content">
            <button onClick={() => (location.href = "/App/MyWorkouts/")}>
              Start New Session
            </button>

            <h3> Previous Sessions </h3>
            <LoadSession></LoadSession>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default App;
