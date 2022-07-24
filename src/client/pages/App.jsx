import React, { Component } from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import TopNav from "../component/TopNav";

class App extends Component {
  
  render() {
    // change this id here to the id in your db for testing
    var id = "H1g2pg";
    return (
      <div className="Page">
        <h1>Workout Tracker 💪</h1>
        <a href="/App/AddWorkout/"> Add Workout </a>
        <a href="/App/MyWorkouts/"> All Workouts </a>
        {/* for testing purposes; id from dashboard should also be passed this way */}
        <div onClick={()=>(location.href=`/App/SessionStats?id=${id}`)}>Session Stats</div> 
        <Outlet />
      </div>
    );
  }
}

export default App;
