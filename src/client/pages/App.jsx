import React, { Component } from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import TopNav from "../component/TopNav";

class App extends Component {
  
  render() {
    var id = "GE9p1q"
    return (
      <div className="Page">
        <h1>Workout Tracker 💪</h1>
        <a href="/App/AddWorkout/"> Add Workout </a>
        <a href="/App/MyWorkouts/"> All Workouts </a>
        <div onClick={()=>(location.href=`/App/SessionStats?id=${id}`)}>Session Stats</div>
        <Outlet />
      </div>
    );
  }
}

export default App;
